import React from "react";
import { View, Image, Text } from "react-native";

import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";

export const FAQTitle = ({ title, titleSize,  }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.bold,
          fontSize: titleSize,
          color: COLORS.white,
        }}
      >
        {title}
      </Text>
    </View>
  );
};



export const SubInfo = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    > 
     
    </View>
  );
};