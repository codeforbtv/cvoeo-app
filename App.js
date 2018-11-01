// @flow
/**
 * CVOEO React Native App
 * https://github.com/codeforbtv/cvoeo-app
 */

import React from 'react';
// import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { AppLoading, Asset, Font, Icon } from 'expo';
// import AppNavigator from './navigation/AppNavigator';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/';
import thunk from 'redux-thunk';
import Session from './components/session';
import {View} from "react-native";
import MainTabNavigator from "./navigation/MainTabNavigator";

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Session>
                    <View style={{
                        padding: 0, margin: 0, flex: 1,
                        justifyContent: 'flex-start'
                    }}>
                        <MainTabNavigator/>
                    </View>
                </Session>
            </Provider>
        );
    }
}
