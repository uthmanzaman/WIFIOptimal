import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native';
import FormInput from '../app/Components/FormInput';
import FormButton from '../app/Components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

//import auth from '@react-native-firebase/auth';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const SignUp = ({ navigation }) => {

  const register = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  function handleSignUp(){
  const auth = getAuth(); 
    createUserWithEmailAndPassword(auth,email, password)
    .then (userCredentials => {
      const user = userCredentials.user;
      console.log ('Registered with',user.email);
      navigation.navigate('TabsNav')
    })
    .catch(error => alert(error.message))
  }
  
  




  return (
    <View style={styles.container}>
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
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <FormButton
        buttonTitle="Sign Up"
        //onPress={() => auth().createUserWithEmailAndPassword(email, password)}
        onPress={() => handleSignUp(email,password)}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>By registering, you confirm that you accept our</Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked')}>
          <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>Terms of service</Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and</Text>
        <Text style={[styles.color_textPrivate, { color: '#e88832' }]}> Privacy Policy</Text>
      </View>
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
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>
          Have an acount? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
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
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Futura',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Futura',
    color: 'grey',
  },
});