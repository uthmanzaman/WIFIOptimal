import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { FocusedStatusBar } from "../app/Components";
import { COLORS } from "../app/constants";

import NetInfo from '@react-native-community/netinfo';
import locationStrength from '../app/Components/locationStrength';

const HandleRouterPlacement = () => {
  const [signalMeasurements, setSignalMeasurements] = useState([]);
  const [averageSignalStrength, setAverageSignalStrength] = useState(0);
  const [signalDistribution, setSignalDistribution] = useState([]);
  const [markedLocation, setMarkedLocation] = useState(null);
  const [signalStrength, setSignalStrength] = useState(null);
  const [watchId, setWatchId] = useState(null);

  const initialLatitude = 51.57017578032149; 
  const initialLongitude = -0.007653400915825717;

  const handleMarkLocation = async () => {
    try {
      const response = await NetInfo.fetch();
      const signalInfo = response.details.signalStrength;
      setSignalStrength(signalInfo);
      console.log(signalInfo);
    } catch (error) {
      console.error('Error fetching signal strength:', error);
      setSignalStrength(null);
      console.log(signalStrength);

    }

    const newWatchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkedLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting current position:', error);
        setMarkedLocation(null);
      }
    );

    setWatchId(newWatchId);
  };

  const clearWatchId = () => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };
  
  useEffect(() => {

   

    // Start listening for location updates
    const watchId = Geolocation.watchPosition(
      position => {
        // Obtain the signal strength measurement here
        const signalStrength = locationStrength; // Replace with your actual measurement logic

        // Store the measurement along with the location information
        const measurement = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          signalStrength,
        };

        // Update the signal measurements state
        setSignalMeasurements(prevMeasurements => [...prevMeasurements, measurement]);
      },
      error => {
        console.log('Error getting location:', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Only update the location if the device has moved at least 10 meters
      }
    );

    // Clean up the location watcher when the component is unmounted
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    // Calculate average signal strength
    const totalSignalStrength = signalMeasurements.reduce((sum, measurement) => sum + measurement.signalStrength, 0);
    const average = totalSignalStrength / signalMeasurements.length;
    setAverageSignalStrength(average);
    // console.log(totalSignalStrength);

    // Calculate signal strength distribution
    const distribution = Array(10).fill(0);
    signalMeasurements.forEach(measurement => {
      const index = Math.floor(measurement.signalStrength / 10);
      distribution[index]++;
    });
    setSignalDistribution(distribution);
  }, [signalMeasurements]);

  return (
    <View style={{ flex: 1 }}>
    <FocusedStatusBar backgroundColor={COLORS.secondary} />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: initialLatitude, // Replace with the initial latitude of your map
          longitude: initialLongitude, // Replace with the initial longitude of your map
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markedLocation && (
          <Marker
            coordinate={markedLocation}
            title="Marked Location"
            description="This is the marked location"
            onPress={() => console.log('hi')}
          />
        )}
      </MapView>
      <View style={{ position: 'absolute', top: 20, left: 20 }}>
        <TouchableOpacity onPress={() => handleMarkLocation()}>
          <Text style={{ backgroundColor: COLORS.primary, color: 'white', Bold: true,padding: 10 }}>Mark Location</Text>
        </TouchableOpacity>
        {signalStrength && <Text styles={{color: 'white'}}>Signal Strength: {signalStrength}</Text>}
      {markedLocation && (
        <Text style={{ backgroundColor: COLORS.secondary, color: 'white', Bold: true,padding: 10 }}>
          Marked Location: {markedLocation.latitude}, {markedLocation.longitude}
        </Text>
        
      )}
      </View>
     
    </View>
  );
};

export default HandleRouterPlacement;

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
    width: 120,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
});