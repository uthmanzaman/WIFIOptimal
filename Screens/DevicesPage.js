import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import { getAuth, signOut } from "firebase/auth";
//import {deviceInfo} from '../deviceInfo';




const DevicesPage = ({ navigation }) => {      
  const [netInfoObject, setNetInfoObject] = useState({ name: '' });    


  function DataView() {    // Data view of netinforobject which goes into connected devices box
    return (
      <TouchableOpacity style={styles.listItem} onPress={connectedDevicesObject}>
        <Text style={styles.dataViewText}>{netInfoObject.name}</Text>
        <Text style={styles.dataViewText}>{netInfoObject.secondName}</Text>
      </TouchableOpacity>)
  }

  function connectedDevicesObject() {     // Alerts when conected devices pressed 
    Alert.alert("Hello");
  }
  
  function getNetInfo() {         //sets netinforobject to parameters
    const data = setNetInfoObject({ name: 'Connected', secondName: 'Devices' })
    return () => {
      data()
      unsubscribe();

    }
  }
  
  useEffect(() => {        // Displays netinfoobject information when devices page is loaded up
    getNetInfo()
  }, [])


  function logout() {        //Log out function navigates user back to login once signed out clicked
    const auth = getAuth();
    auth.signOut()
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Has LOGGED OUT", user.email);
      })
    navigation.navigate('Login')
    //.catch(error =>(error.message))
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>"Wifi Network Name"</Text>
      <View></View>
      <DataView />
      <Button onPress={() => logout()} title="SignOut" />
      <Button title="TESTING DATA" onPress={() => { getNetInfo(); console.log(netInfoObject) }}></Button>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#0096D6',

  },
  header: {

    fontSize: 20,
    textAlign: 'left',
    marginTop: 50,
    color: '#ffffff',
    marginVertical: 15,
  },
  listItem: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'green',
    color: '#fff',
    backgroundColor: '#1DA1F2',
    width: '90%',
    borderRadius: 15,

  },
  dataViewText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#ffffff',

  },
});

export default DevicesPage;