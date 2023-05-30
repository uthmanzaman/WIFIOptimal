/* eslint-disable react/prop-types */
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity } from "react-native";

import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { SubInfo, FAQTitle } from "./subInfo";


export const FAQCard = ({ data, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 100,
        }}
      >
        <Image
          source={data.image}
          resizeMode="center"
          style={{
            width: "100%",
            height: "150%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
            borderBottomLeftRadius: SIZES.font,
            borderBottomRightRadius: SIZES.font,
          }}
        />
      </View>
      <SubInfo />
      <View style={{ width: "100%", padding: SIZES.font }}>
        <FAQTitle
          title={data.name}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />
        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            textAlignVertical: "top",
          }}
        >
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default FAQCard;
