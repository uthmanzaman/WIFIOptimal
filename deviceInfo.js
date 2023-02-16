import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
//import {useDeviceName, useIsEmulator, getUniqueId} from 'react-native-device-info';
import * as Device from 'expo-device';
import WifiManager from "react-native-wifi-reborn";




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

const styles = StyleSheet.create({

  header: {

    fontSize: 20,
    textAlign: 'left',
    marginTop: 50,
    color: '#ffffff',
    marginVertical: 15,
  },

})

export default getWifiName;