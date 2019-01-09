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
  ART,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerItems } from 'react-navigation';
import * as dataSource from '../../data-sources/firebase-data';
import moment from 'moment';
import { Svg } from 'expo';

// import global actions
import * as actions from './actions';

// import global styles
// @TODO: move the global styles from this screen into ../../styles/common 
import commonStyles from '../../styles/common';
const styles = StyleSheet.create(commonStyles);

const {
  Surface,
  Group,
  Shape,
} = ART;

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
      'open': 'angle-down',
      'close': 'angle-up'
    };
  }


  showUpcoming(start, end) {

    let allUpcomingEvents = [];
    for (i = start; i < end; i++) {

      let title = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).title);
      let location = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).location);
      let date = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).date);
      let momentDate = moment(new Date(((date || {}).seconds) * 1000));
      let localDate = moment(momentDate.toISOString()).toString();
      let formattedDate = moment(localDate).format('ddd M/D/YY h:mma');
      let dayNumber = momentDate.toNow(true).split(' ')[0];
      let dayWord = momentDate.toNow(true).split(' ')[1];

      if (title && moment(Date.now()) < momentDate) {

        if (dayNumber === "a") {
          dayNumber = 1;
        }

        if (dayWord === "days" && dayNumber >= 7) {
          dayNumber = Math.floor(dayNumber / 7);
          dayWord = "weeks";
          if (dayNumber === 1) {
            dayWord = "week";
          }
        }

        allUpcomingEvents.push(
          <View style={styles.dashRow} key={i}>
            <View style={styles.smallerBlock}>
              <Text style={styles.date}> </Text>
            </View>
            <View style={styles.bigBlock}>
              <Text style={styles.subTitle}>{title}</Text>
              <Text style={styles.subText}>{formattedDate}</Text>
              <Text style={styles.subText}>{location}</Text>
              <Text style={styles.subText}></Text>
            </View>
            <View style={styles.smallBlock}>
              <Text style={styles.circle}>{dayNumber}</Text>
              <Text style={styles.days}>{dayWord}</Text>
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
    let rotation = (1.72 * percentComplete) - 86;

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
                        <Svg.Polygon
                          points="50,50 120,120" />

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
