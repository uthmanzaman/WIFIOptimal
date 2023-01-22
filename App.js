import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { navigationRef, isReadyRef } from './Navigation/RootNavigation';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import acessPoint from "./screens/AcessPoint";
import SpeedTest from "./screens/SpeedTest";




export const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
       <Tab.Navigator>
        <Tab.Screen name ="AcessPoints" Component={acessPoint}/>
      </Tab.Navigator>
      {/* <Tab.Navigator>
        <Tab.Screen name ="SpeedTest" Component={SpeedTest}/>
      </Tab.Navigator> */}
    </NavigationContainer>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



