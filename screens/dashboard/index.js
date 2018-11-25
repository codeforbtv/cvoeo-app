// @flow

import React, {Component} from 'react';
import {Alert, TouchableOpacity, StyleSheet, Text, TextInput, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import commonStyles from '../../styles/common';
import * as actions from './actions';

const styles = StyleSheet.create(commonStyles);

type Props = {
    actions: Object,
    navigation: Object
};


class Dashboard extends Component<Props> {

    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.state = {text: '', buttonClicked: false};
    }

    onChangeState(stateKey) {
        return (value) => {
            this.setState({[stateKey]: value});
        };
    }

    onButtonPress() {
        Alert.alert('I\'ve been clicked');
        this.setState({buttonClicked : true});
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

                    <View style={styles.container}>
                        <Text style={styles.label}>Example Text Box</Text>
                        <TextInput
                            autoCorrect={false}
                            value={this.state.email}
                            keyBoardType='text'
                            placeholder='text here'
                            onChangeText={this.onChangeState('example')}
                            style={styles.textInput}
                            underlineColorAndroid={'transparent'}
                        />
                        <TouchableOpacity onPress={this.onButtonPress} style={styles.button}>
                            <Text style={styles.buttonText}>{'Click Me'}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({session: state.login.session});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
