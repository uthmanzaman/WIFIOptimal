/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import FormInput from '../app/Components/FormInput';
import FormButton from '../app/Components/FormButton';

import { getAuth ,signInWithEmailAndPassword } from "firebase/auth";

import {auth, app} from '../firebase';

import { COLORS } from "../app/constants";


import {UserContext} from '../app/Context.js'


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {userUID, setUserUID} = useContext(UserContext)
  

  useEffect(() =>{
   const auth = getAuth(app);
   const unsubscribe = auth.onAuthStateChanged(user =>{
      if (user){
        navigation.navigate('TabsNav')
      }
    })
    return unsubscribe
  },[])

  function handleLogIn(){
    auth   
      signInWithEmailAndPassword(auth, email, password)
      .then (userCredentials => {
        const user = userCredentials.user;
        console.log(user.uid);
        console.log (user.email);
        setUserUID(user.uid);
        navigation.navigate('TabsNav')
      })
      .catch(error => alert(error.message))
    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Image
        source={require('../app/Assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>WIFI Optimal</Text>

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

      <FormButton
      
        buttonTitle="Sign In"
        onPress={() => handleLogIn()}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() =>{}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null} */}

      <TouchableOpacity 
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'GillSans-Bold',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.primary,
    fontFamily: 'Futura',
  },
});