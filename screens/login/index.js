// @flow

import Login from './login-screen';
import ForgotPassword from './forgot-password';
import { createStackNavigator } from 'react-navigation';

export default createStackNavigator({
    Login: {
        screen: Login
    },
    ForgotPassword: {
        screen: ForgotPassword
    }
});
