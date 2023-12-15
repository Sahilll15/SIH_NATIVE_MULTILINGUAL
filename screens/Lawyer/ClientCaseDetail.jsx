import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Icon } from "react-native-elements";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import the FontAwesome5 icon library

const ClientCaseDetail = () => {
  return (
    <View style={styles.container}>
      {/* Client Details */}
      <Card containerStyle={styles.card}>
        <Text style={styles.cardText}>CLIENT DETAILS</Text>
        <View style={styles.clientDetails}>
          <Image
            style={styles.clientImage}
            source={{
              uri: "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg",
            }}
          />
          <View style={styles.clientText}>
            <Text style={styles.listItemTitle}>Client Name</Text>
            <Text style={styles.listItemSubtitle}>John Doe</Text>

            {/* Additional Details */}
            <Text style={styles.listItemTitle}>Case Number</Text>
            <Text style={styles.listItemSubtitle}>123456</Text>

            <Text style={styles.listItemTitle}>Case Status</Text>
            <Text style={styles.listItemSubtitle}>In Progress</Text>

            <Text style={styles.listItemTitle}>Charges</Text>
            <Text style={styles.listItemSubtitle}>Theft, Assault</Text>
            {/* Add more Text components for other details */}
          </View>
        </View>
      </Card>

      {/* Event Description */}
      <Card containerStyle={styles.card}>
        <Text style={styles.cardText}>EVENT DESCRIPTION</Text>
        <Text>
         I was riding bike and on a cross road a lady ran between road and came before my bike. Since it was higway i was at high speed and was unable to quickly stop . Eventually i hit her and fell down .
          {/* Add your event description here */}
        </Text>
      </Card>

      {/* Contact Client Button */}
      <TouchableOpacity style={[styles.button, styles.contactClientButton]}>
        
        <Text style={styles.buttonText}>Contact Client</Text>
        <FontAwesome5 name="phone" size={20} color="#fff" style={styles.buttonIcon} />
      </TouchableOpacity>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#3498db' }]}>
          <FontAwesome5 name="check" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]}>
          <FontAwesome5 name="times" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: 'white',
  },
  card: {
    width: "100%",
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  clientDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  clientImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  clientText: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listItemSubtitle: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  contactClientButton: {
    backgroundColor: '#2ecc71',
    maxHeight:50,
    
  },
 
});

export default ClientCaseDetail;
