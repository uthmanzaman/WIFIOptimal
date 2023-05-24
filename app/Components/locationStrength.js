import React, { useState } from 'react';
import { View, Text, Button, PermissionsAndroid } from 'react-native';
import WiFi from 'react-native-wifi-reborn';




const LocationStrength = () => {
    const handleGetLocationStrength = () => {
        WiFi.getCurrentSignalStrength().then((rssi) => {
          const Psignal = Math.pow(10, rssi / 10) / 1000; // Calculate power of the signal
          const noisePower = 0.1; // Assume a predefined noise power threshold
    
          const snr = Psignal / noisePower; // Calculate the SNR
    
          let locationStrength = '';
          if (snr > 10) {
            locationStrength = 'Good';
          } else {
            locationStrength = 'Bad';
          }
    
           
          alert(`Location Strength: ${locationStrength}`);  // Displays results to user
        });
      }

      return (
        <View>
          <Button title="Get Location Strength" onPress={handleGetLocationStrength} />
        </View>
      );

    };

  export default LocationStrength;