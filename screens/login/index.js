// @flow

import Login from './login-screen';
import ForgotPassword from './forgot-password';
import Register from './register';

import { createStackNavigator } from 'react-navigation';

export default createStackNavigator({
    Login: {
        screen: Login
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
    Register: {
        screen: Register
    }
});
