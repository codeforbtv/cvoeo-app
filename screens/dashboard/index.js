// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Animated,
  Art,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerItems } from 'react-navigation';
import * as dataSource from '../../data-sources/firebase-data';
import moment from 'moment';

// import global actions
import * as actions from './actions';

// import global styles
// @TODO: move the global styles from this screen into ../../styles/common 
import commonStyles from '../../styles/common';
const styles = StyleSheet.create(commonStyles);

type Props = {
  actions: Object,
  profile: Object,
  navigation: Object
};


class Dashboard extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      expanded1: false,
      expanded2: false,
      expanded3: false
    };
    this.icons = {
      'arrow': 'angle-down',
      'open': 'angle-down',
      'close': 'angle-up'
    };
  }

  showUpcoming(start, end) {

    let allUpcomingEvents = [];
    for (i = start; i < end; i++) {

      let upcomingTitle = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).title);
      if (upcomingTitle) {
        let upcomingLocation = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).location);
        let upcomingDate = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).date);
        let upcomingMoment = moment(new Date(((upcomingDate || {}).seconds) * 1000)).format('ddd M/D/YY h:mma');
        let upcomingMomentDays = moment(new Date(((upcomingDate || {}).seconds) * 1000)).toNow(true);

        allUpcomingEvents.push(
          <View style={styles.dashRow} key={i}>
            <View style={styles.smallerBlock}>
              <Text style={styles.date}> </Text>
            </View>
            <View style={styles.bigBlock}>
              <Text style={styles.subTitle}>{upcomingTitle}</Text>
              <Text style={styles.subText}>{upcomingMoment}</Text>
              <Text style={styles.subText}>{upcomingLocation}</Text>
              <Text style={styles.subText}></Text>
            </View>
            <View style={styles.smallBlock}>
              <Text style={styles.circle}>{upcomingMomentDays.split(' ')[0]}</Text>
              <Text style={styles.days}>{upcomingMomentDays.split(' ')[1]}</Text>
            </View>
          </View>
        );
      }
    }
    return allUpcomingEvents;
  }

  showGoals(start, end) {

    let allGoals = [];
    for (i = start; i < end; i++) {

      let goalTitle = ((((this.props.profile || {}).goalArray || {})[i] || {}).title);
      let goalDetail = ((((this.props.profile || {}).goalArray || {})[i] || {}).detail);
      if (goalTitle) {

        allGoals.push(
          <View style={styles.dashRow} key={i}>
            <View style={styles.smallerBlock}>
              <Text style={styles.date}> </Text>
            </View>
            <View style={styles.biggerBlock}>
              <Text style={styles.subTitle}>{goalTitle}</Text>
              <Text style={styles.subText}>{goalDetail}</Text>
            </View>
          </View>
        );
      }
    }
    return allGoals;
  }

  showComplete(start, end) {

    let allComplete = [];
    for (i = start; i < end; i++) {

      let completeTitle = ((((this.props.profile || {}).completeArray || {})[i] || {}).title);
      let completeDetail = ((((this.props.profile || {}).completeArray || {})[i] || {}).detail);
      if (completeTitle) {

        allComplete.push(
          <View style={styles.dashRow} key={i}>
            <View style={styles.smallerBlock}>
              <Text style={styles.date}> </Text>
            </View>
            <View style={styles.biggerBlock}>
              <Text style={styles.subTitle}>{completeTitle}</Text>
              <Text style={styles.subText}>{completeDetail}</Text>
            </View>
          </View>
        );
      }
    }
    return allComplete;
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

  render() {

    let upcomingArray = ((this.props.profile || {}).upcomingArray || {});
    let goalArray = ((this.props.profile || {}).goalArray || {});
    let completeArray = ((this.props.profile || {}).completeArray || {});

    let incentives = ((this.props.profile || {}).incentives || 0);
    let percentComplete = incentives / 5;

    let arrow = this.icons['arrow'];
    let icon1 = this.icons['open'];
    if (this.state.expanded1) {
      icon1 = this.icons['close'];
    }
    let icon2 = this.icons['open'];
    if (this.state.expanded2) {
      icon2 = this.icons['close'];
    }
    let icon3 = this.icons['open'];
    if (this.state.expanded3) {
      icon3 = this.icons['close'];
    }
    return (
      <View scrollEnabled={false} style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, styles.blackText]}>m</Text><Text style={styles.title}>om</Text><Text style={[styles.title, styles.greenText]}>m</Text>
        </View>
        <ScrollView style={styles.main}>
          <View style={styles.padding}>
            <View style={styles.upcomingBox}>
              <Text style={[styles.blockTitle, styles.upcomingTitle]}>COMING UP:</Text>
              {this.showUpcoming(0, 1)}
              {
                this.state.expanded1 && (
                  <View style={styles.dashColumn}>
                    {this.props.children}
                    {this.showUpcoming(1, upcomingArray.length)}
                  </View>
                )
              }

              <View style={styles.moreButton}>
                <View style={styles.dashRow}>
                  <Text style={styles.moreButton}></Text>
                  <TouchableHighlight
                    style={styles.dashButton}
                    onPress={this.toggle1.bind(this)}
                    underlayColor="transparent">
                    <Icon
                      style={[styles.FAIcon, styles.icon1]}
                      name={icon1}
                    />
                  </TouchableHighlight>
                </View>
              </View>

            </View>
          </View>
          <View style={styles.padding}>
            <View style={styles.progressBox}>
              <View style={styles.spaceRow}>
                <Text style={[styles.bigTitle, styles.bigLetters]}>${incentives}</Text>
                <Text style={styles.bigBlock}></Text>
                <Text style={styles.bigTitle}>{percentComplete}% Complete!</Text>
              </View>
              <View style={styles.dashRow}>
                <View style={styles.smallerBlock}>
                  <Text style={styles.bigBlock}></Text>
                  <Text style={[styles.money, styles.end]}>$0</Text>
                </View>
                <View style={styles.bottomLine}>
                  <View style={styles.cone}></View>
                  <View style={styles.semiCircle}>
                    <View style={styles.diagonalLine}></View>
                    <Icon
                      style={styles.arrow}
                      name={arrow}
                    />
                  </View>
                </View>
                <View style={styles.smallerBlock}>
                  <Text style={styles.bigBlock}></Text>
                  <Text style={[styles.money, styles.start]}>$500</Text>
                </View>
                <Text style={styles.moreButton}> </Text>
              </View>
            </View>
          </View>

          <View style={styles.padding}>
            <View style={styles.goalsBox}>
              <Text style={[styles.blockTitle, styles.goalsTitle]}>CURRENT GOALS:</Text>

              {this.showGoals(0, 1)}

              {
                this.state.expanded2 && (
                  <View style={styles.dashColumn}>
                  {this.props.children}
                  {this.showGoals(1, goalArray.length)}
                </View>)
              }

              <View style={styles.moreButton}>
                <View style={styles.dashRow}>
                  <Text style={styles.moreButton}></Text>
                  <TouchableHighlight
                    style={styles.dashButton}
                    onPress={this.toggle2.bind(this)}
                    underlayColor="transparent">
                    <Icon
                      style={[styles.FAIcon, styles.icon2]}
                      name={icon2}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.padding}>
            <View style={styles.completedBox}>
              <Text style={[styles.blockTitle, styles.completedTitle]}>COMPLETED:</Text>
              {this.showComplete(0, 1)}
              {
                this.state.expanded3 && (
                  <View style={styles.dashColumn}>
                  {this.props.children}
                  {this.showComplete(1, completeArray.length)}
                </View>)
              }

              <View style={styles.moreButton}>
                <View style={styles.dashRow}>
                  <Text style={styles.moreButton}></Text>
                  <TouchableHighlight
                    style={styles.dashButton}
                    onPress={this.toggle3.bind(this)}
                    underlayColor="transparent">
                    <Icon
                      style={[styles.FAIcon, styles.icon3]}
                      name={icon3}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.padding}>
          </View>
          {/* <Button onPress={() => this.props.actions.logout.bind(this)} style={[styles.linkText, { fontSize: 16 }]} title='Logout'/> */}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ session: state.login.session, profile: state.dashboard.profile });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
