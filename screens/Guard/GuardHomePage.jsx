import React from "react";
import Toast from 'react-native-toast-message';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
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
    { name: 'Contact Lawyer', icon: 'gavel', screen: 'LawyerRequestScreen' },
    { name: 'Prisoner List', icon: 'list', screen: 'PrisonerListPage' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Guard Dashboard</Text>
      </View>
      {/* Upper Half: Lawyer Request and Prisoner List */}
      <View style={styles.upperHalf}>
        {roles.map((role, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(role.screen)}
          >
            <FontAwesome5 name={role.icon} size={40} color="black" />
            <Text style={styles.cardText}>{role.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lower Half: Court Orders */}
      <View style={styles.lowerHalf}>
        <Text style={styles.headerText}>Court / Lawyer Updates</Text>
        {courtOrders.map((order) => (
          <TouchableOpacity
            key={order.id}
            onPress={CourtOrderNav}
            style={styles.courtOrder}
          >
            <FontAwesome5
              name="balance-scale"
              size={24}
              color="#3498db"
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    // backgroundColor: "#3498db", 
    alignItems: "center",
    width: "100%",
    marginTop: "10%",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    marginTop: "25%",
    fontWeight: "bold",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  upperHalf: {
    flex: 1,
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 20,
  },
  lowerHalf: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 20,
    marginTop: "-90%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  courtOrder: {
    backgroundColor: "white", // Light Goldenrod Yellow
    borderRadius: 10,
    padding: 16,
    margin: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  },
  courtOrderDescription: {
    fontSize: 16,
  },
  card: {
    flex: 1,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    marginTop: 10,
  },
});

export default GuardHomePage;
