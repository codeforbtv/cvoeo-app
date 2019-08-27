// @flow

import React, {Component, Node} from 'react';
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
import * as R from 'ramda';
import GoalMessageBox from '../../components/goal-message-box';

// import global actions
import * as actions from './actions';
import * as goalstatus from '../../constants/goal-status';

// import global styles
import commonStyles from '../../styles/common';
import MoneyMeter from '../../components/money-meter';
import MenuCircle from '../../components/menu-circle';

const styles = StyleSheet.create(commonStyles);

YellowBox.ignoreWarnings(['Setting a timer']);

type Props = {
    actions: Object,
    profile: Object,
    navigation: Object,
    completedGoals: Array<Object>,
    incompleteGoals: Array<Object>,
    children: Node
};


class Dashboard extends Component<Props> {

    constructor(props) {
        super(props);
        this.ellipsisToggle = this.ellipsisToggle.bind(this);
        this.ellipsisLogoutAlert = this.ellipsisLogoutAlert.bind(this);
        this.state = {
            expanded1: false,
            expanded2: false,
            expanded3: false,
            menuScale: new Animated.Value(0.01)
        };
        this.icons = {
            'dots': 'ellipsis-v',
            'open': 'angle-down',
            'close': 'angle-up',
            'complete': 'check-circle'
        };
    }

