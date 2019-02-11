// @flow

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableHighlight, View, Alert,
    Platform
} from 'react-native';
// import * as constants from '../../styles/constants';
import * as actions from './actions';
import logo from '../../assets/images/splash.png';
import LoginForm from '../../components/login-form';
import commonStyles from '../../styles/common';

const myStyles = {
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
    },
    logoText: {
        fontSize: 24,
        color: '#999',
        shadowColor: '#666',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity: 1,
        shadowRadius: 0
    }
};
const combinedStyles = Object.assign({}, commonStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type Props = {
    actions: Object,
    loginError: any,
    navigation: Object
};

class LoginScreen extends Component<Props> {

    static navigationOptions = {
        title: 'Log In'
    };

    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(nextProps) { // This method is deprecated!! switch to getDerivedStateFromProps
        if (!!nextProps.loginError) {
            Alert.alert(
                '',
                (nextProps.loginError.message || 'Login Failed'),
                [
                    {
                        text: 'OK', onPress: () => {
                        }
                    }
                ],
                {cancelable: false}
            );

        }
    }


    render() {
        return (
            <KeyboardAvoidingView
                style={styles.frame}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <View style={styles.container}>
                    <ScrollView style={styles.scroll}>
                        <View style={{paddingLeft: 20, paddingRight: 20}}>
                            <View style={styles.logo}>
                                <Image source={logo} style={{height: '90%', width: '100%'}}/>
                            </View>
                            <View style={{width: '100%'}}>
                                <LoginForm onButtonPress={this.props.actions.loginWithEmailPassword}/>
                                <TouchableHighlight
                                    style={styles.link}
                                    onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                                    <Text style={[styles.linkText, {fontSize: 16}]}>I forgot my password</Text>
                                </TouchableHighlight>

                            </View>
                        </View>
                        <View style={styles.padForIOSKeyboard}/>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.login.user,
    initialAuthChecked: state.login.initialAuthChecked,
    loginError: state.login.loginError
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
