/* eslint-disable no-undef */
import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../Screens/LogIn";
import SignUp from '../Screens/SignUp';
import SettingsPage from "../Screens/SettingsPage";
import SpeedTest from "../Screens/SpeedTest";
import WIFICoverage from "../Screens/WIFICoverage";
import SignalAnalysis from "../Screens/SignalAnalysis";
import DevicesPage from "../Screens/DevicesPage";
import Details from "../Screens/Details";

import { UserContext } from "./Context.js";
import { useFonts } from "expo-font";
import SplashScreen from 'react-native-splash-screen';


const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [userUID, setUserUID] = useState(null);

  const [loaded] = useFonts({
    InterBold: require("./Assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./Assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./Assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./Assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./Assets/fonts/Inter-Light.ttf"),
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 2000);
  // }, []);


 
  const TabsNav = () => {
    
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === "Settings Page") {
              iconName = focused ? "settings" : "settings-outline";
              size = focused ? size + 8 : size + 5;
              return <Ionic name={iconName} size={size} color={color} />;
            } else if (route.name === "Devices Page") {
              iconName = focused ? "devices" : "devices";
              size = focused ? size + 8 : size + 5;
              return <MCIcons name={iconName} size={size} color={color} />;
            } else if (route.name === "Speed Test") {
              iconName = focused ? "speedometer" : "speedometer-outline";
              size = focused ? size + 8 : size + 5;
            } else if (route.name === "WIFI Coverage") {
              iconName = focused ? "wifi" : "wifi-outline";
              size = focused ? size + 8 : size + 5;
            } else if (route.name === "Signal Analysis") {
              iconName = focused ? "signal-cellular-3" : "signal-cellular-outline";
              size = focused ? size + 8 : size + 5;
              return <MCIcons name={iconName} size={size} color={color} />;

            }
            return <Ionic name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Devices Page" component={DevicesPage} />
        <Tab.Screen name="Speed Test" component={SpeedTest} />
        <Tab.Screen name="WIFI Coverage" component={WIFICoverage} />
        <Tab.Screen name="Signal Analysis" component={SignalAnalysis} />
        <Tab.Screen name="Settings Page" component={SettingsPage} />
      </Tab.Navigator>
    );
  };
  return (
    <UserContext.Provider value={{ userUID, setUserUID }}>
      <NavigationContainer>
        <AppStack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <AppStack.Screen name="TabsNav" component={TabsNav} />
          <AppStack.Screen name="Login" component={LoginScreen} />
          <AppStack.Screen name="SignUp" component={SignUp} />
          <AppStack.Screen name="Details" component={Details} />
        </AppStack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};
export default App;
