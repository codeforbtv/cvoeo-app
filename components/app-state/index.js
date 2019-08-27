// @flow

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Splash from '../../components/splash';
import configureStore from '../../store/configure-store';

const {persistor, store} = configureStore(); // Using a persisted store

type Props = { children: any };

export default class AppState extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<Splash message={'Loading your data ...'}/>} persistor={persistor}>
                    {this.props.children}
                </PersistGate>
            </Provider>
        );
    }
}


