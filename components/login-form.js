// @flow
import React, {Component} from 'react';

import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {isValidEmail} from '../libs/validators';
import commonStyles from '../styles/common'

const styles = StyleSheet.create(commonStyles);


type Props = {
    buttonText: string,
    onButtonPress: any => any
};

export default class LoginForm extends Component<Props> {
    static navigationOptions = {
        title: 'Money on My Mind'
    };


    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.state = {email: '', password: '', displayName: ''};
    }

    onChangeEmail(value) {
        this.setState({email: (value || '').trim()});
    }

    onChangeState(stateKey) {
        return (value) => {
            this.setState({[stateKey]: value});
        };
    }

    onButtonPress() {
        if (isValidEmail(this.state.email)) {
            this.props.onButtonPress(this.state.email, this.state.password, this.state.displayName);
        } else {
            Alert.alert('Please enter a valid email address');
        }
    }

    render() {
        return (
            <View style={{marginBottom: 10}}>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        autoCapitalize='none'
                        keyBoardType='email-address'
                        autoCorrect={false}
                        placeholder='you@domain.com'
                        value={this.state.email}
                        onChangeText={this.onChangeEmail}
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        autoCapitalize='none'
                        keyBoardType={'default'}
                        autoCorrect={false}
                        placeholder={'*****'}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={this.onChangeState('password')}
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.onButtonPress}>
                    <Text style={styles.buttonText}>{this.props.buttonText || 'Login'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
