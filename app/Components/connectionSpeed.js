import {React, useState} from 'react';
import { EventRegister} from 'react-native-event-listeners'
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import RNFetchBlob from "rn-fetch-blob";




export function ConnectionSpeed ()  {

const downloadSizeInBits = 12000000;
const metric = 'MBps';
 const measureConnectionSpeed = (imageURIParam:string): any => {

const imageURI= imageURIParam?imageURIParam:'https://drive.google.com/open?id=1MBHJXeRxMLLwHFpqbgTdEPsFArMM0cz7';

  return new Promise((resolve, reject) => {
    const startTime = (new Date()).getTime();
    RNFetchBlob
      .config({
        fileCache: true,
      })
      .fetch('GET', imageURI, {})
      .then((res) => {
        const endTime = (new Date()).getTime();
        const duration = (endTime - startTime)/ 1000;
        const speed = (downloadSizeInBits/ (1024 * 1024 * duration));

        resolve({metric, speed});
        
      })
      .catch(reject);
  });
}};
// function ConnectionSpeed() {


 
  

//   const [checkSpeed, SetCheckSpeed] = useState(false)
//     return (
//         <><View style={styles.container}>
//             <Text style={styles.title}>
//                 speedTest
//             </Text>
//         </View><View className="card-body mt-4">
//                 <Text className="display-1">{checkSpeed} MB/s</Text>
//             </View></>

//     );react
// }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc125',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
}); 

export default ConnectionSpeed; 