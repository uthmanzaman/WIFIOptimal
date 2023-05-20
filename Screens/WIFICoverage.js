import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
//import getWifiList from '../app/Components/WIFIList';

import wifi from "react-native-wifi-reborn";

import { FAQCard, HomeHeader, FocusedStatusBar } from "../app/Components";
import { faqData } from "../app/constants";
import { COLORS, SIZES, FONTS } from "../app/constants";

export const WIFICoverage = () => {
  const [wifiListObject, setWifiListObject] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const [faqDataObject, setFaqDataObject] = useState(faqData);
  const [test, setTest] = useState("");

  const handleSearch = (value) => {
    if (value.length === 0) {
      setFaqDataObject(faqData);
    }

    const filteredData = faqData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setFaqDataObject(faqData);
    } else {
      setFaqDataObject(filteredData);
    }
  };

  const list = async () => {
    let wifiList = await wifi.loadWifiList(); //wifiList will be Array<WifiEntry>
    //console.log('wifi-List',wifiList);
    setWifiListObject(wifiList[0]);
    //console.log([wifiListObject])
  };

  useEffect(() => {
    list();
  }, []);

  const FAQModal = () => {
    return (
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setShowModal(false)}
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
            <View style={{ flex: 1, margin: SIZES.extraLarge * 1.5 }}>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  color: "white",
                }}
              >
                Description
              </Text>
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: SIZES.small,
                    fontFamily: FONTS.regular,
                    lineHeight: SIZES.large,
                  }}
                >
                  {test.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.secondary} />
      <View style={styles.container}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={faqData}
            renderItem={({ item }) => (
              <FAQCard
                onPress={() => {
                  setShowModal(true);
                  setTest(item);
                }}
                data={item}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader />}
          />
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
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
      {showModal && <FAQModal />}
    </SafeAreaView>
  );
};

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
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  networkName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  signalStrength: {
    fontSize: 14,
  },
});

export default WIFICoverage;
