import React from 'react'
//import {useDeviceName, useIsEmulator, getUniqueId} from 'react-native-device-info';
//import * as Device from 'expo-device';
import WifiManager from "react-native-wifi-reborn"

import PermissionsAndroid from 'react-native';

const requestLocationPersmission = () => {

const granted =  PermissionsAndroid.request(
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

}


function getWifiName(){

  WifiManager.getCurrentWifiSSID().then(
    ssid => {
      console.log("Your current connected wifi SSID is " + ssid);
    },
    () => {
      console.log("Cannot get current SSID!");
    }
  )
}




export default getWifiName;