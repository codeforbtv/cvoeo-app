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
import logo from '../../assets/images/cvoeo-logo.jpg';
import LoginForm from '../../components/login-form';
import commonStyles from '../../styles/common';

const myStyles = {
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },
    logoText: {
        fontSize: 24,
        color: 'white',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        shadowRadius: 1
    },
    socialLoginButton: {
        width: '100%',
        height: 44,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        shadowRadius: 2, flex: 1, flexDirection: 'row'
    },
    socialLoginLogo: {
        padding: 12,
        width: 44,
        alignSelf: 'flex-start'
    },
    socialLogin: {flex: 1},

    socialLoginText: {
        fontSize: 16,
        fontWeight: '700',
        height: 40,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 12,
        color: 'white'
    },

    logos: {
        width: 20,
        height: 20
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
                                <Image source={logo} style={{height: 120, width: 120}}/>
                                <Text style={styles.logoText}>Money on My Mind</Text>
                            </View>

                            <Text style={[styles.text, {textAlign: 'center', marginTop: 20}]}> - OR - </Text>
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
