import 'react-native-gesture-handler';
import React from 'react';
import Ionic from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../Screens/LogIn';
import SignupScreen from '../Screens/SignUp';
import SettingsPage from '../Screens/SettingsPage';
import SpeedTest from '../Screens/SpeedTest';
import WIFICoverage from '../Screens/WIFICoverage';
import DevicesPage from '../Screens/DevicesPage';





const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();



export const requestWifiPermission = async () => {
  try {
    await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    );
  } catch (err) {
    console.warn(err);
  }
};

const App = () => {




    getSsid = async () => {
      if (this.state.requestPermission) {
        await requestWifiPermission();
        this.setState({ ...this.state, requestPermission: false });
      }
      try {
        let state = await NetInfo.fetch();
        let ssid = state.details.ssid ? state.details.ssid : 'error';
        console.warn("Gateway SSID", state);
        this.setState({ gateway: { ...this.state.gateway, wirelessSSID: ssid } });
      } catch (e) {
        console.log(e);
      }
    };



  
  const TabsNav = () => {
    return (

      <Tab.Navigator
        screenOptions={({ route, }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Settings Page') {
              iconName = focused ? "settings" : "settings-outline"
              size = focused ? size + 8 : size + 5;
              return <Ionic name={iconName} size={size} color={color} />;
            } else if (route.name === 'Devices Page') {
              iconName = focused ? "devices" : "devices"
              size = focused ? size + 8 : size + 5;
              return <MCIcons name={iconName} size={size} color={color} />;

            }
            else if (route.name === 'Speed Test') {
              iconName = focused ? "speedometer" : "speedometer-outline"
              size = focused ? size + 8 : size + 5;
            } else if (route.name === 'WIFI Coverage') {
              iconName = focused ? "wifi" : "wifi-outline"
              size = focused ? size + 8 : size + 5;
            }
            return <Ionic name={iconName} size={size} color={color} />;
          },
          headerShown:false
        })}>
        <Tab.Screen name='Devices Page' component={DevicesPage} />
        <Tab.Screen name='Speed Test' component={SpeedTest} />
        <Tab.Screen name='WIFI Coverage' component={WIFICoverage} />
        <Tab.Screen name='Settings Page' component={SettingsPage} />
      </Tab.Navigator>


    );
  }

  return (
    
    <NavigationContainer>
      <AppStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <AppStack.Screen name='TabsNav' component={TabsNav} />
        <AppStack.Screen name='Login' component={LoginScreen} />
        <AppStack.Screen name='SignUp' component={SignupScreen} />
      </AppStack.Navigator>
    </NavigationContainer>

  );

};


export default App;