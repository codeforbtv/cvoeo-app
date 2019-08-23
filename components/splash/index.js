// @flow
import React, {Component} from 'react';
import splash from '../../assets/images/splash.png';
import {ImageBackground, View, Text} from 'react-native';

type Props = { message: string };
export default class Splash extends Component<Props> {
    render() {
        return (
            <ImageBackground source={splash} style={{width: '100%', height: '100%'}}>
                <View style={{flex: 1, justifyContent:'center', alignContent:'center'}}>
                    <Text style={{textAlign:'center', fontSize: 20, marginTop: 10, color: 'white'}}>{this.props.message || ''}</Text>
                </View>
            </ImageBackground>
        );
    }
}