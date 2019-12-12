// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Alert,
    Platform
} from 'react-native';
// import * as constants from '../../styles/constants';
import * as actions from './actions';
import logo from '../../assets/images/login.png';
import LoginForm from '../../components/login-form';
import commonStyles from '../../styles/common';
import { Container } from "native-base";
import pkg from '../../package.json';

const myStyles = {
    logo: {
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'center'
    }
};
const combinedStyles = Object.assign({}, commonStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);
const window = Dimensions.get('window');
const logoScale = 0.89;
const logoHeight = 342 * (window.width / 287) * logoScale;
const logoWidth = window.width * logoScale;

type Props = {
    actions: Object,
    loginError: any,
    navigation: Object
};

class LoginScreen extends Component<Props> {

    static navigationOptions = {
        header: null
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
                { cancelable: false }
            );

        }
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Text style={{ transform: [{ rotate: '90deg' }], position: 'absolute', zIndex: 100, bottom: 0, top: 0 }}>Version {pkg.version}</Text>
                <KeyboardAvoidingView
                    style={[styles.frame, { backgroundColor: '#04a0c6' }]}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <View style={styles.container}>
                        <ScrollView style={[styles.scroll, { backgroundColor: '#04a0c6' }]}>

                            <View style={{ paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
                                <View style={styles.logo}>
                                    <Image source={logo} style={{ height: logoHeight, width: logoWidth }} />
                                </View>
                                <View style={{ width: '91%', alignSelf: 'center' }}>
                                    <LoginForm onButtonPress={this.props.actions.loginWithEmailPassword} />
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <TouchableHighlight
                                            onPress={() => this.props.navigation.navigate('Register')}
                                            underlayColor='transparent'>
                                            <Text style={styles.linkText}>{'Register'}</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            style={{
                                                width: '80%'
                                            }}
                                            onPress={() => this.props.navigation.navigate('ForgotPassword')}
                                            underlayColor='transparent'>
                                            <Text style={styles.linkText}>{'Forgot Password?'}</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.padForIOSKeyboard} />
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
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
