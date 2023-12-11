import React from 'react'
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'


const ClientCaseDetail = () => {
  return (
    <View>
      <Text style={styles.headingText}>ClientCaseDetail</Text>
    <View style={styles.card}>
      <Text style={styles.cardText}>CLIENT DETAILS</Text> 
    </View>
    <View style={styles.description}>
      <Text style={styles.cardText}>DESCRIPTION</Text> 
      <Text>Certainly! Here's a fictional law case paragraph for illustrative purposes:

"In the landmark case of Smith v. Johnson, the plaintiff, Mr. Smith, alleged negligence on the part of the defendant, Mr. Johnson, in a motor vehicle accident that occurred on July 15, 2022. The plaintiff claimed that the defendant failed to obey traffic signals and recklessly collided with his vehicle at the intersection of Elm Street and Maple Avenue. The defense argued that Mr. Johnson had the right of way and that Mr. Smith was partially responsible for the accident. The court carefully examined eyewitness testimonies, traffic camera footage, and expert opinions on traffic regulations. After a thorough analysis, the judge ruled in favor of Mr. Smith, holding Mr. Johnson liable for the accident and ordering compensation for the plaintiff's medical expenses and vehicle damages."</Text>
    </View>
    
    </View>

  )
}
const styles = StyleSheet.create({
    headingText:{
        marginTop:"20%",
        fontSize:24,
        fontWeight:'bold',
        paddingHorizontal:8,
      },
    card: {
    
        height:"35%",
        width:"90%",
        alignContent:'center',
        backgroundColor: 'white',
        borderRadius: 8,
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
      },
      description:{
        height:"45%",
        width:"90%",
        alignContent:'center',
        backgroundColor: 'white',
        borderRadius: 8,
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
      },
      cardText: {
        textAlign:'center',
        fontSize: 16,
        color: 'black',
      },

});
export default ClientCaseDetail