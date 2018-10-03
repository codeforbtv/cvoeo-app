// @flow

import Login from './login-screen';
import ForgotPassword from './forgot-password';

import {StackNavigator} from 'react-navigation';

export default StackNavigator({
    Login: {
        screen: Login
    },
    ForgotPassword: {
        screen: ForgotPassword
    }
});
