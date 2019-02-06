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
  navigation: Object,
  profile: Object
};

const icons = {
  'open': 'angle-down',
  'close': 'angle-up'
};

export class Upcoming extends Component<Props> {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      expanded: false
    };
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {

    let icon = icons['open'];
    if (this.state.expanded) {
      icon = icons['close'];
    }

    const showUpcoming = (firstOrRemaining) => {

      const upcomingArray = ((this.props.profile || []).upcomingArray || []);
      const upcomingFiltered = upcomingArray.filter(element => (((element.date.seconds) * 1000) > Date.now()));
      const upcomingSorted = upcomingFiltered.sort((a, b) => a.date.seconds - b.date.seconds);
      const upcomingMapped = upcomingSorted.map((event, i) => {

        const { title, location, date } = event;
        const momentDate = moment(new Date((date.seconds) * 1000));
        const localDate = moment(momentDate.toISOString());
        const formattedDate = moment(localDate).format('ddd M/D/YY h:mma');

        let dayNumber = momentDate.toNow(true).split(' ')[0];
        let dayWord = momentDate.toNow(true).split(' ')[1];

        switch (true) {
          case dayNumber.includes("a") && dayWord === "few":
            dayNumber = 1;
            dayWord = "minute";
            break;
          case dayNumber.includes("a"):
            dayNumber = 1;
            break;
          case dayWord === "days" && dayNumber > 6 && dayNumber < 14:
            dayNumber = 1;
            dayWord = "week";
            break;
          case dayWord === "days" && dayNumber > 13 && dayNumber < 29:
            dayNumber = Math.floor(dayNumber / 7);
            dayWord = "weeks";
            break;
        }

          return (
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
      });
      return (firstOrRemaining === 'first' ? upcomingMapped[0] || [] : upcomingMapped.slice(1));
    }

    return (
      <View style={styles.padding} >
        <View style={styles.upcomingBox}>
          <Text style={[styles.blockTitle, styles.upcomingTitle]}>COMING UP:</Text>
          {showUpcoming('first')}
          {
            this.state.expanded && (
              <View style={styles.dashColumn}>
                {showUpcoming('remaining')}
              </View>
            )
          }

          <View style={styles.moreButton}>
            <View style={styles.dashRow}>
              <Text style={styles.moreButton}></Text>
              <TouchableHighlight
                onPress={this.toggle}
                style={styles.dashButton}
                underlayColor="transparent">
                <Icon
                  name={icon}
                  style={[styles.FAIcon, styles.icon1]}
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
