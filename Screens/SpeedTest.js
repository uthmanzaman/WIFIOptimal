/* eslint-disable react/no-unescaped-entities */
import { React, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from "react-native";
// import ConnectionSpeed from '../app/Components/connectionSpeed';
// import { EventRegister } from 'react-native-event-listeners'
// import { emitConfig } from '../app/Components/connectionSpeed';

import Ping from '../app/Components/ping';
import firebase from 'firebase/app';
import { getStorage, ref, uploadBytes } from "firebase/storage";




import RNFetchBlob from "rn-fetch-blob";

import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  where,
  firestore,
} from "firebase/firestore";
import { getWifiName } from "./DevicesPage";
import { UserContext } from "../app/Context.js";
import WifiManager from "react-native-wifi-reborn";


import { COLORS } from "../app/constants";
import { FocusedStatusBar } from "../app/Components";



function SpeedTest() {
  const [sTest, setTest] = useState(0);
  const [UploadTest, setUploadTest] = useState(0);
  const [isLoading, setIsLoading] = useState(false);



  const [showModal, setShowModal] = useState(false);
  const [speedData, setSpeedData] = useState([{}]);
  const [wifiName2, SetWifiName2] = useState([]);

  let speedDataObject = [{}];

  const { userUID } = useContext(UserContext);


  const downloadSizeInBits = 12000000;
  const metric = "MBps";
  const measureConnectionSpeed = (fileURIParam: string): string => {
    setIsLoading(true);
    // Holds the functionality of the speed test
    const imageURI = fileURIParam
      ? fileURIParam
      : "https://drive.google.com/file/d/1DyxBp7u7TJkvNKkPWA3iUU4Pdkp4-8Nx/view?usp=share_link";
    return new Promise((resolve, reject) => {
      const startTime = new Date().getTime(); // Starts the time when file starts downloading
      RNFetchBlob.config({
        fileCache: false,
      })
        .fetch("GET", imageURI, {}) // 'Fetches' file from the google drive URL
        .then((res) => {
          const endTime = new Date().getTime();
          const duration = (endTime - startTime) / 1000;
          const speed = downloadSizeInBits / (1024 * 1024 * duration);

          resolve({ metric, speed });
          setTest(speed); // Sets speed data into a object
        })
        .catch(reject);
    });
  };


  const uploadSpeedTest = async () => {
    setIsLoading(true);

    const fileUri = "/Downloads/SolsticeClient"; // Path to the file being uploaded

    const storage = getStorage();
    const fileRef = ref(storage, `TestData/${fileUri}`);

    // Upload speed test
    const uploadStartTime = new Date();
    try {
      uploadBytes(fileRef,fileUri).then(() => {
        //Alert.alert("File uploaded successfully");
      })
      const uploadEndTime = new Date();
      const uploadDuration = (uploadEndTime - uploadStartTime) / 1000;

      const uploadFileSize = 70; // In MB (according to the size of the uploaded file)
      const uploadSpeedValue = (uploadFileSize / uploadDuration).toFixed(2); // Upload speed in Mbps

      setUploadTest(uploadSpeedValue);
    } catch (error) {
      console.error('Upload failed:', error);
    }
    getNetworkBandwidth();

  };
  



  function DataView() {
    return (
      <TouchableOpacity style={styles.Hbtn} onPress={() => setShowModal(true)}>
        <View>
          <Text style={styles.buttonText}>History</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function ModalData() {
    // Data view of speedtest object
    return (
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
          }}
          onPress={() => setShowModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            pointerEvents="none"
            style={{
              flex: 0.5,
              backgroundColor: "#007AFF",
              margin: "5%",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flex: 0.15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.dataViewText}>
                <Text style={styles.header}>Previous Speed Tests</Text>
              </Text>
            </View>
            <View
              style={{
                flex: 0.85,
                backgroundColor: "transparent",
                alignItems: "center",
              }}
            >
              <FlatList
                data={speedData}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flex: 0.1,
                      borderWidth: 1,
                      borderColor: "#eee",
                      margin: 10,
                      borderRadius: 10,
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {item?.downloadSpeed} MB/s
                    </Text>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {item?.uploadSpeed} MB/s
                    </Text>
                  </View>
                )}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }

  function getWifiName() {
    WifiManager.getCurrentWifiSSID().then(
      (ssid) => {
        //console.log("Your current connected wifi SSID is " + ssid);
        SetWifiName2(ssid);
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );
  }

  const getNetworkBandwidth = async (): Promise<void> => {

    try {
      ///*global NetworkBandwidthTestResults*/
      await measureConnectionSpeed(); // Waits for speed test to finish
      if (sTest !== 0) {
        try {
          addDoc(collection(db, "speedTestData"), {
            // Adds data to firebase, creating a new collection
            downloadSpeed: Number(sTest.toFixed(2)),
            uploadSpeed: Number(UploadTest),
            createdAt: Timestamp.fromDate(new Date()),
            userUID: userUID, // User ID is set to each test
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      const q = query(
        collection(db, "speedTestData"), // Query for collecting test data and ordered from earliest to latest data
        where("userUID", "==", userUID),
        orderBy("createdAt", "desc")
      );

      // get collection data

      getDocs(q) // Data is collected from firebase and stored in ojbect.
        .then((snapshot) => {
          speedDataObject = snapshot.docs.map((document) => ({
            ...document.data(),
          }));
          setSpeedData(speedDataObject);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);


    getWifiName();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FocusedStatusBar backgroundColor={COLORS.secondary} />

        <View style={{ zIndex: 0 }}>
        <View style={{ zIndex: 0 }}>
          <Text style={styles.headerText}>
            {" "}
            
            {wifiName2 ? `Wi-Fi Network : ${wifiName2} ` : " "} 
          </Text>

        </View>
        </View>
        <View style={styles.content}>
        <Ping/>


          <TouchableOpacity
            style={styles.button}
            onPress={() =>  uploadSpeedTest()}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <View style={styles.box}>

          
          {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000000" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <>
  
              <Text style={styles.outputText}>
                {sTest
                  ? `Download speed: ${Math.round(sTest * 100) / 100}`
                  : " "}
                MB/s
              </Text>
              <Text style={styles.outputText}>
                {sTest
                  ? `Upload speed: ${Math.round(UploadTest * 100) / 100}`
                  : " "}
                MB/s
              </Text>
            </>
            )}

            </View>

          <DataView />
          {showModal && <ModalData />}
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 200, backgroundColor: COLORS.primary }} />
          {/* <View style={{ flex: 1, backgroundColor: COLORS.white }} /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
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
    color: "#fff",
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 150,
    padding: 5,
    margin: 10,
    borderRadius: 160,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  Hbtn: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    Text: "black",
  },
  output: {
    marginTop: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  outputText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  modalStyle: {
    width: "90%",
    flex: 0.7,
    backgroundColor: "grey",
    margin: 20,
    marginTop: 150,
    borderRadius: 20,
    justifyContent: "center",
  },
  dataViewText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default SpeedTest;
