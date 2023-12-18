import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { getUserOrdersPaginations } from "src/api/backend/private/orders";
import moment from "moment";
import { ROUTES } from "@utils/routes";
import notify from "@utils/notify";
import { createRefund, getPaymentDetailsByLinkId, updateRefundDetails } from "src/api/backend/private/cashfreePayment";
import { sendOtpInMail, verifyOTP } from 'src/api/backend/private/twofactorauth'
import VerifyOTP from "./verify-otp";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from "next/router";
import { FaChevronDown } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Booking = () => {
  const { width } = useWindowSize();
  const { t } = useTranslation("common");

  const [otp, setOtp] = useState(null);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refundSuccess, setRefundSuccess] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [action, setAction] = useState('view');
  const [isActionOpen, setIsActionOpen] = useState(false);

  const actions = [
    {
      name: 'View',
      value: 'view'
    },
    {
      name: 'Reorder',
      value: 'reorder'
    },
    {
      name: 'Refund',
      value: 'refund'
    },
    {
      name: 'Track Order',
      value: 'track'
    },
  ]

  const sendOtp = async () => {
    let bodyObj =
    {
      email: "devteam@hubx.ai"
    }

    const response = await sendOtpInMail(bodyObj);

    if (response.status === 200) {
      console.log()
    }
  };
  const verifyOtp = async () => {
    let bodyObj =
    {
      email: "devteam@hubx.ai",
      otp: otp
    }

    console.log('bodyObj', bodyObj);


    const response = await verifyOTP(bodyObj);

    if (response.status === 200) {
      setIsOtpVerified(true);
      console.log('otp verified')
      setOtp(null);
      closeModal();
      await handleRefund(selectedOrder);
      notify({
        type: "success",
        message: 'Authentication successful. Initiating refund.. ',
      });
    }
    else {
      notify({
        type: "error",
        message: 'Authentication failed',
      });
    }
  };

  const loadPaymentDetails = async () => {
    let response = await getPaymentDetailsByLinkId(order.targetOrder.linkId);

    if (!response || response.status !== 200) {
      console.log('could load payment details');
      return;
    }
    else {
      // setPaymentDetails(response.data);
      console.log('paymentdet', response.data);
    }
  };

  const handleReorder = async (order) => {
    let response = await getPaymentDetailsByLinkId(order.linkId);
    if (response?.data?.link_amount - response?.data?.link_amount_paid) {
      notify({
        type: "error",
        message: 'Error. Partially payment made.',
      });
      return;
    }
    if (order.trackingStatus === 'pending') {
      notify({
        type: "error",
        message: 'Sample order not shipped/completed yet',
      });
      return;
    }
    // if (order?.childOrders?.length) {
    //   notify({
    //     type: "error",
    //     message: 'Product already reordered',
    //   });
    //   return;
    // }
    router.push(`/products/${order.productSlug}?sample=true&sampleCost=${order.amount}&orderId=${order.publicId}&reordered=${order.childOrders.length > 0 ? true : false}`);
    // href={`/products/${order.productSlug}?sample=true&sampleCost=${order.amount}&orderId=${order.publicId}`}
  }

  const handleRefund = async (order: Order) => {
    if (!isOtpVerified) {
      notify({
        type: "error",
        message: 'Authentication failed',
      });
      return;
    }
    if (order?.orderApprovedByAdmin) {
      notify({
        type: "error",
        message: 'Order already approved!',
      });
      return;
    }
    if (order?.isRefunded && order?.refundedAmount >= order?.amount) {
      notify({
        type: "error",
        message: 'Refund already made!',
      });
      return;
    }
    console.log('Refunding order', order);
    const linkId = order.linkId;
    let response = await getPaymentDetailsByLinkId(order.linkId);
    let refund_amount = 0;
    if (order?.isRefunded) {
      refund_amount = order?.amount - order?.refundedAmount
    }
    else if (response?.data?.link_amount - response?.data?.link_amount_paid > 0) {
      refund_amount = response?.data?.link_amount_paid;
    }
    else if (order.isSample) {
      if (order.childOrders?.length) {
        refund_amount += order.childOrders.map(item => item.ItemMenu.amount);
      }
      refund_amount -= order.amount;
    }
    else {
      refund_amount = order.amount;
    }
    if (refund_amount <= 0) {
      notify({
        type: "error",
        message: 'Refund already made',
      });
    }
    // console.log("1",orderId,refund_amount)
    try {
      const response = await createRefund(linkId, refund_amount);
      // console.log(orderId,refund_amount)
      if (response.status === 200) {
        let bodyObj = {
          _id: order._id,
          refundAmount: refund_amount
        }
        let res = await updateRefundDetails(bodyObj);
        if (res.status === 200) {
          console.log('Refund updated successfully')
        }
        setRefundSuccess(true); // Set refund success state
        // Notify success
        notify({
          type: "success",
          message: 'Refund created successfully',
        });
        console.log('Refund Data:', response.data); // Access the refund data here
        closeModal();
        setIsOtpVerified(false);
        await loadOrderFromServer()
      } else {
        // Show error if the refund creation fails
        notify({
          type: "error",
          message: response.data.message,
        });
      }
    } catch (error) {
      console.log('Network error:', error);
      notify({
        type: "error",
        message: 'Network error',
      });
    }
  };

  const loadOrderFromServer = async () => {
    let response = await getUserOrdersPaginations(1);

    if (response.status === 200) {
      setOrders(response.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderFromServer();
  }, []);

  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-orders")}
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        //@ts-ignore
        variants={fadeInTop(0.35)}
        className={`w-full flex flex-col`}
      >

        {width >= 1025 ? (
          <table>
            <thead className="text-sm lg:text-base">
              <tr>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
                  {t("text-order")}
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
                  {t("text-child-order")}
                  {/* Child Order */}
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                  {t("text-date")}
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                  {/* {t("text-type")} */}
                  Type
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                  {t("text-status")}
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                  {t("text-total")}
                </th>
                {/* <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
                  {t("text-actions")}
                </th> */}
                <th className="bg-gray-100 group relative p-4 text-heading font-semibold text-start lg:text-end 
                last:rounded-te-md flex items-center justify-center">
                  <div className="">
                    {t("text-actions")}
                  </div>
                  <span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
                    <FaChevronDown
                      className="transition duration-300 ease-in-out transform group-hover:-rotate-180"
                    />
                  </span>
                  {actions && (
                    // bg was bg-gray-200
                    <div
                      className="flex flex-col items-center justify-center shadow-header bg-white rounded-b-xl absolute  top-4 left-28  opacity-0 group-hover:opacity-100
                  ">
                      <ul className="w-36 text-body text-sm py-5 px-3 space-y-4 flex-col p-4">
                        {actions.map((action, idx) => {
                          const Booking = ({ orders, action, setAction }) => {
                            const handleReorder = (order) => {
                              // Reorder logic here
                            };

                            const handleRefund = (order) => {
                              // Refund logic here
                            };

                            const sendOtp = () => {
                              // Send OTP logic here
                            };

                            const verifyOtp = () => {
                              // Verify OTP logic here
                            };

                            const closeModal = () => {
                              // Close modal logic here
                            };

                            const customStyles = {
                              // Custom modal styles here
                            };

                            const [isModalOpen, setIsModalOpen] = React.useState(false);
                            const [otp, setOtp] = React.useState('');

                            const openModal = () => {
                              setIsModalOpen(true);
                            };

                            const closeModal = () => {
                              setIsModalOpen(false);
                            };

                            return (
                              <>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                >
                                  {/* Your component JSX code here */}
                                </motion.div>
                              </>
                            );
                          };

                          export default Booking;
