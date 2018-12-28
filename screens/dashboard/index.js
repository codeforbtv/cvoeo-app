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
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerItems } from 'react-navigation';

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
                  <Text style={styles.circle}>3</Text>
                  <Text style={styles.days}>days</Text>
                </View>
              </View>

              {
                this.state.expanded1 && (<View style={styles.row}>
                  {this.props.children}
                  <View style={styles.smallerBlock}>
                    <Text style={styles.date}> </Text>
                  </View>
                  <View style={styles.bigBlock}>
                    <Text style={styles.subTitle}>Spend Smart 2/2 Workshop</Text>
                    <Text style={styles.subText}>Thu 01/04/19 8:00am</Text>
                    <Text style={styles.subText}>library</Text>
                    <Text style={styles.subText}></Text>
                  </View>
                  <View style={styles.smallBlock}>
                    <Text style={styles.circle}>2</Text>
                    <Text style={styles.days}>weeks</Text>
                  </View>
                </View>)
              }

              <View style={styles.moreButton}>
                <View style={styles.row}>
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
              <View style={styles.row}>
                <View style={styles.smallerBlock}>
                  <Text style={styles.date}> </Text>
                </View>
                <View style={styles.biggerBlock}>
                  <Text style={styles.subTitle}>Attend "Spend Smart 2/2" Workshop</Text>
                  <Text style={styles.subText}>some important detail</Text>
                </View>
              </View>

              {
                this.state.expanded2 && (<View style={styles.row}>
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

              <View style={styles.moreButton}>
                <View style={styles.row}>
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
              <View style={styles.row}>
                <View style={styles.smallerBlock}>
                  <Text style={styles.date}> </Text>
                </View>
                <View style={styles.biggerBlock}>
                  <Text style={styles.subTitle}>Open matched savings account</Text>
                  <Text style={styles.subText}>some important detail</Text>
                </View>
              </View>

              {
                this.state.expanded3 && (<View style={styles.row}>
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

              <View style={styles.moreButton}>
                <View style={styles.row}>
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

const mapStateToProps = (state) => ({ session: state.login.session });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
