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
import * as actionCreators from './actions';
import commonStyles from '../../styles/common';
import MenuCircle from '../../components/menu-circle';
import styles from './styles';
import moment from 'moment';
import * as R from 'ramda';
import {isValidDate} from '../../libs/validators';

const myStyles = StyleSheet.create({...commonStyles, ...styles});

YellowBox.ignoreWarnings(['Setting a timer']);

type Props = {
    actions: Object,
    navigation: Object,
    uid: string
};

const addDaysToDate = R.curry((date, daysToAdd) => {
    const myDate = isValidDate(date) ? date : new Date();
    return moment(myDate).add(daysToAdd, 'day').toDate();
});

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
        const {navigation, uid, actions} = this.props;
        const goal = navigation.getParam('goal');
        const resetReminder = addDaysToDate(new Date());
        const update = _changes => () => {
            actions.updateGoal(uid, goal, _changes);
            navigation.navigate('Dashboard');
        };
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
                        <View style={myStyles.blockLabel}>
                            <Icon style={myStyles.blockLabelIcon} name={'user-clock'}/>
                            <Text style={myStyles.blockLabelText}>Remind me:</Text>
                        </View>
                        <TouchableHighlight
                            onPress={update({remind: resetReminder(1)})}
                            style={[myStyles.detailButton, {backgroundColor: '#F88E6D'}]}
                        >
                            <Text style={myStyles.detailButtonText}>tomorrow</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={update({remind: resetReminder(3)})}
                            style={[myStyles.detailButton, {backgroundColor: '#FFD4C6'}]}
                        >
                            <Text style={myStyles.detailButtonText}>in 3 days</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={update({remind: resetReminder(7)})}
                            style={[myStyles.detailButton, {backgroundColor: '#F6F4D6'}]}
                        >
                            <Text style={myStyles.detailButtonText}>in 1 week</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={update({snoozed: !goal.snoozed})}
                            style={[myStyles.detailButton, {backgroundColor: '#F2F2CC'}]}>
                            <Text style={myStyles.detailButtonText}>{!goal.snoozed ? 'Pause' : 'Un-pause'}</Text>
                        </TouchableHighlight>
                        {/*<View style={myStyles.blockLabel}>*/}
                        {/*    <Text style={myStyles.blockLabelText}>Goal Completed?</Text>*/}
                        {/*</View>*/}
                        {/*<TouchableHighlight*/}
                        {/*    onPress={update({completed: !goal.completed})}*/}
                        {/*    style={[myStyles.detailButton, {backgroundColor: '#FEA488'}]}*/}
                        {/*>*/}
                        {/*    <Text*/}
                        {/*        style={[myStyles.detailButtonText, {color: 'white'}]}>{goal.completed ? 'Mark Incomplete' : 'Done!'}</Text>*/}
                        {/*</TouchableHighlight>*/}
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const uid = (state.login.user || {}).uid;
    return {uid};
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalDetails);
