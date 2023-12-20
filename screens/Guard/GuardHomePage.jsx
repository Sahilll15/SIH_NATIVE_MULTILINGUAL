import React from "react";
import Toast from 'react-native-toast-message';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const GuardHomePage = ({ navigation }) => {

  const courtOrders = [
    {
      id: 1,
      title: "Court Order 1",
      description: "This is the first court order.",
    },
    {
      id: 2,
      title: "Court Order 2",
      description: "This is the second court order.",
    },{
      id: 3,
      title: "Court Order 3",
      description: "This is the first court order.",
    },
    {
      id: 4,
      title: "Court Order 4",
      description: "This is the second court order.",
    },
    {
      id: 5,
      title: "Court Order 5",
      description: "This is the first court order.",
    },
    {
      id: 6,
      title: "Court Order 6",
      description: "This is the second court order.",
    },
    {
      id: 7,
      title: "Court Order 7",
      description: "This is the first court order.",
    },
    {
      id: 8,
      title: "Court Order 8",
      description: "This is the second court order.",
    },
    {
      id: 9,
      title: "Court Order 9",
      description: "This is the first court order.",
    },
    {
      id: 10,
      title: "Court Order 10",
      description: "This is the second court order.",
    },
    {
      id: 11,
      title: "Court Order 11",
      description: "This is the first court order.",
    },
    {
      id: 12,
      title: "Court Order 12",
      description: "This is the second court order.",
    },
    {
      id: 13,
      title: "Court Order 13",
      description: "This is the first court order.",
    },
    {
      id: 14,
      title: "Court Order 14",
      description: "This is the second court order.",
    },

    // Add more court orders as needed
  ];

  const CourtOrderNav = () => {
    // Implement logic to contact the lawyer
    Toast.show({
      type: 'error', // Can be 'success', 'error', 'info', or 'any custom type'
      text1: 'Under Development',
    });
  };

  const roles = [
    { name: 'Contact Lawyer', icon: 'gavel', screen: 'PrisonerLawyer' },
    { name: 'Prisoner List', icon: 'list', screen: 'PrisonerListPage' },
  ];

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.Guarddashstyles}>Guard Dashboard</Text>
      </View>

      {/* Upper Half: Lawyer Request and Prisoner List */}
      <View style={styles.upperHalf}>
        {roles.map((role, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(role.screen)}
          >
            <FontAwesome5 name={role.icon} size={40} color="white" />
            <Text style={styles.cardText}>{role.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Lower Half: Court Orders */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.lowerHalf}>
          <Text style={styles.headerText}>Court / Lawyer Updates</Text>
          <ScrollView style={{ width: "100%" }}>
            {courtOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                onPress={CourtOrderNav}
                style={styles.courtOrder}
              >
                <FontAwesome5
                  name="balance-scale"
                  size={24}
                  color="#fff"
                  style={styles.icon}
                />
                <View style={styles.courtOrderText}>
                  <Text style={styles.courtOrderTitle}>{order.title}</Text>
                  <Text style={styles.courtOrderDescription}>
                    {order.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
   
       </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: "grey",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  Guarddashstyles: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  upperHalf: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 20,
  },
  card: {
    flex: 1,
    height: 150,
    backgroundColor: "#3498db",
    borderRadius: 20,
    padding: 16,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  cardText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    marginTop: 10,
  },
  lowerHalf: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  courtOrder: {
    backgroundColor: "grey",
    borderRadius: 15,
    padding: 16,
    margin: 10,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  courtOrderText: {
    flex: 1,
  },
  courtOrderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  courtOrderDescription: {
    fontSize: 16,
    color: "white",
  },
});

export default GuardHomePage;