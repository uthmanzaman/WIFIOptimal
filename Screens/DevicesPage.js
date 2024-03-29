import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";

import { COLORS } from "../app/constants";
import { FocusedStatusBar } from "../app/Components";

import * as Device from "expo-device";
import WifiManager from "react-native-wifi-reborn";
import NetInfo from "@react-native-community/netinfo";
import wifi from "react-native-wifi-reborn";
import axios from "axios";

import { scanWifiNetworks } from "../app/Components/WIFIList";
import LocationStrength from "../app/Components/locationStrength";
import DistanceLocation from "../app/Components/distanceLocation";

const DevicesPage = () => {
  const [netInfoObject, setNetInfoObject] = useState({ deviceName: "" });
  const [showModal, setShowModal] = useState(false);
  const [deviceList, setDeviceList] = useState(null);

  const [devices, setDevices] = useState([]);

  const [ipA, setIp] = useState([]);
  const [wifiName, SetWifiName] = useState([]);

  const [ipAddresses, setIpAddresses] = useState([]);

  const [wifiListObject, setWifiListObject] = useState([{}]);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [scanResults, setScanResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScanComplete, setIsScanComplete] = useState(false);

  const getAllDevices = () => {
    requestLocationPersmission();

    var Client = require("react-native-ssdp").Client,
      client = new Client();

    client.search("ssdp:all");
    //client.search("urn:dial-multiscreen-org:device:dial:1");
    //client.search("urn:schemas-upnp-org:device:WANIPConnection:1");
    //client.search('urn:schemas-upnp-org:service:ContentDirectory:1');

    client.on("response", function (headers, code, rinfo) {
      console.log(
        "Got a response to an m-search:\n%d\n%s\n%s",
        code,
        JSON.stringify(headers, null, "  "),
        JSON.stringify(rinfo, null, "  ")
      );
      const UID = new URL(headers.USN);
      if (UID != null) {
        setDeviceList((currentDeviceList) => [
          [...currentDeviceList, UID],
          { text: deviceList, key: Math.round().toString() },
        ]);
        console.log(deviceList);
      }
    });
  };

  const renderScanResult = ({ item }) => {
    const signalStrengthCategory = getSignalStrengthCategory(item.level);
    const rssi = calculateRSSI(item.level);

    return (
      <View style={[styles.resultContainer, styles[signalStrengthCategory]]}>
        <Text style={styles.networkName}>
          {" "}
          {item.SSID ? `SSID : ${item.SSID}` : " "}
        </Text>
        <Text style={styles.signalStrength}>
          {" "}
          {item.BSSID ? `BSSID : ${item.BSSID}` : " "}
        </Text>
        <Text style={styles.signalStrength}>
          {" "}
          {item.level ? `Signal strength :  ${item.level} dBm` : " "}
        </Text>
        <Text style={{ color: "green", fontWeight: "bold" }}>
          {" "}
          {getSignalStrengthCategory(item.level)
            ? `Signal Strength Category: ${getSignalStrengthCategory(
                item.level
              )}`
            : " "}
        </Text>
        <Text>{item.SSID ? ` SSID : ${item.SSID}` : " "}</Text>
        <Text style={styles.rssi}>
          {" "}
          {item.frequency ? `Frequency : ${item.frequency} MHz` : " "}
        </Text>
        <View
          style={{
            backgroundColor: "yellow",
            borderColor: "black",
            borderWidth: 1,
          }}
        >
          <Text style={styles.header}>Location information:</Text>
          <Text>{deviceList.as ? `ISP : ${deviceList.as}` : " "} </Text>
          <Text>
            {deviceList.country ? `Country : ${deviceList.country}` : " "}
          </Text>
          <Text>City: {deviceList.city}</Text>
        </View>
      </View>
    );
  };

  const scanNetwork = async () => {
    try {
      const ipAddress = "10.0.2.16";
      const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      const deviceInfo = {
        ip: response.data.query,
        country: response.data.country,
        city: response.data.city,
        // Add any other relevant device information you want to extract
      };

      setDevices([deviceInfo]);
    } catch (error) {
      console.error("Error retrieving device information:", error);
    }
    console.log(devices);
  };

  /**
   * Retrieves a list of available wifi networks and sets the wifiListObject state with the first entry.
   *
   * @return {Promise<void>} A Promise that resolves with no value.
   */

  const list = async () => {
    let wifiList = await wifi.loadWifiList(); //wifiList will be Array<WifiEntry>
    //console.log('wifi-List',wifiList);
    setWifiListObject(wifiList[0]);
    console.log([wifiListObject]);
  };

  // const getIp = async () => {
  //   const ip = await Network.getIpAddressAsync();
  //   setIp(ip);
  //   //console.log(ipA);
  // };

  const requestLocationPersmission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location permission is required for WiFi connections",
        message:
          "This app needs location permission as this is required  " +
          "to scan for wifi networks.",
        buttonNegative: "DENY",
        buttonPositive: "ALLOW",
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getWifiName();
    } else {
      console.log("Location Permission Denied");
    }
  };

  function getWifiName() {
    WifiManager.getCurrentWifiSSID().then(
      (ssid) => {
        //console.log("Your current connected wifi SSID is " + ssid);
        SetWifiName(ssid);
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );
  }

  function DataView() {
    // Data view of netinforobject which goes into connected devices box

    //console.log(ipA)

    return (
            <TouchableOpacity style={styles.listItem}
               onPress={() => setShowModal(true)}>
              <View>
                <Text style={styles.dataViewText}>
                  {" "}
                  Device Name: {Device.deviceName}
                </Text>
                <Text style={styles.dataViewText}> OS: {Device.osName}</Text>
                <Text style={styles.dataViewText}> IP add: {ipA}</Text>
                
                  {/* Strength: {netInfoObject.strength}
                  {" dBm"} */}
                
              </View>
            </TouchableOpacity>
          );
        }
      
      
      
    

  function ModalDataView() {
    // Data view of netinforobject which goes into connected devices Modal
    return (
      <View style={COLORS.primary}>
        <Text style={styles.dataViewText}>
          <Text style={styles.header}> Device Name:</Text> {Device.deviceName}
        </Text>
        <Text style={styles.dataViewText}>
          <Text style={styles.header}> Model:</Text> {Device.modelName}
        </Text>
        <Text style={styles.dataViewText}>
          <Text style={styles.header}> Brand:</Text> {Device.brand}
        </Text>
        <Text style={styles.dataViewText}>
          <Text style={styles.header}> OS:</Text> {Device.osName}
        </Text>
        <Text style={styles.dataViewText}>
          <Text style={styles.header}>Wi-Fi Network:</Text> {wifiName}
        </Text>
        <Text style={styles.dataViewText}> IP add: {ipA}</Text>
        <Text style={styles.dataViewText}>
          {" "}
          MAC: {netInfoObject.macAddress}
        </Text>
        <Text style={styles.dataViewText}> Subnet: {netInfoObject.subnet}</Text>
        <Text style={styles.dataViewText}>
          <Text style={styles.header}>
            Link Speed: {netInfoObject.linkSpeed}
          </Text>
        </Text>
        <Text style={styles.dataViewText}>
          <Text style={styles.header}>
            RX Link Speed: {netInfoObject.rxLinkSpeed}
          </Text>
        </Text>
      </View>
    );
  }

  function getNetInfo() {
    //sets netinforobject to parameters
    const data = setNetInfoObject({
      deviceName: "",
      ssid: "",
      ipAddress: "",
      dType: "",
      modelName: "",
      macAddress: "",
      subnet: "",
      linkSpeed: "",
      rxLinkSpeed: "",
    }); //Keys for object (netinfo)

    const unsubscribe = NetInfo.addEventListener((res) => {
      //console.log("Type ", state);
      //console.log("Details", res.details);
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
      setNetInfoObject((prevState) => ({
        ...prevState,
        macAddress: res.details.bssid,
      }));
    });

    return () => {
      //list();
      data();
      unsubscribe();
    };
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://ip-api.com/json/${ipA}`);
      //console.log("Response:", response.data);
      setDeviceList(response.data);
      //console.log([deviceList]);
      // Process the response data as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleScanButtonPress = async () => {
    NetInfo.fetch().then((connectionInfo) => {
      if (connectionInfo.type === "wifi") {
        setIsLoading(true);
        setScanResults([]);
        setIsScanComplete(false);
        try {
          setTimeout(async () => {
            let results = await wifi.loadWifiList();
            setScanResults(results);
            setIsScanComplete(true);
            setIsLoading(false);
          }, 3000);
        } catch (error) {
          console.error("Error scanning Wi-Fi networks:", error);
          setScanResults([]);
          setIsScanComplete(true);
          setIsLoading(false);
        }
      } else {
        Alert.alert("Warning", "You are not connected to a Wi-Fi network");
        return;
      }
    });
  };

  //fetchData();

  const calculateRSSI = (level) => {
    const rssi = 100 + level;
    return rssi;
  };

  const getSignalStrengthCategory = (level) => {
    const rssi = calculateRSSI(level);
    //const category = getSignalStrengthCategory(level);

    if (rssi >= -50) {
      return "Excellent";
    } else if (rssi >= -60) {
      return "Good";
    } else if (rssi >= -70) {
      return "Fair";
    } else {
      return "Weak";
    }
  };

  // const getSignalStrengthStyle = (level) => {
  //   const category = getSignalStrengthCategory(level);

  //   switch (category) {
  //     case 'excellent':
  //       return styles.excellent;
  //     case 'good':
  //       return styles.good;
  //     case 'fair':
  //       return styles.fair;
  //     case 'weak':
  //       return styles.weak;
  //     default:
  //       return styles.default;
  //   }
  // };

  // const renderItem = ({ item }) => {
  //   const signalStrengthCategory = getSignalStrengthCategory(item.level);
  //   const rssi = calculateRSSI(item.level);

  //   return (
  //     <View style={[styles.resultContainer, styles[signalStrengthCategory]]}>
  //       <Text style={styles.networkName}>{item.BSSID}</Text>
  //       <Text style={styles.signalStrength}>Signal Strength : {item.level}</Text>
  //       <Text style={styles.rssi}>RSSI: {rssi}</Text>
  //       {/* Render other relevant scan result information */}
  //     </View>
  //   );
  // };

  useEffect(() => {
    // Displays netinfoobject information when devices page is loaded up
    getNetInfo();
    // getIp();
    //handleScanButtonPress();
    fetchData();
    // const fetchIpAddresses = async () => {
    //   const scanResults = await scanWifiNetworks();
    //   setIpAddresses(scanResults);
    // };
    // fetchIpAddresses();
    //handleScanButtonPress();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.secondary} />
      <View style={styles.container}>
        <View style={{ zIndex: 0 }}>
          <Text style={styles.headerText}>
            {" "}
            {wifiName ? `Wi-Fi Network : ${wifiName} ` : " "}
          </Text>
          <DataView/>

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

        <Modal visible={showModal} transparent={true}>
          <View style={styles.modalStyle}>
            <ModalDataView />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.buttonText} value={input}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      
      
      <View style={{ flex: 1, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
        {/* <View style={styles.buttonContainer}> */}
        <TouchableOpacity style={styles.button} onPress={handleScanButtonPress}>
          <Text style={styles.buttonText} value={input}>
            Scan Network
          </Text>
        </TouchableOpacity>
        <LocationStrength />
        <DistanceLocation />
      </View>
      

      <View>
        <Text style={styles.title}>Wi-Fi Scan Results</Text>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000000" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : scanResults.length > 0 ? (
          <FlatList
            data={scanResults}
            renderItem={renderScanResult}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>No scan results available</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

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
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  listItem: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    width: "90%",
    borderRadius: 15,
    justifyContent: "center",
  },
  dataViewText: {
    fontSize: 16,
    textAlign: "left",
    color: "#ffffff",
    fontWeight: "bold",
    margin: 5,
  },
  modalStyle: {
    width: "90%",
    flex: 0.7,
    backgroundColor: COLORS.secondary,
    margin: 20,
    marginTop: 150,
    borderRadius: 20,
    justifyContent: "center",
  },
  resultContainer: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  excellent: {
    backgroundColor: "green",
  },
  good: {
    backgroundColor: "yellow",
  },
  fair: {
    backgroundColor: "orange",
  },
  weak: {
    backgroundColor: "red",
  },
  default: {
    backgroundColor: "white",
  },
  networkName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2A2A2A",
  },
  signalStrength: {
    fontSize: 14,
  },
  rssi: {
    fontSize: 14,
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default DevicesPage;
