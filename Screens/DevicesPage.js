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
//import DeviceInfo from 'react-native-device-info';
import * as  Device  from 'expo-device';






const DevicesPage = ({ navigation }) => {

  // const socket = dgram.createSocket('udp4')

  // socket.bind(5000)
  // socket.once('listening', function() {
  //   socket.send('Hello World!', undefined, undefined, remotePort, remoteHost, function(err) {
  //     if (err) throw err
  
  //     console.log('Message sent!')
  //   })
  // })
  
  // socket.on('message', function(msg, rinfo) {
  //   console.log('Message received', msg)
  // })

  const [netInfoObject, setNetInfoObject] = useState({ deviceName: '' });
  const [showModal, setShowModal] = useState(false)
  const [deviceList, setDeviceList] = useState([]);

  const getAllDevices = () => {

    var Client = require('react-native-ssdp').Client,
    client = new Client();

    client.search('ssdp:all');
    
    //client.search('urn:dial-multiscreen-org:service:dial:1');



    client.on('response', function (headers, code, rinfo) {
      console.log('Got a response to an m-search:\n%d\n%s\n%s', code, JSON.stringify(headers, null, '  '), JSON.stringify(rinfo, null, '  '))
      const url = new URL(headers.LOCATION);
      if (url != null) {
        setDeviceList(deviceList => {
          return [...deviceList, url]
       })
       
       //console.log(deviceList)
    }});
    
    //client.search('urn:dial-multiscreen-org:service:dial:1');

    
  //   client.on('response', function (headers) {
  //     const url = new URL(headers.LOCATION);
  //     if (url != null) {
  //       setDeviceList(deviceList => {
  //         return [...deviceList, url]
  //      })
  //      console.log(deviceList)
  // }});
    };


  function DataView() {    // Data view of netinforobject which goes into connected devices box
    
    

    return (
      <TouchableOpacity style={styles.listItem}  iconType="phone" onPress={() => setShowModal(true)} >
        <View>
          
          <Text style={styles.dataViewText} >Device Name: {Device.deviceName}</Text>
          <Text style={styles.dataViewText}>IP Address {netInfoObject.ipAdd}</Text>
        </View>
      </TouchableOpacity>)
  }

  function ModalDataView() {    // Data view of netinforobject which goes into connected devices Modal
    return (
        <View>
          <Text style={styles.dataViewText}><Text style={styles.header} >Device Name:</Text> {'   '}{Device.deviceName}</Text>
          {/* <Text style={styles.dataViewText}><Text style={styles.header} >IP Address:</Text> {'   '}{netInfoObject.ipAddress}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >Name:</Text> {'   '}{netInfoObject.name}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >Device Type:</Text> {'   '}{netInfoObject.dType}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >Model Name:</Text> {'   '}{netInfoObject.modelName}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >MAC Address:</Text> {'   '}{netInfoObject.macAddress}</Text>
    */}
        </View> 
    )
  }

  function getNetInfo() {         //sets netinforobject to parameters
    const data = setNetInfoObject({ deviceName: '', ipAddress: '', dType: '', modelName: '', macAddress: '' }) //Keys for object (netinfo)
    Device.deviceName;
    setNetInfoObject(Device.deviceName) 
    //  => {
    //   setNetInfoObject(prevState => ({ ...prevState, deviceName: deviceName }));
    // };
    // Device.modelName.then((ipAdd) => {
    //   setNetInfoObject(prevState => ({ ...prevState, ipAddress: ipAdd }));
    // });
    // Device.brand.then((deviceType) => {
    //   setNetInfoObject(prevState => ({ ...prevState, dType: deviceType }));
    // });
    // Device.osBuildId.then((testN) => {
    //   setNetInfoObject(prevState => ({ ...prevState, name: testN }));
    // });
    // Device.osName.then((mac) => {
    //   setNetInfoObject(prevState => ({ ...prevState, macAddress: mac }));
    // });
    
    return () => {
      data()
    }
  }

  useEffect(() => {        // Displays netinfoobject information when devices page is loaded up
    getNetInfo()
    // getAllDevices();

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
      <TouchableOpacity style={styles.button} onPress={() => getAllDevices()}>
         <Text style={styles.buttonText}>Scan Network</Text>
       </TouchableOpacity>
       <DataView/>
      

      <Button style={styles.listItem}  onPress={() => logout()} title="SignOut" />
      
      
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
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',



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
    width: 130,
    height: 50,
    borderRadius: 20,
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
    backgroundColor: '#007AFF',
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