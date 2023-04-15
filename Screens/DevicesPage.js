/* eslint-disable react/prop-types */
import React, {  useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { requestLocationPersmission, getWifiName } from '../deviceInfo';
//import DeviceInfo from 'react-native-device-info';
import * as  Device  from 'expo-device';
import * as Network from 'expo-network';
import WifiManager from "react-native-wifi-reborn"

//import {DeviceDiscoveryManager} from "app/DeviceDiscoveryManager"

const DevicesPage = ({ navigation }) => {

  

  // socket.bind(5000)
  // socket.once('listening', function() {
  //   socket.send('Hello World!', undefined, undefined, remotePort, remoteHost, function(err) {
  //     if (err) throw err
  
  //     console.log('Message sent!')
  //   })
  // })
  
  

  const [netInfoObject, setNetInfoObject] = useState({ deviceName: '' });
  const [showModal, setShowModal] = useState(false)
  const [deviceList, setDeviceList] = useState([]);
  const [ipA, setIp] = useState({});
  export const [wifiName, SetWifiName] = useState([]);


  const getAllDevices = () => {

    requestLocationPersmission();
   

    var Client = require('react-native-ssdp').Client,
    client = new Client();

    //client.search('ssdp:all');
    client.search('urn:dial-multiscreen-org:service:dial:1');
    //client.search('urn:schemas-upnp-org:service:ContentDirectory:1');


    client.on('response', function (headers, code, rinfo) {
      console.log('Got a response to an m-search:\n%d\n%s\n%s', code, JSON.stringify(headers, null, '  '), JSON.stringify(rinfo, null, '  '))
      const url = new URL(headers.LOCATION);
      if (url != null) {
        setDeviceList(currentDeviceList => {
          return [...currentDeviceList, url]
       })
       //console.log(deviceList)
    }});

    return (
      <View>
          <DataView/> 
      </View>

    )
    
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

    // function getIp(){
    //   const data = setIp({ipAddress: '' }) //Keys for object ()

    //   const ip =  Network.getIpAddressAsync()
    //   .then => (ipAdd)
    //   Device.modelName.then((ipAdd) => {
    //        setNetInfoObject(prevState => ({ ...prevState, ipAddress: ipAdd }));
    //      });
    
    //   setIp(ip)
    // };

    const requestLocationPersmission = async() => {

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location permission is required for WiFi connections',
              message:
                'This app needs location permission as this is required  ' +
                'to scan for wifi networks.',
              buttonNegative: 'DENY',
              buttonPositive: 'ALLOW',
            }
      );
      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getWifiName()
      } else {
        console.log('Location Permission Denied')
      }
      
    
    function getWifiName(){

      WifiManager.getCurrentWifiSSID().then(
        ssid => {
          console.log("Your current connected wifi SSID is " + ssid);
          SetWifiName(ssid)

        },
        () => {
          console.log("Cannot get current SSID!");
        }
      )
    }
  }


  function DataView() {    // Data view of netinforobject which goes into connected devices box
    
    //console.log(ipA)

    return (
      <TouchableOpacity style={styles.listItem} onPress={() => setShowModal(true)} >
        <View>
          
          <Text style={styles.dataViewText} >Device Name: {Device.deviceName}</Text>
          <Text style={styles.dataViewText}> OS: {Device.osName}</Text>
          <Text style={styles.dataViewText}> IP add: {}</Text>
          
        </View>
      </TouchableOpacity>)
  }

  function ModalDataView() {    // Data view of netinforobject which goes into connected devices Modal
    return (
        <View>
          <Text style={styles.dataViewText}><Text style={styles.header} >Device Name:</Text> {'   '}{Device.deviceName}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >Model:</Text> {'   '}{Device.modelName}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >Brand:</Text> {'   '}{Device.brand}</Text>
          <Text style={styles.dataViewText}><Text style={styles.header} >OS:</Text> {'   '}{Device.osName}</Text>
    
        </View> 
    )
  }

  // function getNetInfo() {         //sets netinforobject to parameters
  //   const data = setNetInfoObject({ deviceName: '', ipAddress: '', dType: '', modelName: '', macAddress: '' }) //Keys for object (netinfo)
  //   Device.deviceName;
  //   setNetInfoObject(Device.deviceName) 
    
  //   return () => {
  //     data()
  //   }
  // }

  useEffect(() => {        // Displays netinfoobject information when devices page is loaded up
    //getNetInfo()
    //getAllDevices();
    //DeviceDiscoveryManager();
    //requestLocationPersmission();

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
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Text style={styles.headerText}>Connected Devices</Text>
         <Text style={styles.headerText}>{[wifiName]}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => getAllDevices()}>
         <Text style={styles.buttonText}>Scan Network</Text>
       </TouchableOpacity>

       {/* <DataView/> */}
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
    flex: 0.15,
    padding: 20,
    borderWidth: 1,
    borderColor: '',
    backgroundColor: '#007AFF',
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center',


  },
  dataViewText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#ffffff',
    margin: 5,

  },
  Button: {
    marginVertical: 10,
    backgroundColor: 'red',
  },
  modalStyle: {
    width: '90%',
    flex: .7, 
    backgroundColor: 'grey', 
    margin: 20,
    marginTop: 150,
    borderRadius: 20,
    justifyContent: 'center',
  }
});

export default DevicesPage;