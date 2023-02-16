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
      <TouchableOpacity style={styles.listItem} onPress={() => setShowModal(true)} >
        <View>
          <Text style={styles.dataViewText}>{netInfoObject.name}</Text>
          <Text style={styles.dataViewText}>Device Name: {netInfoObject.deviceName}</Text>
          <Text style={styles.dataViewText}>IP Address: {netInfoObject.ipAddress}</Text>
          <Text style={styles.dataViewText}>{netInfoObject.dType}</Text>
          <Text style={styles.dataViewText}>{netInfoObject.modelName}</Text>
        </View>


      </TouchableOpacity>)
  }

  function getNetInfo() {         //sets netinforobject to parameters
    const data = setNetInfoObject({ name: '', deviceName: '', ipAddress: '', dType: '', modelName: '' })
    DeviceInfo.getDeviceName().then((sdkName) => {
      setNetInfoObject(prevState => ({ ...prevState, deviceName: sdkName }));
    });
    DeviceInfo.getIpAddress().then((ipAdd) => {
      setNetInfoObject(prevState => ({ ...prevState, ipAddress: ipAdd }));
    });
    // DeviceInfo.getType().then((deviceType) => {
    //   setNetInfoObject(prevState => ({ ...prevState, dType: deviceType }));
    // });
    // DeviceInfo.getDevice().then((testN) => {
    //   setNetInfoObject(prevState => ({ ...prevState, name: testN }));
    // });

    // let model = DeviceInfo.getModel();
    // setNetInfoObject(prevState => ({ ...prevState, modelName: model }));

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
      <Text style={styles.header}>Connected Devices</Text>
      <View></View>
      <DataView />
      <DataView />
      <DataView />

      <Button onPress={() => logout()} title="SignOut" />
      <Button onPress={() => getWifiName} title="WifiName" />
      <Modal visible={showModal} transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <Text>Hello</Text>
          <Button title="Go back" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFBFA',

  },
  header: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 50,
    color: 'black',
    marginVertical: 15,
  },
  listItem: {
    flex: 0.1,
    padding: 20,
    borderWidth: 1,
    borderColor: '',
    color: '#fff',
    backgroundColor: '#7692FF',
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center'

  },
  dataViewText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#ffffff',

  },
  Button: {
    marginVertical: 10,
    backgroundColor: 'red',
  }
});

export default DevicesPage;