// @flow;

import React, {Component} from 'react';
import Session from './components/session';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import AppState from './components/app-state';
import type {Node} from 'react';
import Login from './screens/login';
import ModalNavigator from './navigation';
type Props = {
    children: ?Node,
    initialized: boolean,
    actions: Object,
    user: Object,
    userIsLoggedIn: boolean
};


// Bootstrapping the app
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this._handleFinishLoading = this._handleFinishLoading.bind(this);
        this._handleLoadingError = this._handleLoadingError.bind(this);
    }

    state = {
        isLoadingComplete: false
    };

    _loadResourcesAsync = async () => Promise.all([
        Asset.loadAsync([
            require('./assets/images/cvoeo-logo.png')
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free
            // to remove this if you are not using it in your app
            'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
        })
    ]);

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error); // eslint-disable-line no-console
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };

    render() {
        const {isLoadingComplete} = this.state;
        return !isLoadingComplete
            ? (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            )
            : (
                <AppState>
                    <Session loginScreen={(<Login/>)}>
                        <ModalNavigator/>
                    </Session>
                </AppState>
            );

    }
}