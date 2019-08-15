// @flow

import LoginScreen from './login-screen';
import ForgotPassword from './forgot-password';
import Register from './register';

import {createStackNavigator, createAppContainer} from 'react-navigation';

const RootStack = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
    Register: {
        screen: Register
    }
});

const Login = createAppContainer(RootStack);

export default Login;
