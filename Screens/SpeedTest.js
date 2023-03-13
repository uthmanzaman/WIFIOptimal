import { React, useEffect, useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
// //import ConnectionSpeed from '../app/Components/connectionSpeed';


// import { EventRegister } from 'react-native-event-listeners'
// import { emitConfig } from '../app/Components/connectionSpeed';
// import RNFetchBlob from "rn-fetch-blob";





function SpeedTest() {

//     const [x, setX] = useState({})

//     //const [downloadSpeed, setDownloadSpeed] = useState({});



//     const downloadSizeInBits = 12000000;
//     const metric = 'MBps';
//     const measureConnectionSpeed = (imageURIParam:string): any => {

// const imageURI= imageURIParam?imageURIParam:'https://drive.google.com/file/d/1uMBtds_ooFmfkrn1JcUl0UZjh-oi3k9g/view?usp=sharing';
//   return new Promise((resolve, reject) => {
//     const startTime = (new Date()).getTime();
//     RNFetchBlob
//       .config({
//         fileCache: false,
//       })
//       .fetch('GET', imageURI, {})
//       .then((res) => {
//         const endTime = (new Date()).getTime();
//         const duration = (endTime - startTime)/ 1000;
//         const speed = (downloadSizeInBits/ (1024 * 1024 * duration));

//         resolve({metric, speed});
//         setX(speed)

//       })
//       .catch(reject);
//   });
};





//     const getNetworkBandwidth = async (): Promise<void> => {           //logs download speed (object)
//       try {
//         const networkSpeed: NetworkBandwidthTestResults = await measureConnectionSpeed();
//         console.log(networkSpeed); // Network bandwidth speed
//         //console.log(x);
//       } catch (err) {
//         console.log(err);  
//       }
//     }



//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//          <Text style={styles.headerText}>Speed Test</Text>
//             </View>
//             <View style={styles.content}>
//          <TouchableOpacity style={styles.button} onPress={() => getNetworkBandwidth()}>
//          <Text style={styles.buttonText}>Start</Text>
//        </TouchableOpacity>
//        <View style={styles.output}>
//         <View style={{flex: 0.5}}>
//          <Text style={styles.outputText}>Download speed: {Math.round(x * 100) / 100} MB/s</Text>
//          </View>
//          <View style={{flex: 0.5}}>
//          <Text style={styles.outputText}>Upload speed: {Math.round(x * 100) / 100} MB/s</Text>
//          </View>
//        </View>
//             </View>
//         </View>
//     );

    
      
// }


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
    output: {
      marginTop: 50,
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    outputText: {
      fontSize: 14,
    }
});

export default SpeedTest; 