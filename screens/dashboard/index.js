// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  YellowBox
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient, Svg } from 'expo';
import { get } from 'lodash';
// import global actions
import * as actions from './actions';

// import global styles
// @TODO: move the global styles from this screen into ../../styles/common 
import commonStyles from '../../styles/common';
const styles = StyleSheet.create(commonStyles);

YellowBox.ignoreWarnings(['Setting a timer']);

type Props = {
  actions: Object,
  profile: Object,
  navigation: Object
};


class Dashboard extends Component<Props> {

  constructor(props) {
    super(props);
    this.ellipsisAlert = this.ellipsisAlert.bind(this);
    this.state = {
      expandCurrentGoals: false,
      expandCompletedGoals: false
    };
    this.icons = {
      'dots': 'ellipsis-v',
      'open': 'angle-down',
      'close': 'angle-up'
    };
  }

  renderGoals(goalArray) {
    return goalArray.map((goal, index) => 
      <View style={styles.dashRow} key={index}>
        <View style={styles.smallerBlock}>
          <Text style={styles.date}> </Text>
        </View>
        <View style={styles.biggerBlock}>
          <Text style={styles.subTitle}>{goal.title || ''}</Text>
          <Text style={styles.subText}>{goal.detail || ''}</Text>
        </View>
      </View>
    );
  }

  ellipsisAlert() {

    const logoutCallback = this.props.actions.logout;

    Alert.alert(
        'Do you want to logout?',
        'This will return you to the login screen.',
        [
            {text: 'Logout', onPress: logoutCallback},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
        ],
        {cancelable: false}
    );
}

  toggleExpandCurrentGoals() {
    this.setState({
      expandCurrentGoals: !this.state.expandCurrentGoals
    });
  }

  toggleExpandCompletedGoals() {
    this.setState({
      expandCompletedGoals: !this.state.expandCompletedGoals
    });
  }

  render() {

    let incentivesEarned = ((this.props.profile || {}).incentivesEarned || 0);
    const incentivesAvailable = 500;
    let percentComplete = (incentivesEarned / incentivesAvailable) * 100;
    let rotation = (1.72 * percentComplete) - 86;  
   
    const allGoals = get(this.props.profile, 'goalArray', []);
    const incompleteGoals = allGoals.filter(goal => !goal.completed);
    if (incompleteGoals.length <= 0) {
      incompleteGoals.push({
        title: 'Let\'s work together on some goals to move you forward.',
        detail: 'Schedule an appointment with your counselor today!',
        completed: false
      })
    }

    const completedGoals = allGoals.filter(goal => goal.completed);
    if (completedGoals.length <= 0) {
      completedGoals.push({
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
              <Text style={[styles.blockTitle, styles.goalsTitle]}>{'CURRENT GOALS:'}</Text>
              {
                this.renderGoals(incompleteGoals.slice(0,1))
              }
              {
                this.state.expandCurrentGoals 
                  && incompleteGoals.length > 1 
                  && (
                    <View style={styles.dashColumn}>
                      { this.props.children }
                      {            
                        this.renderGoals(incompleteGoals.slice(1))
                      }
                    </View>
                  )
              }
              <View style={styles.moreButton}>
                <View style={styles.dashRow}>
                  <Text style={styles.moreButton}></Text>
                  <TouchableHighlight
                    style={styles.dashButton}
                    onPress={this.toggleExpandCurrentGoals.bind(this)}
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
                </View>
              </View>
            </View>
          </View>

          {/* COMPLETED Goals */}

          <View style={styles.padding}>
            <View style={styles.completedBox}>
              <Text style={[styles.blockTitle, styles.completedTitle]}>{'COMPLETED:'}</Text>
              {
                this.renderGoals(completedGoals.slice(0,1))
              }
              {
                this.state.expandCompletedGoals
                  && completedGoals.length > 1 
                  && (
                    <View style={styles.dashColumn}>
                      { this.props.children }
                      {                
                        this.renderGoals(completedGoals.slice(1))
                      }
                    </View>
                  )
              }
              <View style={styles.moreButton}>
                <View style={styles.dashRow}>
                  <Text style={styles.moreButton}></Text>
                  <TouchableHighlight
                    style={styles.dashButton}
                    onPress={this.toggleExpandCompletedGoals.bind(this)}
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
