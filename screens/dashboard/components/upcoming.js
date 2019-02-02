// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

// import global actions
import * as actions from '../actions';

// import global styles
// @TODO: move the global styles from this screen into ../../styles/common 
import commonStyles from '../../../styles/common';
const styles = StyleSheet.create(commonStyles);

type Props = {
  actions: Object,
  profile: Object,
  navigation: Object
};


export class Upcoming extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.icons = {
      'open': 'angle-down',
      'close': 'angle-up'
    };
  }


  showUpcoming(firstOrRemaining) {

    let upcomingArray = ((this.props.profile || {}).upcomingArray || {});

    let allUpcomingEvents = [];
    for (i = 0; i < upcomingArray.length; i++) {

      let title = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).title);
      let location = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).location);
      let date = ((((this.props.profile || {}).upcomingArray || {})[i] || {}).date);
      let momentDate = moment(new Date(((date || {}).seconds) * 1000));
      let localDate = moment(momentDate.toISOString()).toString();
      let formattedDate = moment(localDate).format('ddd M/D/YY h:mma');
      let dayNumber = momentDate.toNow(true).split(' ')[0];
      let dayWord = momentDate.toNow(true).split(' ')[1];

      if (title && moment(Date.now()) < momentDate) {

        if (dayNumber === "a" || dayNumber === "an") {
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
              <View style={styles.circle}>
                <Text style={styles.circleText}>{dayNumber}</Text>
              </View>
              <Text style={styles.days}>{dayWord}</Text>
            </View>
          </View>
        );
      }
    }
    if (firstOrRemaining === 'first') {
      return allUpcomingEvents[0];
    }
    if (firstOrRemaining === 'remaining') {
      return allUpcomingEvents.slice(1);
    }
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {

    let icon = this.icons['open'];
    if (this.state.expanded) {
      icon = this.icons['close'];
    }
    return (
      <View style={styles.padding}>
        <View style={styles.upcomingBox}>
          <Text style={[styles.blockTitle, styles.upcomingTitle]}>COMING UP:</Text>
          {this.showUpcoming('first')}
          {
            this.state.expanded && (
              <View style={styles.dashColumn}>
                {this.props.children}
                {this.showUpcoming('remaining')}
              </View>
            )
          }

          <View style={styles.moreButton}>
            <View style={styles.dashRow}>
              <Text style={styles.moreButton}></Text>
              <TouchableHighlight
                style={styles.dashButton}
                onPress={this.toggle.bind(this)}
                underlayColor="transparent">
                <Icon
                  style={[styles.FAIcon, styles.icon1]}
                  name={icon}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => ({ session: state.login.session, profile: state.dashboard.profile });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Upcoming);
