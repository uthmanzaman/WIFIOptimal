import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FAQCard, HomeHeader, FocusedStatusBar } from "../app/Components";
import { faqData } from "../app/constants";
import { COLORS, SIZES, FONTS } from "../app/constants";

import { AntDesign } from "@expo/vector-icons";

export const WIFICoverage = () => {
  const [showModal, setShowModal] = useState(false);
  const [test, setTest] = useState("");
  const [helpful, setHelpful] = useState(null);

  const handleVote = (isHelpful) => {
    setHelpful(isHelpful === helpful ? null : isHelpful);
  };

  const showFeedbackAlert = (isHelpful) => {
    const message = isHelpful
      ? "Thank you for your feedback! It was helpful"
      : "Thank you for your feedback! It was helpful";
    Alert.alert("Feedback", message, [{ text: "OK", onPress: () => {} }], {
      cancelable: false,
    });
  };

  const FAQModal = () => {
    const lines = test.description.split(". ");

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

              {lines.map((bullet, index) => (
                <View key={index} style={styles.bulletContainer}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.text}>{bullet}</Text>
                </View>
              ))}

              {helpful === null && (
                <View style={styles.feedbackContainer}>
                  <TouchableOpacity
                    style={[styles.voteButton, styles.thumbsUpButton]}
                    onPress={() => {
                      handleVote(true);
                      showFeedbackAlert();
                    }}
                  >
                    <AntDesign name="like1" size={20} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.voteButton, styles.thumbsDownButton]}
                    onPress={() => {
                      handleVote(false);
                      showFeedbackAlert();
                    }}
                  >
                    <AntDesign name="dislike1" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              )}
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
  bulletContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bullet: {
    marginRight: 5,
    fontSize: 32,
    color: "white",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    textAlign: "justify",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    textAlign: "justify",
  },
  feedbackContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    // backgroundColor: COLORS.secondary,
  },
  voteButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  thumbsUpButton: {
    backgroundColor: "#e6ffe6",
  },
  thumbsDownButton: {
    backgroundColor: "#ffe6e6",
  },
  feedbackText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 16,
  },
});

export default WIFICoverage;
