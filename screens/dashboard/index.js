// @flow

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Container } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
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
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as R from "ramda";
import GoalMessageBox from "../../components/goal-message-box";
import * as actionCreators from "./actions";
import commonStyles from "../../styles/common";
import MoneyMeter from "../../components/money-meter";
import MenuCircle from "../../components/menu-circle";
import GoalsBox from "../../components/goals-box";
import CongratulationsModal from "../../components/congratulations-modal";

const styles = StyleSheet.create(commonStyles);

YellowBox.ignoreWarnings(["Setting a timer"]);

type Props = {
  actions: Object,
  profile: Object,
  navigation: Object,
  completedGoals: Array<Object>,
  incompleteGoals: Array<Object>,
  submittedGoals: Array<Object>
//   isModalVisible: Boolean,
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
            dots: "ellipsis-v",
            open: "angle-down",
            close: "angle-up"
        };
    }

    ellipsisToggle() {
    // Toggle circular menu open/close
        if (this.state.menuScale._value <= 0.01) {
            Animated.timing(this.state.menuScale, {
                toValue: 1,
                duration: 500
            }).start();
        } else if (this.state.menuScale._value === 1.0) {
            Animated.timing(this.state.menuScale, {
                toValue: 0,
                duration: 500
            }).start();
        }
    }

    ellipsisLogoutAlert() {
        const logoutCallback = this.props.actions.logout;

        Alert.alert(
            "Do you want to logout?",
            "This will return you to the login screen.",
            [
                { text: "Logout", onPress: logoutCallback },
                { text: "Cancel", onPress: this.ellipsisToggle, style: "cancel" }
            ],
            { cancelable: false }
        );
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

    render() {
        const {
            actions,
            profile,
            completedGoals,
            incompleteGoals,
            submittedGoals,
            navigation,
            isModalVisible
        } = this.props;
        const incentivesEarned = profile.incentivesEarned || 0;
        const incentivesAvailable = 500;
        const percentComplete = (incentivesEarned / incentivesAvailable) * 100;
        const updateGoal = (uid => goal => changes => () => {
            actions.updateGoal(uid, goal, changes);
        })(profile.uid);
        const allButFirst = R.compose(
            R.map(goal => (
                <GoalMessageBox
                    goal={goal}
                    gotoDetails={() => navigation.navigate("GoalDetails", { goal })}
                    message={[goal.title, goal.detail]}
                    key={goal.id}
                    updateGoal={!goal.completed ? updateGoal(goal) : () => void 0}
                />
            )),
            R.slice(1, Infinity)
        );
        const currentGoalVerbiage =
      incompleteGoals.length > 0
          ? [incompleteGoals[0].title, incompleteGoals[0].detail]
          : [
              "Let's work together on some goals to move you forward.",
              "Schedule an appointment with your counselor today!"
          ];
        const firstCompletedGoalVerbiage =
      completedGoals.length > 0
          ? [completedGoals[0].title, completedGoals[0].detail]
          : ["Keep up the good work.", "You'll finish a goal soon!"];
        const firstSubmittedGoalVerbiage =
      submittedGoals.length > 0
          ? [submittedGoals[0].title, submittedGoals[0].detail]
          : ["You have no goals pending review", "Keep on working"];
        const dots = this.icons.dots;

        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <View style={styles.dashRow}>
                    <View style={styles.titleRow}>
                        <Image
                            source={require("../../assets/images/FinancialFuturesLogo.jpg")}
                            style={{
                                position: "absolute",
                                left: -55,
                                top: 18,
                                width: "100%",
                                height: 40,
                                resizeMode: "contain"
                            }}
                        />
                        <Text style={[styles.title, { marginLeft: 100 }]}> </Text>
                    </View>
                    <View style={styles.dots}>
                        <Animated.View
                            style={{
                                position: "absolute",
                                transform: [{ scale: this.state.menuScale }],
                                top: -125,
                                left: -133
                            }}
                        >
                            <TouchableHighlight
                                onPress={() => this.ellipsisLogoutAlert()}
                                underlayColor="transparent"
                                style={{
                                    width: 300,
                                    height: 300,
                                    zIndex: 1
                                }}
                            >
                                <View>
                                    <MenuCircle />
                                    <Text style={styles.logoutText}>Log out</Text>
                                </View>
                            </TouchableHighlight>
                        </Animated.View>
                        <TouchableHighlight
                            onPress={this.ellipsisToggle}
                            underlayColor="transparent"
                        >
                            <Icon name={dots} style={styles.ellipsis} />
                        </TouchableHighlight>
                    </View>
                </View>
                <LinearGradient
                    colors={["#fff", "#04a0c6"]}
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 60,
                        height: Dimensions.get("window").height - 60,
                        zIndex: -1
                    }}
                />
                <ScrollView style={styles.main}>
                    <View style={styles.progressBox}>
                        <View style={styles.spaceRow}>
                            <Text
                                style={[styles.bigTitle, styles.bigLetters]}
                            >{`$${incentivesEarned}`}</Text>
                            <Text style={styles.bigBlock} />
                            <Text
                                style={styles.bigTitle}
                            >{`${percentComplete}% Complete!`}</Text>
                        </View>
                        <View style={styles.dashRow}>
                            <View style={styles.smallerBlock}>
                                <Text style={styles.bigBlock} />
                                <Text style={[styles.money, styles.end]}>{"$0"}</Text>
                            </View>
                            <View style={styles.bottomLine}>
                                <MoneyMeter percentComplete={percentComplete} />
                            </View>
                            <View style={styles.smallerBlock}>
                                <Text style={styles.bigBlock} />
                                <Text style={[styles.money, styles.start]}>{"$500"}</Text>
                            </View>
                            <Text style={styles.moreButton} />
                        </View>
                    </View>
                    <GoalsBox
                        onExpand={isExpanded => {
                            this.setState({ expanded1: isExpanded });
                        }}
                        showExpandButton={(incompleteGoals || []).length > 1}
                        title={"CURRENT GOALS:"}
                    >
                        <GoalMessageBox
                            goal={incompleteGoals[0]}
                            message={currentGoalVerbiage}
                            gotoDetails={() =>
                                navigation.navigate("GoalDetails", {
                                    goal: incompleteGoals[0] || {}
                                })
                            }
                            updateGoal={updateGoal(incompleteGoals[0])}
                        />
                        {this.state.expanded1 && allButFirst(incompleteGoals)}
                    </GoalsBox>
                    <GoalsBox
                        onExpand={isExpanded => {
                            this.setState({ expanded2: isExpanded });
                        }}
                        showExpandButton={(submittedGoals || []).length > 1}
                        title={"SUBMITTED GOALS:"}
                    >
                        <GoalMessageBox
                            goal={submittedGoals[0]}
                            message={firstSubmittedGoalVerbiage}
                            gotoDetails={() =>
                                navigation.navigate("GoalDetails", {
                                    goal: submittedGoals[0] || {}
                                })
                            }
                            updateGoal={updateGoal(submittedGoals[0])}
                        />
                        {this.state.expanded2 && allButFirst(submittedGoals)}
                    </GoalsBox>
                    <GoalsBox
                        onExpand={isExpanded => {
                            this.setState({ expanded3: isExpanded });
                        }}
                        showExpandButton={(completedGoals || []).length > 1}
                        title={"COMPLETED GOALS:"}
                    >
                        <GoalMessageBox
                            goal={completedGoals[0]}
                            gotoDetails={() =>
                                navigation.navigate("GoalDetails", {
                                    goal: completedGoals[0] || {}
                                })
                            }
                            message={firstCompletedGoalVerbiage}
                            updateGoal={() => void 0}
                        />
                        {this.state.expanded3 && allButFirst(completedGoals)}
                    </GoalsBox>
                    {/* Modal for goal completion. TODO initial state, switch close modal to redux, ensure modal only opens once for each trigger */}
                    <CongratulationsModal goal={`You completed "Open matched savings account"`} visibility={isModalVisible} hideModal={this.props.actions.hideModal} />
                    <TouchableHighlight
                        onPress={() => {
                            this.props.actions.openModal();
                        }}
                    >
                        <Text>Show Modal</Text>
                    </TouchableHighlight>
                </ScrollView>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const profile = state.dashboard.profile || {};
    const session = state.login.session;
    const [completedGoals, otherGoals] = R.partition(
        goal => goal.completed,
        state.dashboard.goals || []
    );
    const [submittedGoals, incompleteGoals] = R.partition(
        goal => goal.submittedForReview,
        otherGoals || []
    );
    // test for modal
    const isModalVisible = state.dashboard.isModalVisible || false;
    return { session, profile, completedGoals, submittedGoals, incompleteGoals, isModalVisible };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
