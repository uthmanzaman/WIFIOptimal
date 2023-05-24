import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// import Animated, {
//   useSharedValue,
//   withSpring,
//   useAnimatedStyle,
//   Extrapolate,
//   interpolate,
// } from "react-native-reanimated";

import { COLORS, SIZES, SHADOWS, assets } from "../constants";

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export const CircleButton = ({ imgUrl, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        position: "absolute",
        borderRadius: SIZES.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        ...SHADOWS.light,
        ...props,
      }}
      onPress={handlePress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
};

// export const LikeButton = () => {
//   const liked = useSharedValue(0);

//   const outlineStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
//         },
//       ],
//     };
//   });

//   const fillStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: liked.value }],
//       opacity: liked.value,
//     };
//   });

//   return (
//     <Pressable onPress={() => (liked.value = withSpring(liked.value ? 0 : 1))}>
//       <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
//         <MaterialCommunityIcons
//           name={"heart-outline"}
//           size={32}
//           color={"black"}
//         />
//       </Animated.View>

//       <Animated.View style={fillStyle}>
//         <MaterialCommunityIcons name={"heart"} size={32} color={"red"} />
//       </Animated.View>
//     </Pressable>
//   );
// };

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: COLORS.primary,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Lato-Regular",
  },
});
