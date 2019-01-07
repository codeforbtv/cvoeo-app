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

  showUpcoming() {

    let myArray = ((this.props.profile || {}).upcomingArray || {});
    let iterations = myArray.length;

    let allUpcomingevents = [];
    for (i=1;i<iterations;i++) {

      let upcomingTitle = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).title);
      let upcomingLocation = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).location);
      let upcomingDate = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).date);
      let upcomingMoment = moment(new Date(((upcomingDate || {}).seconds) * 1000)).format('ddd M/D/YY h:mma');
      let upcomingMomentDays = moment(new Date(((upcomingDate || {}).seconds) * 1000)).toNow(true);

      allUpcomingevents.push(
      <View style={styles.dashRow}>
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
    return allUpcomingevents;
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
    let upcomingTitle0 = ((((this.props.profile || {}).upcomingArray || {})[0] || {}).title);
    let upcomingDate0 = ((((this.props.profile || {}).upcomingArray || {})[0] || {}).date);
    let upcomingMoment0 = moment(new Date(((upcomingDate0 || {}).seconds) * 1000)).format('ddd M/D/YY h:mma');
    let upcomingMomentDays0 = moment(new Date(((upcomingDate0 || {}).seconds) * 1000)).toNow(true);
    let upcomingLocation0 = ((((this.props.profile || {}).upcomingArray || {})[0] || {}).location);

    let upcomingTitle1 = ((((this.props.profile || {}).upcomingArray || {})[1] || {}).title);
    let upcomingLocation1 = ((((this.props.profile || {}).upcomingArray || {})[1] || {}).location);
    let upcomingDate1 = ((((this.props.profile || {}).upcomingArray || {})[1] || {}).date);
    let upcomingMoment1 = moment(new Date(((upcomingDate1 || {}).seconds) * 1000)).format('ddd M/D/YY h:mma');
    let upcomingMomentDays1 = moment(new Date(((upcomingDate1 || {}).seconds) * 1000)).toNow(true);

    let goalTitle0 = ((((this.props.profile || {}).goalArray || {})[0] || {}).title);
    let goalDetail0 = ((((this.props.profile || {}).goalArray || {})[0] || {}).detail);
    let goalTitle1 = ((((this.props.profile || {}).goalArray || {})[1] || {}).title);
    let goalDetail1 = ((((this.props.profile || {}).goalArray || {})[1] || {}).detail);
    let goalTitle2 = ((((this.props.profile || {}).goalArray || {})[2] || {}).title);
    let goalDetail2 = ((((this.props.profile || {}).goalArray || {})[2] || {}).detail);

    let completeTitle0 = ((((this.props.profile || {}).completeArray || {})[0] || {}).title);
    let completeDetail0 = ((((this.props.profile || {}).completeArray || {})[0] || {}).detail);
    let completeTitle1 = ((((this.props.profile || {}).completeArray || {})[1] || {}).title);
    let completeDetail1 = ((((this.props.profile || {}).completeArray || {})[1] || {}).detail);

    let incentives = (this.props.profile || {}).incentives;
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
              <View style={styles.dashRow}>
                <View style={styles.smallerBlock}>
                  <Text style={styles.date}> </Text>
                </View>
                <View style={styles.bigBlock}>
                  <Text style={styles.subTitle}>{upcomingTitle0}</Text>
                  <Text style={styles.subText}>{upcomingMoment0}</Text>
                  <Text style={styles.subText}>{upcomingLocation0}</Text>
                </View>
                <View style={styles.smallBlock}>
                  <Text style={styles.circle}>{upcomingMomentDays0.split(' ')[0]}</Text>
                  <Text style={styles.days}>{upcomingMomentDays0.split(' ')[1]}</Text>
                </View>
              </View>

              {
                this.state.expanded1 && (
                  <View style={styles.dashColumn}>
                    {this.props.children}
                    {this.showUpcoming()}
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
              <View style={styles.dashRow}>
                <View style={styles.smallerBlock}>
                  <Text style={styles.date}> </Text>
                </View>
                <View style={styles.biggerBlock}>
                  <Text style={styles.subTitle}>{goalTitle0}</Text>
                  <Text style={styles.subText}>{goalDetail0}</Text>
                </View>
              </View>

              {
                this.state.expanded2 && (<View style={styles.dashRow}>
                  {this.props.children}
                  <View style={styles.smallerBlock}>
                    <Text style={styles.date}> </Text>
                  </View>
                  <View style={styles.biggerBlock}>
                    <Text style={styles.subTitle}>{goalTitle1}</Text>
                    <Text style={styles.subText}> </Text>
                    <Text style={styles.subTitle}>{goalTitle2}</Text>
                    <Text style={styles.subText}> </Text>
                  </View>
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
              <View style={styles.dashRow}>
                <View style={styles.smallerBlock}>
                  <Text style={styles.date}> </Text>
                </View>
                <View style={styles.biggerBlock}>
                  <Text style={styles.subTitle}>{completeTitle0}</Text>
                  <Text style={styles.subText}>{completeDetail0}</Text>
                </View>
              </View>

              {
                this.state.expanded3 && (<View style={styles.dashRow}>
                  {this.props.children}
                  <View style={styles.smallerBlock}>
                    <Text style={styles.date}> </Text>
                  </View>
                  <View style={styles.biggerBlock}>
                    <Text style={styles.subTitle}>{completeTitle1}</Text>
                    <Text style={styles.subText}> </Text>
                  </View>
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
