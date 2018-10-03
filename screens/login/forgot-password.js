// @flow

import React, {Component} from 'react';
import {Alert, TouchableOpacity, TouchableHighlight, StyleSheet, Text, TextInput, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isValidEmail} from '../../libs/validators';
import commonStyles from '../../styles/common';
import * as actions from './actions';

const styles = StyleSheet.create(commonStyles);

type Props = {
    actions: Object,
    navigation: Object
};


class ForgotPassword extends Component<Props> {


    static navigationOptions = {
        title: 'Forgot Password'
    };

    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.state = {email: '', passwordResetSent: false};
    }

    onChangeState(stateKey) {
        return (value) => {
            this.setState({[stateKey]: value});
        };
    }

    onButtonPress() {
        if (isValidEmail(this.state.email)) {
            this.props.actions.resetPassword(this.state.email);
            this.setState({passwordResetSent: true});
        } else {
            Alert.alert('Please enter a valid email address');
        }
    }

    render() {
        return (
            <View style={styles.frame}>
                <View style={[styles.container, {
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 20,
                    paddingTop: '20%'
                }]}>
                    {this.state.passwordResetSent
                        ? (
                            <View style={[styles.container, {paddingTop: '30%'}]}>
                                <Text style={[styles.text, {textAlign: 'center'}]}>Check your email</Text>
                                <TouchableHighlight style={styles.link} onPress={() => this.props.navigation.goBack()}>
                                    <Text style={styles.linkText}>{'< Back to Login'}</Text>
                                </TouchableHighlight>
                            </View>
                        )
                        : (
                            <View style={styles.container}>
                                <Text style={styles.label}>Email Address</Text>
                                <TextInput
                                    autoCorrect={false}
                                    value={this.state.email}
                                    keyBoardType='email-address'
                                    placeholder='you@domain.com'
                                    onChangeText={this.onChangeState('email')}
                                    style={styles.textInput}
                                    underlineColorAndroid={'transparent'}
                                />
                                <TouchableOpacity style={styles.button}
                                                  onPress={this.onButtonPress}>
                                    <Text style={styles.buttonText}>{'Reset Password'}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({session: state.login.session});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
