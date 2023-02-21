import React from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { isBlock } from 'typescript';
// import { measureConnectionSpeed } from 'react-native-network-bandwith-speed';


// getNetworkBandwidth = async () => {
//     try {
//       const networkSpeed = await measureConnectionSpeed();
//       console.log(networkSpeed); // Network bandwidth speed 
//     } catch (err) {
//       console.log(err);  
//     }
//   }


export const SpeedTest = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                speedTest
            </Text>
        </View>
    );
}


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
    },
    // loader: {
    //     display : inline-isBlock,
    //     hieght: 240,
    //     width: 240,
    //     borderRadius: 50,
    //     background: conic-gradient(rgba(1, 182, 190, 0.3) ,0% transparent)

    // }
});

export default SpeedTest; 