import { useState, useEffect } from "react";
//import {useDeviceName, useIsEmulator, getUniqueId} from 'react-native-device-info';
import WifiManager from "react-native-wifi-reborn"

import NetInfo from "@react-native-community/netinfo";


const [netInfoObject, setNetInfoObject] = useState({ deviceName: "" });


const networkInfo = () => {


function getNetInfo() {
  //sets netinforobject to parameters
  const data = setNetInfoObject({
    deviceName: "",
    ssid: "",
    ipAddress: "",
    dType: "",
    modelName: "",
    macAddress: "",
    Strength: "",
    frequency: "",
    subnet: "",
    linkSpeed: "",
    rxLinkSpeed: "",

  }); //Keys for object (netinfo)

  const unsubscribe = 
  NetInfo.addEventListener(res => {
    //console.log("Type ", state);
    console.log("Details", res.details);
    setNetInfoObject((prevState) => ({
      ...prevState,
      strength: res.details.strength,
    }));
    setNetInfoObject((prevState) => ({
      ...prevState,
      frequency: res.details.frequency,
    }));
    setNetInfoObject((prevState) => ({
      ...prevState,
      subnet: res.details.subnet,
    }));
    setNetInfoObject((prevState) => ({
      ...prevState,
      linkSpeed: res.details.linkSpeed,
    }));
    setNetInfoObject((prevState) => ({
      ...prevState,
      rxLinkSpeed: res.details.rxLinkSpeed,
    }));
  });

  return () => {
    data()
    unsubscribe();

  };
}


useEffect(() => {
  // Displays netinfoobject information when devices page is loaded up
  getNetInfo();
}, []);

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




export default networkInfo;