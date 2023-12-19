import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet , TextInput, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const TestClient = ({ route, navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    // Dummy data (replace with actual data)
    const clientInfo = {
        name: 'John Doe',
        caseId: '123456',
        prevDate: '2023-01-01',
        nextDate: '2023-02-01',
        sections: ['Section 1', 'Section 2'],
        email: 'john.doe@example.com',
        contactNo: '+1 234-567-8901',
    };

    const handleViewDocuments = () => {
        // Navigate to the client documents page
        navigation.navigate('ClientDocuments', { clientId: route.params.clientId });
    };

    const handleCallClient = () => {
        // Implement call functionality (e.g., using Linking)
        // For simplicity, a placeholder alert is shown here
        alert(`Calling ${clientInfo.name} at ${clientInfo.contactNo}`);
    };
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
       
      };
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Client Details</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* First Box: Client Details */}
                <View style={styles.box}>
                    <Text>Name: {clientInfo.name}</Text>
                    <Text>Case ID: {clientInfo.caseId}</Text>
                    <Text>Previous Date: {clientInfo.prevDate}</Text>
                    <Text>Next Date: {clientInfo.nextDate}</Text>
                    <Text>Sections: {clientInfo.sections.join(', ')}</Text>
                </View>

                {/* Second Box: Contact Information */}
                <View style={styles.box}>
                    <Text>Email: {clientInfo.email}</Text>
                    <Text>Contact No: {clientInfo.contactNo}</Text>
                </View>

                {/* View Client Documents Button */}
                <TouchableOpacity style={styles.button} onPress={handleViewDocuments}>
                    <Icon name="file-text-o" size={20} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>View Client Documents</Text>
                </TouchableOpacity>

                {/* Call Client Button */}
                <TouchableOpacity style={styles.buttond} onPress={handleCallClient}>
                    <Icon name="phone" size={20} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Call Client</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttond} onPress={toggleModal}>
                    <Icon name="phone" size={20} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Upload Files</Text>
                </TouchableOpacity>


                <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Upload New Document</Text>
          <TextInput
            style={styles.input}
            placeholder="Document Name"
          
          />
          <View style={styles.fileInputContainer}>
            {/* <FontAwesome5 name="file" size={20} color="#333" style={styles.documentIcon} /> */}
            <TouchableOpacity style={styles.fileInput} >
              
                <Text>Select a file</Text>
         
            </TouchableOpacity>
          </View>
          <View style={styles.uploadButtonContainer}>
            <TouchableOpacity style={styles.uploadButton} >
              
                <Text style={styles.buttonText}>Upload</Text>
          
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal} >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    input:{
        backgroundColor: 'white',
        height:60,
        width:300,

    },
    header: {
        backgroundColor: '#2563eb', // Blue color
        padding: 16,
        alignItems: 'center',

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        
      },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '10%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    box: {
        backgroundColor: '#e5e7eb',
        borderRadius: 5,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#b2ebf2', // Light Cyan shade
    },
    buttond: {
        backgroundColor: '#16a34a', // Blue color
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        marginBottom: 16,
        alignSelf: 'center',
        width: '100%',
        marginTop: '10%',
    },
    button: {
        backgroundColor: '#2563eb', // Blue color
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        marginBottom: 16,
        alignSelf: 'center',
        marginTop: '10%',

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});

export default TestClient;