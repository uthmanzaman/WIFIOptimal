import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {useDeviceName, useIsEmulator} from 'react-native-device-info';


const deviceInfo = () => {
    let deviceI = {};
    deviceI.deviceName = useDeviceName();
    deviceI.isEmulator = useIsEmulator();




    return (
        <Text>{JSON.stringify(deviceI, null, '')}</Text>
    )

}

export default deviceInfo;