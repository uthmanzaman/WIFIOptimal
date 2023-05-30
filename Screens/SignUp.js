/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import FormInput from "../app/Components/FormInput";
import FormButton from "../app/Components/FormButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { COLORS } from "../app/constants";
import { FocusedStatusBar } from "../app/Components";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignUp() {
    if (!passwordValidation(password, confirmPassword)) {
      //errorFlag = true;
      alert("Password and confirm password should be same.");
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with", user.email);
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  }

  const passwordValidation = (password, confirmPassword) => {
    if (password && confirmPassword && password === confirmPassword)
      return true;
    return false;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.secondary} />

      <View style={styles.container}>
      <Image source={require("../app/Assets/logo.png")} style={styles.logo} />
        <Text style={styles.text}>Create an account</Text>

        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />
        <FormInput
          labelValue={confirmPassword}
          onChangeText={(userPassword) => setConfirmPassword(userPassword)}
          placeholderText="Confirm Password"
          iconType="lock"
          secureTextEntry={true}
        />
        <FormButton
          buttonTitle="Sign Up"
          onPress={() => handleSignUp(email, password)}
        />

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.navButtonText}>Have an acount? Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  text: {
    fontFamily: "GillSans-Bold",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.primary,
    fontFamily: "Futura",
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Futura",
    color: "grey",
  },
});
