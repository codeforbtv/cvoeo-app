// @flow;

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import * as actions from './actions';
import {connect} from 'react-redux';
import Login from '../../screens/login/index';
import type {Node} from 'react';

type Props = {
    children: ?Node,
    initialized: boolean,
    actions: Object,
    user: Object,
    userIsLoggedIn: boolean
};

class Session extends Component<Props> {


    constructor(props) {
        super(props);
        this._handleFinishLoading = this._handleFinishLoading.bind(this);
        this._handleLoadingError = this._handleLoadingError.bind(this);
    }

    _loadResourcesAsync = async () => Promise.all([
        Asset.loadAsync([
            require('../../assets/images/cvoeo-logo.png')
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free
            // to remove this if you are not using it in your app
            'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf')
        }),
        this.props.actions.initialize()
    ]);

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        // console.warn(error);
        // this.props.actions.loadingCompleted(false, error);
    };

    _handleFinishLoading = () => {
        // this.props.actions.loadingCompleted();
    };

    render() {
        const {initialized, userIsLoggedIn, children} = this.props;
        switch (true) {
            case (!initialized || (typeof userIsLoggedIn !== 'boolean')):
                return (
                    <AppLoading
                        startAsync={this._loadResourcesAsync}
                        onError={this._handleLoadingError}
                        onFinish={this._handleFinishLoading}
                    />
                );
            case (userIsLoggedIn === false) :
                return (
                    <Login/>
                );
            default :
                return children;
        }
    }

}

function mapStateToProps(state) {
    return {
        initialized: state.loading.initialized,
        userIsLoggedIn: state.login.userIsLoggedIn,
        user: state.login.user || {}
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Session);
