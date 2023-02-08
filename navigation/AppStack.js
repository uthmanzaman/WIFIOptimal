import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';


import HomeScreen from '../Screens/HomePage';

const Stack = createStackNavigator(); 

const AppStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen}/>
        </Stack.Navigator>
    )
}

export default AppStack;