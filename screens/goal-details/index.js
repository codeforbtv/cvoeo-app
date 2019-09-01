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
import * as actions from './actions';
import commonStyles from '../../styles/common';
import MenuCircle from '../../components/menu-circle';
import styles from './styles';

const myStyles = StyleSheet.create({...commonStyles, ...styles});

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

                <View style={myStyles.dashRow}>
                    <View style={myStyles.titleRow}>
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
                        <Text style={[myStyles.title, {marginLeft: 100}]}>{' '}</Text>
                    </View>
                    <View style={myStyles.dots}>
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
                                    <Text style={myStyles.logoutText}>Log out</Text>
                                </View>
                            </TouchableHighlight>
                        </Animated.View>
                        <TouchableHighlight
                            onPress={this.ellipsisToggle}
                            underlayColor='transparent'
                        >
                            <Icon
                                name={dots}
                                style={myStyles.ellipsis}
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
                <TouchableHighlight
                    onPress={() => navigation.navigate('Dashboard')}
                    style={myStyles.backButton}
                >
                    <View style={myStyles.backButtonContentWrapper}>
                        <Icon name={'chevron-down'} style={myStyles.backButtonIcon}/>
                        <Text style={myStyles.backButtonText}>{'Close'}</Text>
                    </View>
                </TouchableHighlight>
                <ScrollView style={myStyles.scrollArea}>
                    <Text style={myStyles.subTitle}>{goal.title}</Text>
                    <Text style={myStyles.subText}>{goal.detail}</Text>
                    <View style={myStyles.buttonWrapper}>
                        <View><Icon name={dots}/><Text>Remind me:</Text></View>
                        <TouchableHighlight style={myStyles.detailButton}><Text
                            style={myStyles.detailButtonText}>tomorrow</Text></TouchableHighlight>
                        <TouchableHighlight style={myStyles.detailButton}><Text style={myStyles.detailButtonText}>in 3
                            days</Text></TouchableHighlight>
                        <TouchableHighlight style={myStyles.detailButton}><Text style={myStyles.detailButtonText}>in 1
                            week</Text></TouchableHighlight>
                        <TouchableHighlight style={myStyles.detailButton}><Text
                            style={myStyles.detailButtonText}>custom...</Text></TouchableHighlight>
                        <View><Text>Goal Completed?</Text></View>
                        <TouchableHighlight style={myStyles.detailButton}><Text
                            style={myStyles.detailButtonText}>Done!</Text></TouchableHighlight>
                    </View>
                </ScrollView>
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
