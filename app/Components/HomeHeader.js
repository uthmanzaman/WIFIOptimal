import React from "react";
import { View, Text, Image, TextInput } from "react-native";

import { COLORS, FONTS, SIZES, assets } from "../constants";

const HomeHeader = ({ onSearch }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        padding: SIZES.font,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ marginVertical: SIZES.font }}>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZES.small,
              color: COLORS.white,
            }}
          >
            Hello 👋
          </Text>

          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.large,
              color: COLORS.white,
              marginTop: SIZES.base / 2,
            }}
          >
            Read these too improve your network
          </Text>
        </View>

        <View style={{ width: 45, height: 45 }}></View>
      </View>

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <TextInput
            placeholder="Search Suggestions"
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
