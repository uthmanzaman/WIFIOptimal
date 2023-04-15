import { React, useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Button
} from 'react-native';
//import ConnectionSpeed from '../app/Components/connectionSpeed';


// import { EventRegister } from 'react-native-event-listeners'
// import { emitConfig } from '../app/Components/connectionSpeed';
import RNFetchBlob from "rn-fetch-blob";
import {db} from '../firebase.js';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import {wifiName} from './DevicesPage';







function SpeedTest() {

    const [x, setX] = useState({})
    const [showModal, setShowModal] = useState(false)
    /*global speedData*/
    //const  [speedData, setSpeedData] = useState({})
    let speedData = []

    //const todoRef = firebase.firestore().collection('speedTestData')
    //const [SpeedTestData, setSpeedTestData] = useState('');


    // set(ref(db, 'speedTest/' + x), {
    //   username: x,
    // });






    const downloadSizeInBits = 12000000;
    const metric = 'MBps';
    const measureConnectionSpeed = (imageURIParam:string): string => {

const imageURI= imageURIParam?imageURIParam:'https://drive.google.com/file/d/1uMBtds_ooFmfkrn1JcUl0UZjh-oi3k9g/view?usp=sharing';
  return new Promise((resolve, reject) => {
    const startTime = (new Date()).getTime();
    RNFetchBlob
      .config({
        fileCache: false,
      })
      .fetch('GET', imageURI, {})
      .then((res) => {
        const endTime = (new Date()).getTime();
        const duration = (endTime - startTime)/ 1000;
        const speed = (downloadSizeInBits/ (1024 * 1024 * duration));

        resolve({metric, speed});
        setX(speed)
      })
      .catch(reject);
  });
};



    function DataView(){
      return (
        <TouchableOpacity style={styles.Hbtn} onPress={() => setShowModal(true)}>
          <View>
         <Text style={styles.buttonText} >History</Text>
         </View>
       </TouchableOpacity>
      )
    }

    function ModalDataView() {    // Data view of speedtest object 
      return (
          <View>
            <Text style={styles.dataViewText}><Text style={styles.header} >Previous Speed Tests:</Text> {'   '}{}</Text>
          </View> 
      )
    }





    const getNetworkBandwidth = async (): Promise<void> => {           //logs download speed (object)
      try {
        ///*global NetworkBandwidthTestResults*/
        //const  NetworkBandwidthTestResults = 
        await measureConnectionSpeed();
        //console.log(networkSpeed); // Network bandwidth speed
        try {
           addDoc(collection(db, "speedTestData"), {
            downloadSpeed: x,
          });
          //console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      
    const colRef = collection(db, 'speedTestData')

// get collection data 

getDocs(colRef)
  .then((snapshot) =>{
    
    snapshot.docs.forEach((doc) => {
      speedData.push({...doc.data()})
      
    })
    console.log(speedData)
  })
    .catch(err => {
      console.log(err)
    })
      } catch (err) {
        console.log(err);  
      }
    }



    return (
      <View style={styles.container}>
        <View style={styles.header}>
         <Text style={styles.headerText}>Speed Test</Text>
         <Text style={styles.headerText}>ss{ [wifiName]}</Text>
        </View>
            <View style={styles.content}>
         <TouchableOpacity style={styles.button} onPress={() => getNetworkBandwidth()}>
         <Text style={styles.buttonText}>Start</Text>
       </TouchableOpacity>
       <View style={styles.output}>
        <View style={{flex: 0.5}}>
         <Text style={styles.outputText}>Download speed: {Math.round(x * 100) / 100} MB/s</Text>
         </View>
         <View style={{flex: 0.5}}>
         <Text style={styles.outputText}>Upload speed: {} MB/s</Text>
         </View>
       </View>
       <DataView/>
       <Modal visible={showModal} transparent={true}>
       <View style={styles.modalStyle}>
       <ModalDataView/>
       <Button title="Go back" onPress={() => setShowModal(false)} />

       </View>
       </Modal>
            </View>
        </View>
        
    );

    
      
}


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
      width: 200,
      height: 200,
      borderRadius: 160,
      backgroundColor: '#007AFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 32,
      fontWeight: 'bold',
    },
    Hbtn: {
      backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    Text: 'black'
    },
    output: {
      marginTop: 50,
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    outputText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
    modalStyle: {
      width: '90%',
      flex: .7, 
      backgroundColor: 'grey', 
      margin: 20,
      marginTop: 150,
      borderRadius: 20,
      justifyContent: 'center',
    },
    dataViewText: {
      fontSize: 16,
      textAlign: 'left',
      color: '#ffffff',
      margin: 5,
  
    },
});

export default SpeedTest; 