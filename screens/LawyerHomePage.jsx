import React from 'react'

import { View, Text,FlatList,TouchableOpacity,StyleSheet } from 'react-native';
import {  } from 'react-native-gesture-handler';


const LawyerHomePage = ({navigation}) => {
 const clients=([
    { id:'1',name:"client 1"},
    {id:'2',name:"client 2"},
    { id:'3', name:"client 3"},
    {id:'4',name:"client 4"},
    { id:'5',name:"client 5"},
    {id:'6',name:"client 6"},
    { id:'7', name:"client 7"},
    {id:'8',name:"client 8"},
    { id:'9',name:"client 9"},
    {id:'10',name:"client 10"},
    { id:'11', name:"client 11"},
    {id:'12',name:"client 12"},
    { id:'13',name:"client 13"},
    {id:'14',name:"client 14"},
    { id:'15', name:"client 15"},
    {id:'16',name:"client 16"},
]);
const pressHandler = (id) =>{
    console.log(id);
}
  return (
    
 <View style={styles.container}>
    <View styles={styles.newclientcontainer}>
    <TouchableOpacity  onPress={() => navigation.navigate('NewClientRequest')}
    style={styles.newclientopacity}>
        <Text style={styles.newclienttext}>New Client Request</Text>
    </TouchableOpacity>
    </View>
<FlatList
numColumns={1}
keyExtractor={(item) => item.id}
data={clients}
renderItem={({item})=>(
    <TouchableOpacity   onPress={()=> pressHandler(item.id)}>
        <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
)}/>



    </View>
    
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        paddingTop:40,
        //height:"100%",
        paddingHorizontal:0,
    },
    newclientcontainer:{
        borderColor:'black'
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
    item:{
 marginTop:"20%",
 padding:20,
 backgroundColor:'#E9E9E9',
 fontSize:24,
 borderRadius:5,
 marginTop:2.5,
 borderBottomColor: "black",
 
    },
});
export default LawyerHomePage