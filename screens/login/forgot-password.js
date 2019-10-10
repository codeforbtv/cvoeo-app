// @flow

import React, { Component } from 'react';
import { Alert, TouchableOpacity, TouchableHighlight, SafeAreaView, StyleSheet, Text, TextInput, View, Fragment} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isValidEmail } from '../../libs/validators';
import commonStyles from '../../styles/common';
import * as actions from './actions';

const styles = StyleSheet.create(commonStyles);

type Props = {
    actions: Object,
    navigation: Object
};


class ForgotPassword extends Component<Props> {


    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.state = { email: '', passwordResetSent: false };
    }

    onChangeState(stateKey) {
        return (value) => {
            this.setState({ [stateKey]: value });
        };
    }

    onButtonPress() {
        if (isValidEmail(this.state.email)) {
            this.props.actions.resetPassword(this.state.email);
            this.setState({ passwordResetSent: true });
        } else {
            Alert.alert('Please enter a valid email address');
        }
    }


    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#04a0c6' }}>
                <View style={styles.frame}>
                    <View style={[styles.container, {
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 20,
                        paddingTop: 20,
                        backgroundColor: '#00a1ca'
                    }]}>
                        <View style={styles.container}>

                            <TouchableHighlight
                                style={styles.link}
                                onPress={() => this.props.navigation.navigate('Login')}
                                underlayColor='transparent'>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: '38%'
                                }}>
                                    <Icon
                                        name='angle-left'
                                        style={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            fontSize: 48
                                        }}
                                    />
                                    <Text style={{
                                        color: '#fff',
                                        paddingTop: 16
                                    }}>{'  Log in'}</Text>
                                </View>
                            </TouchableHighlight>


                            <View style={{
                                alignSelf: 'center',
                                height: '35%',
                                width: '91%',
                                padding: 10,
                                backgroundColor: '#fff',
                                borderColor: '#020202',
                                borderWidth: 2,
                            }}>
                                {this.state.passwordResetSent
                                    ? (
                                        <React.Fragment>

                                                <Text style={{
                                                    color: '#020202',
                                                    fontSize: 15,
                                                    fontWeight: 'bold',
                                                    margin: 30,
                                                    textAlign: 'center',
                                                    paddingRight: 10
                                                }}>{'Please check your email for the password reset link. \n\n Once you\'ve set a new password, please return to the login screen.'}</Text>
                                            
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>

                                                <Text style={{
                                                    color: '#020202',
                                                    fontSize: 15,
                                                    fontWeight: 'bold',
                                                    marginBottom: 36,
                                                    textAlign: 'right',
                                                    paddingRight: 10
                                                }}>{'Forgot Password?'}</Text>
                                                <Text style={{ color: '#979797', fontWeight: 'bold' }}>{'  Email Address'}</Text>
                                                <TextInput
                                                    autoCorrect={false}
                                                    value={this.state.email}
                                                    keyBoardType='email-address'
                                                    placeholder=''
                                                    onChangeText={this.onChangeState('email')}
                                                    style={[styles.textInput, { color: '#979797', borderColor: '#979797', borderWidth: 1 }]}
                                                    underlineColorAndroid={'transparent'}
                                                />
                                                <TouchableOpacity style={styles.button}
                                                    onPress={this.onButtonPress}>
                                                    <Text style={styles.buttonText}>{'Reset Password'}</Text>
                                                </TouchableOpacity>
                                        </React.Fragment>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => ({ session: state.login.session });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
