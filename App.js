// @flow
/**
 * CVOEO React Native App
 * https://github.com/codeforbtv/cvoeo-app
 */

import React from 'react';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/';
import thunk from 'redux-thunk';
import Session from './components/session';
import {View} from 'react-native';
import Dashboard from './screens/dashboard';

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Session>
                    <View style={{
                        padding: 0, marginTop: 40, flex: 1,
                        justifyContent: 'flex-start'
                    }}>
                        <Dashboard/>
                    </View>
                </Session>
            </Provider>
        );
    }
}
