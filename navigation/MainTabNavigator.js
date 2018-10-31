import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProgressScreen from '../screens/ProgressScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const MessagesStack = createStackNavigator({
  Messages: MessagesScreen,
});

MessagesStack.navigationOptions = {
  tabBarLabel: 'Messages',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-notifications${focused ? '' : '-outline'}` : 'md-notifications'}
    />
  ),
};

const ProgressStack = createStackNavigator({
  Progress: ProgressScreen,
});

ProgressStack.navigationOptions = {
  tabBarLabel: 'Progress',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-flag${focused ? '' : '-outline'}` : 'md-flag'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  MessagesStack,
  ProgressStack,
});
