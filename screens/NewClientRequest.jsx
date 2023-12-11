import React from 'react'

import { View, Text ,FlatList,StyleSheet,TouchableOpacity} from 'react-native'




const NewClientRequest = () => {
    const clients=([
        { id:'1',name:"new client 1"},
        {id:'2',name:"new client 2"},
        { id:'3', name:"new client 3"},
        {id:'4',name:"new client 4"},
        { id:'5',name:"new client 5"},
        {id:'6',name:"new client 6"},
        { id:'7', name:"new client 7"},
        {id:'8',name:"new client 8"},
    ]);
    const pressHandler = (id) =>{
        console.log(id);
    }
      return (
        
     <View style={styles.container}>
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
            backgroundColor:'white',
            paddingTop:40,
            //height:"100%",
            paddingHorizontal:0,
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

export default NewClientRequest