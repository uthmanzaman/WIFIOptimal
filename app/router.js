import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { StackNavigator, BottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import {acessPoint, speedTest} from '../screens';
/* import AddBook from './screens/AddBook';
import Lists from './screens/Lists';
import Profile from './screens/Profile'; */

let screen = Dimensions.get('window');

export const Tabs = StackNavigator({
  'acessPoint': {
    screen: acessPoint,
    navigationOptions: {
      tabBarLabel: 'Accesspoint Info',
      tabBarIcon: ({ tintColor }) => <Icon name="open-book" type="entypo" size={28} color={tintColor} />
    },
  },
  'speedTest': {
    screen: speedTest,
    navigationOptions: {
      tabBarLabel: 'Speedtest Page',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={28} color={tintColor} />
    },
  },
 /* 'Add Book': {
    screen: AddBook,
    navigationOptions: {
      tabBarLabel: 'Add Book',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-add-circle-outline" type="ionicon" size={28} color={tintColor} />
    },
  },
  'Lists': {
    screen: ReadingListStack,
    navigationOptions: {
      tabBarLabel: 'Lists',
      tabBarIcon: ({ tintColor }) => <Icon name="list" type="entypo" size={28} color={tintColor} />
    },
  },
  'My Profile': {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-person-outline" type="ionicon" size={28} color={tintColor} />
    },
  }, */
});

export const createRootNavigator = () => {
  return StackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
  );
};