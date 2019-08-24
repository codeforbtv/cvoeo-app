// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient, Svg } from 'expo';
import { Goal } from './components/goal'
// import global actions
import * as actions from './actions';

// import global styles
// @TODO: move the global styles from this screen into ../../styles/common 
import commonStyles from '../../styles/common';
import { GoalDetail } from './components/goal-detail';
const styles = StyleSheet.create(commonStyles);

class Dashboard extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    profile: PropTypes.object,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      expandCurrentGoals: false,
      expandCompletedGoals: false,
      goalDetails: undefined
    };
    this.icons = {
      'dots': 'ellipsis-v',
      'open': 'angle-down',
      'close': 'angle-up'
    };
  }

  ellipsisAlert = () => {
    Alert.alert(
        'Do you want to logout?',
        'This will return you to the login screen.',
        [
            {text: 'Logout', onPress: this.props.actions.logout},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
        ],
        {cancelable: false}
    );
  }

  toggleExpandCurrentGoals = () => {
    this.setState({
      expandCurrentGoals: !this.state.expandCurrentGoals
    });
  }

  toggleExpandCompletedGoals = () => {
    this.setState({
      expandCompletedGoals: !this.state.expandCompletedGoals
    });
  }

  showGoalDetails = (goal) => {
    this.setState({
      goalDetails: goal
    });
  }

  hideGoalDetails = () => {
    this.setState({
      goalDetails: undefined
    });
  }

  render() {
    const incentivesEarned = ((this.props.profile || {}).incentivesEarned || 0);
    const incentivesAvailable = 500;
    const percentComplete = (incentivesEarned / incentivesAvailable) * 100;
    const rotation = (1.72 * percentComplete) - 86;  
   
    // const allGoals = get(this.props.profile, 'goalArray', []);
    const allGoals = (this.props.profile || {}).goalArray || [];
    const incompleteGoals = allGoals.filter((goal) => !goal.completed);
    if (incompleteGoals.length <= 0) {
      incompleteGoals.push({
        id: 0,
        title: 'Let\'s work together on some goals to move you forward.',
        detail: 'Schedule an appointment with your counselor today!',
        completed: false
      })
    }

    const completedGoals = allGoals.filter((goal) => goal.completed);
    if (completedGoals.length <= 0) {
      completedGoals.push({
        id: 0,
        title: 'Keep up the good work.',
        detail: 'You\'ll finish a goal soon!',
        completed: true
      })
    }

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View scrollEnabled={false} style={styles.container}>
        <View style={styles.dashRow}>
          <View style={styles.titleRow}>
            <Image source={require('../../assets/images/FinancialFuturesLogo.jpg')} 
            style={{ position: 'absolute', left: -55, top: 18, width: '100%', height: 40, resizeMode: 'contain'}}
            />
            <Text style={[styles.title, {marginLeft: 100}]}>{' '}</Text>
          </View>
          <TouchableHighlight
            onPress={this.ellipsisAlert}
            underlayColor='transparent'
            >
            <Icon
            name={this.icons['dots']}
              style={[styles.title, styles.dots]}
            />
          </TouchableHighlight>
        </View>
        <LinearGradient colors={['#fff', '#04a0c6']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 60,
            height: (Dimensions.get('window').height - 60),
            zIndex: -1
          }}
          />
        <ScrollView style={styles.main}>

          {/* <Upcoming /> */}

          <View style={styles.padding}>
            <View style={styles.progressBox}>
              <View style={styles.spaceRow}>
                <Text style={[styles.bigTitle, styles.bigLetters]}>{'$' + incentivesEarned}</Text>
                <Text style={styles.bigBlock}></Text>
                <Text style={styles.bigTitle}>{percentComplete+ '% Complete!'}</Text>
              </View>
              <View style={styles.dashRow}>
                <View style={styles.smallerBlock}>
                  <Text style={styles.bigBlock}></Text>
                  <Text style={[styles.money, styles.end]}>{'$0'}</Text>
                </View>
                <View style={styles.bottomLine}>

                  <Svg height={100} width={200}>
                    <Svg.Circle
                      cx={100}
                      cy={100}
                      r={85}
                      strokeWidth={6}
                      stroke="#dc552b"
                      fill="#eeeec2"
                    />
                    <Svg.G rotation={rotation} origin="100, 100">
                      <Svg.ClipPath id="clip">
                        <Svg.Rect
                          x={100}
                          height={200}
                          width={200}
                        />
                      </Svg.ClipPath>
                      <Svg.Circle
                        cx={100}
                        cy={100}
                        r={85}
                        strokeWidth={6}
                        stroke="#fea488"
                        fill="#fdfffb"
                        clipPath="url(#clip)"
                      />
                      <Svg.Path
                        d="M 100 100 L 100 0"
                        strokeWidth={2}
                        stroke="#020202"
                      />
                      <Svg.Path
                        d="M 100 0 L 95 5"
                        strokeWidth={2}
                        stroke="#020202"
                      />
                      <Svg.Path
                        d="M 100 0 L 105 5"
                        strokeWidth={2}
                        stroke="#020202"
                      />
                    </Svg.G>

                  </Svg>

                </View>
                <View style={styles.smallerBlock}>
                  <Text style={styles.bigBlock}></Text>
                  <Text style={[styles.money, styles.start]}>{'$500'}</Text>
                </View>
                <Text style={styles.moreButton}> </Text>
              </View>
            </View>
          </View>

          {/* CURRENT GOALS */}

          <View style={styles.padding}>
            <View style={styles.goalsBox}>
              <Text style={[styles.blockTitle, styles.goalSectionTitle]}>{'CURRENT GOALS:'}</Text>
              {
                incompleteGoals.slice(0,1).map((goal) => 
                  <Goal key={goal.id} goal={goal} showDetails={this.showGoalDetails} />  
                )
              }
              {
                this.state.expandCurrentGoals &&
                incompleteGoals.slice(1).map((goal) => 
                  <Goal key={goal.id} goal={goal} showDetails={this.showGoalDetails} />
                )
              }
              <View style={styles.moreButton}>
                <View style={styles.dashRow}>
                  <Text style={styles.moreButton}></Text>
                  <TouchableHighlight
                    style={styles.dashButton}
                    onPress={this.toggleExpandCurrentGoals}
                    underlayColor='transparent'>
                    <View style={[styles.FAIconView, styles.expandCurrentGoalsIconBg]}>
                      <Icon
                        style={[styles.FAIcon, styles.expandCurrentGoalsIcon]}
                        name={
                          (this.state.expandCurrentGoals) 
                            ? this.icons['close'] 
                            : this.icons['open']
                        }
                      />
                    </View>
                  </TouchableHighlight>
                  <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.goalDetails != undefined}
                    onRequestClose={this.hideGoalDetails}>
                    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                      <View>
                        <Button title="Back to Main" onPress={this.hideGoalDetails} />
                        {
                          this.state.goalDetails &&
                            <GoalDetail goal={this.state.goalDetails}></GoalDetail>
                        }
                      </View>
                    </SafeAreaView>
                  </Modal>
                </View>
              </View>
            </View>
          </View>

          {/* COMPLETED Goals */}

          <View style={styles.padding}>
            <View style={styles.completedBox}>
              <Text style={[styles.blockTitle, styles.completedTitle]}>{'COMPLETED:'}</Text>
              {
                completedGoals.slice(0,1).map((goal) => 
                  <Goal key={goal.id} goal={goal} />
                )
              }
              {
                this.state.expandCompletedGoals &&
                completedGoals.slice(1).map((goal) => 
                  <Goal key={goal.id} goal={goal} />
                )
              }
              <View style={styles.moreButton}>
                <View style={styles.dashRow}>
                  <Text style={styles.moreButton}></Text>
                  <TouchableHighlight
                    style={styles.dashButton}
                    onPress={this.toggleExpandCompletedGoals}
                    underlayColor='transparent'>
                    <View style={[styles.FAIconView, styles.expandCompletedGoalsIconBg]}>
                      <Icon
                        style={[styles.FAIcon, styles.expandCompletedGoalsIcon]}
                        name={(this.state.expandCompletedGoals) 
                            ? this.icons['close'] 
                            : this.icons['open']}
                      />
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.padding}>
          </View>
        </ScrollView>
      </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({ session: state.login.session, profile: state.dashboard.profile });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
