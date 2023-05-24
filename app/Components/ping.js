import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import axios from "axios";

const Ping = () => {
  const [pingResults, setPingResults] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePing = async () => {
    setError(false);
    setPingResults(null);
    setLoading(true);

    try {
      const numRequests = 10; // Number of requests to make
      const latencyArray = [];// An array for to hold latency data 

      for (let i = 0; i < numRequests; i++) {
        const startTime = performance.now();
        await axios.get("https://api.github.com/", { // Make a request to Github
        params: { cacheBuster: Date.now() }, // Add cache-busting query parameter
      });
        const endTime = performance.now();
        const latency = Math.round(endTime - startTime);
        latencyArray.push(latency);
      }

      const averageLatency =
        latencyArray.reduce((a, b) => a + b, 0) / latencyArray.length;
      //console.log("Latency Array:", latencyArray);
      //console.log("Average Latency:", averageLatency);

      setPingResults(averageLatency);
    } catch (error) {
      setError(true);
      setPingResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.box}>
      {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000000" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <>
          {pingResults !== null && (
            <Text sstyle={styles.resultText}>Ping Result: {pingResults}ms</Text>
          )}

          {error && (
            <Text style={[styles.resultText, styles.errorText]}>
              Ping Failed
            </Text>
          )}

          {!pingResults && !error && (
            <Text style={styles.resultText}>Press the button to ping</Text>
          )}

          <TouchableOpacity style={styles.Hbtn} onPress={handlePing}>
            <View>
              <Text style={styles.buttonText}>Ping</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  box: {
    width: 300,
    padding: 20,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  Hbtn: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
    padding: 10,
    margin: 10,
    elevation: 5,
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
  },
});

export default Ping;