    /**
     * Show the goals
     *
     * @param firstOnly - TRUE to just show the first goal, FALSE to show all additional goals
     * @param thisStatus - The status to show - open, submitted, or complete
     */
    showGoals(firstOnly, thisStatus) {
        let goalArray = ((this.props.profile || {}).goalArray || {});

        let allGoals = [];
        for (i = 0; i < goalArray.length; i++) {
            // console.log(goalArray[i]);
            let id = goalArray[i].id;
            let title = goalArray[i].title;
            let detail = goalArray[i].detail;
            let status = goalArray[i].status;
            if (thisStatus === status) {
                if (thisStatus = goalstatus.STATUS_OPEN) {
                    let iconComplete = this.icons['complete'];

                    allGoals.push(
                        <View style={styles.dashRow} key={i}>
                            <View style={styles.smallerBlock}>
                                <Text style={styles.date}> </Text>
                            </View>
                            <View style={styles.biggerBlock}>
                                <Text style={styles.subTitle}>{title}</Text>
                                <Text style={styles.subText}>{detail}</Text>
                            </View>
                            <TouchableHighlight
                                style={styles.dashButton}
                                onPress={this.markSubmitted.bind(this, id, title )}
                                underlayColor='transparent'>
                                <View>
                                    <Icon
                                        style={[styles.FAIcon, styles.iconComplete]}
                                        name={iconComplete}
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>
                    );
                } else {
                    allGoals.push(
                        <View style={styles.dashRow} key={i}>
                            <View style={styles.smallerBlock}>
                                <Text style={styles.date}> </Text>
                            </View>
                            <View style={styles.biggerBlock}>
                                <Text style={styles.subTitle}>{title}</Text>
                                <Text style={styles.subText}>{detail}</Text>
                            </View>
                        </View>
                    );
                }

            }
        }
        if (firstOnly) {
            // Only return the first goal
            if (!allGoals[0]) {
                let message = '';
                switch (thisStatus) {
                    case goalstatus.STATUS_OPEN:
                        message = ['Let\'s work together on some goals to move you forward.', 'Schedule an appointment with your counselor today!'];
                        break;
                    case goalstatus.STATUS_SUBMITTED:
                        message = ['Submit your goals once you complete them!', 'You\'ll finish a goal soon!'];
                        break;
                    case goalstatus.STATUS_COMPLETE:
                        message = ['Keep up the good work.', 'You\'ll finish a goal soon!'];
                        break;
                }
                allGoals.push(
                    <View style={styles.dashRow} key={i}>
                        <View style={styles.smallerBlock}>
                            <Text style={styles.date}> </Text>
                        </View>
                        <View style={styles.biggerBlock}>
                            <Text style={styles.subTitle}>{message[0]}</Text>
                            <Text style={styles.subText}>{message[1]}</Text>
                        </View>
                    </View>
                );
            }
            return allGoals[0];
        }

        // Otherwise, return all the other goals
        return allGoals.slice(1);
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

    toggle1() {
        this.setState({
            expanded1: !this.state.expanded1
        });
    }

    toggle2() {
        this.setState({
            expanded2: !this.state.expanded2
        });
    }

    toggle3() {
        this.setState({
            expanded3: !this.state.expanded3
        });
    }

    markSubmitted(id, title) {
        console.log('Mark Submitted',id)

        Alert.alert(
            'Mark Goal as Submitted?',
            'Do you want to mark the goal "' + title + '" as submitted?',
            [
                {text: 'Yes', onPress: this.updateSubmitted(id)},
                {text: 'No', onPress: null, style: 'cancel'}
            ],
            {cancelable: true}
        );
    }

    /**
     * Update a goal as submitted
     */
    updateSubmitted(id) {
        // Find id in the goal array
    }

    render() {
        const {profile, completedGoals, incompleteGoals, children} = this.props;
        const incentivesEarned = profile.incentivesEarned || 0;
        const incentivesAvailable = 500;
        const percentComplete = (incentivesEarned / incentivesAvailable) * 100;

//         let dots = this.icons['dots'];
//         let icon1 = this.icons['open'];
//         if (this.state.expanded1) {
//             icon1 = this.icons['close'];
//         }
//         let icon2 = this.icons['open'];
//         if (this.state.expanded2) {
//             icon2 = this.icons['close'];
//         }
//         let icon3 = this.icons['open'];
//         if (this.state.expanded3) {
//             icon3 = this.icons['close'];
        const allButFirst = R.compose(
            R.map(goal => (<GoalMessageBox message={[goal.title, goal.detail]} key={goal.id}/>)),
            R.slice(1, Infinity)
        );
        const currentGoalVerbiage = incompleteGoals.length > 0
            ? [incompleteGoals[0].title, incompleteGoals[0].detail]
            : ['Let\'s work together on some goals to move you forward.', 'Schedule an appointment with your counselor today!'];
        const firstCompletedGoalVerbiage = completedGoals.length > 0
            ? [completedGoals[0].title, completedGoals[0].detail]
            : ['Keep up the good work.', 'You\'ll finish a goal soon!'];
        const dots = this.icons.dots;
        const icon2 = this.state.expanded2 ? this.icons.close : this.icons.open;
        const icon3 = this.state.expanded3 ? this.icons.close : this.icons.open;

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
                        colors={['#fff', '#04a0c6']}
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
                    <ScrollView style={styles.main}>
                        <View style={styles.padding}>
                            <View style={styles.progressBox}>
                                <View style={styles.spaceRow}>
                                    <Text style={[styles.bigTitle, styles.bigLetters]}>{`$${incentivesEarned}`}</Text>
                                    <Text style={styles.bigBlock}/>
                                    <Text style={styles.bigTitle}>{`${percentComplete}% Complete!`}</Text>
                                </View>
                                <View style={styles.dashRow}>
                                    <View style={styles.smallerBlock}>
                                        <Text style={styles.bigBlock}/>
                                        <Text style={[styles.money, styles.end]}>{'$0'}</Text>
                                    </View>
                                    <View style={styles.bottomLine}>
                                        <MoneyMeter percentComplete={percentComplete}/>
                                    </View>
                                    <View style={styles.smallerBlock}>
                                        <Text style={styles.bigBlock}/>
                                        <Text style={[styles.money, styles.start]}>{'$500'}</Text>
                                    </View>
                                    <Text style={styles.moreButton}/>
                                </View>
                            </View>
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.goalsBox}>
                                <Text style={[styles.blockTitle, styles.goalsTitle]}>{'CURRENT GOALS:'}</Text>

//                                 {this.showGoals(true, goalstatus.STATUS_OPEN)}

//                                 {
//                                     this.state.expanded1 && (
//                                         <View style={styles.dashColumn}>
//                                             {this.props.children}
//                                             {this.showGoals(false, goalstatus.STATUS_OPEN)}
//                                         </View>)
//                                 }

//                                 <View style={styles.moreButton}>
//                                     <View style={styles.dashRow}>
//                                         <Text style={styles.moreButton}></Text>
//                                         <TouchableHighlight
//                                             style={styles.dashButton}
//                                             onPress={this.toggle1.bind(this)}
//                                             underlayColor='transparent'>
//                                             <View style={[styles.FAIconView, styles.icon1Bg]}>
//                                                 <Icon
//                                                     style={[styles.FAIcon, styles.icon1]}
//                                                     name={icon1}
//                                                 />
//                                             </View>
//                                         </TouchableHighlight>
//                                     </View>
//                                 </View>
//                             </View>
//                         </View>
//                         <View style={styles.padding}>
//                             <View style={styles.goalsBox}>
//                                 <Text style={[styles.blockTitle, styles.goalsTitle]}>{'SUBMITTED:'}</Text>

//                                 {this.showGoals(true, goalstatus.STATUS_SUBMITTED)}

//                                 {
//                                     this.state.expanded2 && (
//                                         <View style={styles.dashColumn}>
//                                             {this.props.children}
//                                             {this.showGoals(false, goalstatus.STATUS_SUBMITTED)}
//                                         </View>)
                                <GoalMessageBox message={currentGoalVerbiage}/>
                                {
                                    this.state.expanded2 && (
                                        <View style={styles.dashColumn}>
                                            {children}
                                            {allButFirst(incompleteGoals)}
                                        </View>
                                    )
                                }
                                <View style={styles.moreButton}>
                                    <View style={styles.dashRow}>
                                        <Text style={styles.moreButton}/>
                                        <TouchableHighlight
                                            style={styles.dashButton}
                                            onPress={this.toggle2.bind(this)}
                                            underlayColor='transparent'>
                                            <View style={[styles.FAIconView, styles.icon2Bg]}>
                                                <Icon
                                                    style={[styles.FAIcon, styles.icon2]}
                                                    name={icon2}
                                                />
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.padding}>
                            <View style={styles.completedBox}>
                                <Text style={[styles.blockTitle, styles.completedTitle]}>{'COMPLETED:'}</Text>
//                                 {this.showGoals(true, goalstatus.STATUS_COMPLETE)}
//                                 {
//                                     this.state.expanded3 && (
//                                         <View style={styles.dashColumn}>
//                                             {this.props.children}
//                                             {this.showGoals(false, goalstatus.STATUS_COMPLETE)}
//                                         </View>)
                                <GoalMessageBox message={firstCompletedGoalVerbiage}/>
                                {
                                    this.state.expanded3 && (
                                        <View style={styles.dashColumn}>
                                            {children}
                                            {allButFirst(completedGoals)}
                                        </View>
                                    )
                                }

                                <View style={styles.moreButton}>
                                    <View style={styles.dashRow}>
                                        <Text style={styles.moreButton}/>
                                        <TouchableHighlight
                                            style={styles.dashButton}
                                            onPress={this.toggle3.bind(this)}
                                            underlayColor='transparent'>
                                            <View style={[styles.FAIconView, styles.icon3Bg]}>
                                                <Icon
                                                    style={[styles.FAIcon, styles.icon3]}
                                                    name={icon3}
                                                />
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.padding}/>
                    </ScrollView>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const profile = state.dashboard.profile || {};
    const session = state.login.session;
    const [completedGoals, incompleteGoals] = R.partition(goal => goal.completed, profile.goalArray || []);
    return {session, profile, completedGoals, incompleteGoals};
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
