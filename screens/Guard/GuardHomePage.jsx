import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native'


const GuardHomePage = () => {
    const roles = [
        //{ name: 'Court Alert', image: require("../../assets/alert.png") },
        { name: 'Lawyer Request', image: require("../../assets/request.png") },
        { name: 'Prisoner List', image: require("../../assets/Plist.png") },
      ];
    
      return (
        <View style={styles.container}>
         <View styles={styles.newclientcontainer}>
    <TouchableOpacity  onPress={() => navigation.navigate('NewClientRequest')}
    style={styles.newclientopacity}>
        <Text style={styles.newclienttext}>New Court Orders</Text>
    </TouchableOpacity>
    </View>
          <View style={styles.cardContainer}>
            {roles.map((role, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => navigation.navigate(/* Specify the screen name for the role */)}>
                <View>
                  <Image style={styles.imageStyle} source={role.image} />
                  <Text style={styles.cardText}>{role.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      cardContainer: {
        marginTop:"50%",
        flexDirection:'column',
        justifyContent: 'space-around',
        width: '100%',
        height:"50%"
      },
      card: {
        flex: 1,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      cardText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        marginTop: 10,
      },
      imageStyle: {
        height: 80,
        width: 80,
        resizeMode: 'contain',
      },
      newclientcontainer:{
        borderColor:'black',
    },
    newclientopacity:{

        borderColor:'black',
        borderRadius:5,
        marginTop:"20%",
       color:'black' 
        
    },
    newclienttext:{
     fontSize:24,
    textAlign:'center',
    },
    });

export default GuardHomePage