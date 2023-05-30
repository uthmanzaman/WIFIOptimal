import React, { useState, useEffect } from "react";
import { View, Text, Button,TouchableOpacity, StyleSheet } from "react-native";
import WiFi from "react-native-wifi-reborn";


import { COLORS } from "../constants";

const LocationStrength = () => {
  const [signalStrength, setSignalStrength] = useState([]);
  const [readings, setReadings] = useState([]);


  const handleGetLocationStrength = () => {
    WiFi.getCurrentSignalStrength().then((rssi) => {
      //console.log(rssi);

      setReadings((prevReadings) => [...prevReadings, rssi]);
      const Psignal = Math.pow(10, rssi / 10) / 1000; // Calculate power of the signal
      const noisePower = 0.1; // Assume a predefined noise power threshold

      const snr = Psignal / noisePower; // Calculate the SNR
      //console.log(snr)

      let locationStrength = "";
      if (snr < 10) {
        locationStrength = "Good";
      } else {
        locationStrength = "Bad";
      }

      //alert(`Location Strength: ${locationStrength} ${rssi}dBm`); // Displays results to user
    });
  };
  


  const calculateAverageSignalStrength = () => {
    // Calculate the average signal strength
    const average = readings.reduce((sum, value) => sum + value, 0) / readings.length;

    // Update the signal strength state
    setSignalStrength(average.toFixed(2)); // Adjust the decimal places as desired

    // Clear the readings array after calculating the average
    setReadings([]);
  };

  useEffect(() => {
    // Calculate average signal strength
    handleGetLocationStrength();

    
  }, []);


  return (
    <View>
      <TouchableOpacity style={styles.button}  onPress={calculateAverageSignalStrength}>
        <Text style={styles.buttonText}>Signal Strength</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationStrength;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2A2A2A",
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    width: 160,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
