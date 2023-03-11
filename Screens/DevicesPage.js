import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Alert,
  Modal,
  TouchableOpacity
} from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { getWifiName } from '../deviceInfo';
import DeviceInfo from 'react-native-device-info';
import { DeviceType } from 'expo-device';




const DevicesPage = ({ navigation }) => {
  const [netInfoObject, setNetInfoObject] = useState({ deviceName: '' });
  const [showModal, setShowModal] = useState(false)

  function DataView() {    // Data view of netinforobject which goes into connected devices box
    return (
      <TouchableOpacity style={styles.listItem}  iconType="phone" onPress={() => setShowModal(true)} >
        <View>
          
          <Text style={styles.dataViewText} >Device Name {netInfoObject.deviceName}</Text>
          <Text style={styles.dataViewText}>IP Address {netInfoObject.ipAddress}</Text>
        </View>
      </TouchableOpacity>)
  }
  function ModalDataView() {    // Data view of netinforobject which goes into connected devices Modal
    return (
        <View>
          <Text style={styles.dataViewText}><Text style={styles.header} >Device Name:</Text> {'   '}{netInfoObject.deviceName}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >IP Address:</Text> {'   '}{netInfoObject.ipAddress}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >Name:</Text> {'   '}{netInfoObject.name}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >Device Type:</Text> {'   '}{netInfoObject.dType}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >Model Name:</Text> {'   '}{netInfoObject.modelName}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >MAC Address:</Text> {'   '}{netInfoObject.macAddress}</Text>
        </View>
    )
  }

  function getNetInfo() {         //sets netinforobject to parameters
    const data = setNetInfoObject({ name: '', deviceName: '', ipAddress: '', dType: '', modelName: '', macAddress: '' }) //Keys for object (netinfo)
    DeviceInfo.getDeviceName().then((sdkName) => {
      setNetInfoObject(prevState => ({ ...prevState, deviceName: sdkName }));
    });
    DeviceInfo.getIpAddress().then((ipAdd) => {
      setNetInfoObject(prevState => ({ ...prevState, ipAddress: ipAdd }));
    });
    DeviceInfo.getType().then((deviceType) => {
      setNetInfoObject(prevState => ({ ...prevState, dType: deviceType }));
    });
    DeviceInfo.getDevice().then((testN) => {
      setNetInfoObject(prevState => ({ ...prevState, name: testN }));
    });
    DeviceInfo.getMacAddress().then((mac) => {
      setNetInfoObject(prevState => ({ ...prevState, macAddress: mac }));
    });
    

    let model = DeviceInfo.getModel();
    setNetInfoObject(prevState => ({ ...prevState, modelName: model }));

    return () => {
      data()
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
    <View style={styles.header}>
         <Text style={styles.headerText}>Connected Devices</Text>
      </View>
      <DataView />
   

      <Button onPress={() => logout()} title="SignOut" />
      <Button onPress={() => getWifiName} title="WifiName" />
      
      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalStyle}>
          <ModalDataView />
          <Button title="Go back" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    flex: 0.1,
    padding: 20,
    borderWidth: 1,
    borderColor: '',
    backgroundColor: '#7692FF',
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center'

  },
  dataViewText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#ffffff',
    margin: 10,
  },
  Button: {
    marginVertical: 10,
    backgroundColor: 'red',
  },
  modalStyle: {
    width: '90%',
    flex: .8, 
    backgroundColor: 'grey', 
    margin: 20,
    marginTop: 100,
    borderRadius: 20,
    justifyContent: 'center'
    
  }
});

export default DevicesPage;