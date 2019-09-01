// @flow

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Container} from 'native-base';
import {LinearGradient} from 'expo-linear-gradient';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    YellowBox
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import global actions
import * as actions from './actions';
// import global styles
import commonStyles from '../../styles/common';
import MenuCircle from '../../components/menu-circle';

const styles = StyleSheet.create(commonStyles);

YellowBox.ignoreWarnings(['Setting a timer']);

type Props = {
    actions: Object,
    goal: Object,
    navigation: Object
};


class GoalDetails extends Component<Props> {

    constructor(props) {
        super(props);
        this.ellipsisToggle = this.ellipsisToggle.bind(this);
        this.ellipsisLogoutAlert = this.ellipsisLogoutAlert.bind(this);
        this.state = {
            expanded2: false,
            expanded3: false,
            menuScale: new Animated.Value(0.01)
        };
        this.icons = {
            dots: 'ellipsis-v',
            open: 'angle-down',
            close: 'angle-up'
        };
    }

    ellipsisToggle() {
        // Toggle circular menu open/close
        if (this.state.menuScale._value <= 0.01) {
            Animated.timing(
                this.state.menuScale,
                {
                    toValue: 1,
                    duration: 500
                }
            ).start();
        } else if (this.state.menuScale._value === 1.0) {
            Animated.timing(
                this.state.menuScale,
                {
                    toValue: 0,
                    duration: 500
                }
            ).start();
        }
    }

    ellipsisLogoutAlert() {
        const logoutCallback = this.props.actions.logout;

        Alert.alert(
            'Do you want to logout?',
            'This will return you to the login screen.',
            [
                {text: 'Logout', onPress: logoutCallback},
                {text: 'Cancel', onPress: this.ellipsisToggle, style: 'cancel'}
            ],
            {cancelable: false}
        );
    }

    render() {
        const dots = this.icons.dots;
        const {navigation} = this.props;
        const goal = navigation.getParam('goal');
        return (
            <Container>
                {Platform.OS === 'ios' && <StatusBar barStyle='default'/>}
                <View scrollEnabled={false} style={styles.container}>
                    <View style={styles.dashRow}>
                        <View style={styles.titleRow}>
                            <Image
                                source={require('../../assets/images/FinancialFuturesLogo.jpg')}
                                style={
                                    {
                                        position: 'absolute',
                                        left: -55,
                                        top: 18,
                                        width: '100%',
                                        height: 40,
                                        resizeMode: 'contain'
                                    }
                                }
                            />
                            <Text style={[styles.title, {marginLeft: 100}]}>{' '}</Text>
                        </View>
                        <View style={styles.dots}>
                            <Animated.View
                                style={{
                                    position: 'absolute',
                                    transform: [
                                        {scale: this.state.menuScale}
                                    ],
                                    top: -125,
                                    left: -133
                                }}
                            >
                                <TouchableHighlight
                                    onPress={() => this.ellipsisLogoutAlert()}
                                    underlayColor='transparent'
                                    style={{
                                        width: 300,
                                        height: 300,
                                        zIndex: 1
                                    }}
                                >
                                    <View>
                                        <MenuCircle/>
                                        <Text style={styles.logoutText}>Log out</Text>
                                    </View>
                                </TouchableHighlight>
                            </Animated.View>
                            <TouchableHighlight
                                onPress={this.ellipsisToggle}
                                underlayColor='transparent'
                            >
                                <Icon
                                    name={dots}
                                    style={styles.ellipsis}
                                />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <LinearGradient
                        colors={['#fff', '#EFF0BE']}
                        style={
                            {
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 60,
                                height: (Dimensions.get('window').height - 60),
                                zIndex: -1
                            }
                        }
                    />
                    <TouchableHighlight onPress={() => navigation.navigate('Dashboard')}>
                        <Text>Back to Dashboard</Text>
                    </TouchableHighlight>
                    <ScrollView style={styles.main}>
                        <Text>CURRENT GOAL:</Text>
                        <Text>{goal.title}</Text>
                        <Text>{goal.detail}</Text>
                        <View>
                            <View><Icon name={dots}/><Text>Remind me:</Text></View>
                            <TouchableHighlight><Text>tomorrow</Text></TouchableHighlight>
                            <TouchableHighlight><Text>in 3 days</Text></TouchableHighlight>
                            <TouchableHighlight><Text>in 1 week</Text></TouchableHighlight>
                            <TouchableHighlight><Text>custom...</Text></TouchableHighlight>
                            <View><Text>Goal Completed?</Text></View>
                            <TouchableHighlight><Text>Done!</Text></TouchableHighlight>
                        </View>
                    </ScrollView>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const profile = state.dashboard.profile || {};
    const session = state.login.session;
    const goals = state.dashboard.goals || [];
    return {session, profile, goals};
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalDetails);
