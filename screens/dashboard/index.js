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
  Alert,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

// import global actions
import * as actions from './actions';

// import global styles
// @TODO: move the global styles from this screen into ../../styles/common 
import commonStyles from '../../styles/common';
const styles = StyleSheet.create(commonStyles);

type Props = {
  actions: Object,
  navigation: Object
};


class Dashboard extends Component<Props> {

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
      <View scrollEnabled={false} style={styles.container}>
        <View>
          <Text style={styles.title}>Money On My Mind</Text>
            <Button onPress={() => this.props.actions.logout} style={[styles.linkText, { fontSize: 16 }]} title='Logout'/>
        </View>
        <ScrollView style={styles.main}>
          <View style={styles.padding}>
            <View style={styles.upcomingBox}>
              <Text style={[styles.blockTitle, styles.upcomingTitle]}>COMING UP:</Text>
              <View style={styles.row}>
                <View style={styles.smallerBlock}>
                  <Text style={styles.date}> </Text>
                </View>
                <View style={styles.bigBlock}>
                  <Text style={styles.subTitle}>Meeting with Coach</Text>
                  <Text style={styles.subText}>Wed 12/19/18 12:00pm</Text>
                  <Text style={styles.subText}>CVOEO Office</Text>
                </View>
                <View style={styles.smallBlock}>
                  <Text style={styles.circle}>2</Text>
                  <Text style={styles.days}>days</Text>
                </View>
              </View>
              <View style={styles.moreButton}>
                <View style={styles.row}>
                  <Text style={styles.moreButton}></Text>
                  <TouchableHighlight
                    style={styles.dashButton}
                    onPress={this.toggle.bind(this)}
                    underlayColor="#fff">
                    <Icon
                      style={styles.FAIcon}
                      name={icon}
                    />
                  </TouchableHighlight>
                </View>
              </View>

              {
                this.state.expanded && (<View style={styles.row}>
                  {this.props.children}
                  <View style={styles.smallerBlock}>
                    <Text style={styles.date}> </Text>
                  </View>
                  <View style={styles.bigBlock}>
                    <Text style={styles.subTitle}>Meeting with Coach</Text>
                    <Text style={styles.subText}>Wed 12/26/18 2:00pm</Text>
                    <Text style={styles.subText}>CVOEO Office</Text>
                    <Text style={styles.subText}></Text>
                  </View>
                  <View style={styles.smallBlock}>
                    <Text style={styles.circle}>9</Text>
                    <Text style={styles.days}>days</Text>
                  </View>
                </View>)
              }

            </View>
          </View>
          <View style={styles.padding}>
            <View style={styles.progressBox}>
              <View style={styles.spaceRow}>
                <Text style={[styles.bigTitle, styles.bigLetters]}>$150</Text>
                <Text style={styles.bigBlock}></Text>
                <Text style={styles.bigTitle}>Well Done!</Text>
              </View>
              <View style={styles.row}>
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
                      name={icon}
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
              <View style={styles.row}>
                <View style={styles.smallerBlock}>
                  <Text style={styles.date}> </Text>
                </View>
                <View style={styles.biggerBlock}>
                  <Text style={styles.subTitle}>Attend "Spend Smart 2/2" Workshop</Text>
                  <Text style={styles.subText}>some important detail</Text>
                </View>
              </View>
              <View style={styles.moreButton}>
                <View style={styles.row}>
                  <Text style={styles.moreButton}></Text>
                  <TouchableHighlight
                    style={styles.dashButton}
                    onPress={this.toggle.bind(this)}
                    underlayColor="#fff">
                    <Icon
                      style={styles.FAIcon}
                      name={icon}
                    />
                  </TouchableHighlight>
                </View>
              </View>

              {
                this.state.expanded && (<View style={styles.row}>
                  {this.props.children}
                  <View style={styles.smallerBlock}>
                    <Text style={styles.date}> </Text>
                  </View>
                  <View style={styles.biggerBlock}>
                    <Text style={styles.subTitle}>Pay down past due bills</Text>
                    <Text style={styles.subText}> </Text>
                    <Text style={styles.subTitle}>Attend "Keys To Credit" workshop</Text>
                    <Text style={styles.subText}> </Text>
                  </View>
                </View>)
              }

            </View>
          </View>
          <View style={styles.padding}>
            <View style={styles.completedBox}>
              <Text style={[styles.blockTitle, styles.completedTitle]}>COMPLETED:</Text>
              <View style={styles.row}>
                <View style={styles.smallerBlock}>
                  <Text style={styles.date}> </Text>
                </View>
                <View style={styles.biggerBlock}>
                  <Text style={styles.subTitle}>Open matched savings account</Text>
                  <Text style={styles.subText}>some important detail</Text>
                </View>
              </View>
              <View style={styles.moreButton}>
                <View style={styles.row}>
                  <Text style={styles.moreButton}></Text>
                  <TouchableHighlight
                    style={styles.dashButton}
                    onPress={this.toggle.bind(this)}
                    underlayColor="#fff">
                    <Icon
                      style={styles.FAIcon}
                      name={icon}
                    />
                  </TouchableHighlight>
                </View>
              </View>

              {
                this.state.expanded && (<View style={styles.row}>
                  {this.props.children}
                  <View style={styles.smallerBlock}>
                    <Text style={styles.date}> </Text>
                  </View>
                  <View style={styles.biggerBlock}>
                    <Text style={styles.subTitle}>Attended "Spend Smart 1/2" Workshop</Text>
                    <Text style={styles.subText}> </Text>
                  </View>
                </View>)
              }

            </View>
          </View>
          <View style={styles.padding}>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ session: state.login.session });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
