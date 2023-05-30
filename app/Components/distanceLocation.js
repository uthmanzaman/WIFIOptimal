import React, { useState } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const DistanceLocation = () => {
  const [distance, setDistance] = useState(null);

  const measureDistance = () => {
    NetInfo.fetch().then((connectionInfo) => {
      if (connectionInfo.type === "wifi") {
        const signalStrength = connectionInfo.details.strength;
        
        setDistance(distance);
      } else {
        Alert.alert("Warning", "You are not connected to a Wi-Fi network");
      }
    });
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={measureDistance}>
        <Text style={styles.buttonText}>Measure Distance</Text>
      </TouchableOpacity>
      {distance && (
        <Text style={{ marginTop: 20 }}>
          Distance from Router: {distance} meters
        </Text>
      )}
    </View>
  );
};

export default DistanceLocation;

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
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
