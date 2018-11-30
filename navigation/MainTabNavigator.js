import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated }
  from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.icons = {
      'open': 'angle-down',
      'close': 'angle-up'
    };

    this.state = { expanded: false };
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
                    style={styles.button}
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
                    style={styles.button}
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
                    style={styles.button}
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
                    <Text style={styles.subTitle}>Attended first workshop</Text>
                    <Text style={styles.subText}> </Text>
                  </View>
                </View>)
              }

            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
  },
  title: {
    backgroundColor: '#467',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 35,
    paddingBottom: 15,
    alignSelf: 'stretch',
    textAlign: 'center',
    fontFamily: 'System',
  },
  padding: {
    padding: 10,
    paddingBottom: 0,
  },
  upcomingBox: {
    flex: 1,
    backgroundColor: '#fffae1',
    alignItems: 'center',
    borderRadius: 2,
  },
  progressBox: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    borderRadius: 2,
  },
  goalsBox: {
    flex: 1,
    backgroundColor: '#d4e5de',
    alignItems: 'center',
    borderRadius: 2,
  },
  completedBox: {
    flex: 1,
    backgroundColor: '#b1e1f5',
    alignItems: 'center',
    borderRadius: 2,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  bigBlock: {
    backgroundColor: 'transparent',
    flex: 5,
    alignItems: 'center',
    padding: 2,
  },
  biggerBlock: {
    backgroundColor: 'transparent',
    flex: 9,
    alignItems: 'center',
    padding: 2,
  },
  smallBlock: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 3,
    alignItems: 'flex-start',
  },
  smallerBlock: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  blockTitle: {
    alignItems: 'flex-start',
    color: 'rgba(2,2,2,0.34)',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 6,
    paddingLeft: 7,
    paddingBottom: 5,
    alignSelf: 'stretch',
    textAlign: 'left',
    fontFamily: 'System',
  },
  upcomingTitle: {
    color: '#a8b144',
  },
  goalsTitle: {
    color: '#839f8f',
  },
  completedTitle: {
    color: '#446479',
  },
  subTitle: {
    alignItems: 'center',
    color: '#d51',
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 1,
    alignSelf: 'stretch',
    textAlign: 'left',
    fontFamily: 'System',
  },
  subText: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    color: '#555',
    fontSize: 16,
    alignSelf: 'stretch',
    textAlign: 'left',
    fontFamily: 'System',
  },
  days: {
    alignSelf: 'flex-end',
    color: '#aaa',
    fontSize: 14,
    paddingBottom: 1,
    paddingLeft: 2,
    textAlign: 'center',
    fontFamily: 'System',
  },
  spaceRow: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bigTitle: {
    color: '#356',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 7,
    fontFamily: 'System',
  },
  bigLetters: {
    fontSize: 40,
  },
  FAIcon: {
    alignItems: 'flex-end',
    color: 'rgba(2,2,2,0.3)',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(50,50,50,0.2)',
    width: 28,
    height: 28,
    borderTopLeftRadius: 14,
    textAlign: 'center',
    paddingTop: 5,
    paddingLeft: 2,
  },
  button: {
    backgroundColor: 'transparent',
  },
  moreButton: {
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    paddingTop: 3,
    alignSelf: 'stretch',
  },
  circle: {
    backgroundColor: '#ffa07a',
    color: '#fff8c7',
    fontSize: 22,
    width: 40,
    height: 40,
    borderRadius: 20,
    textAlign: 'center',
    paddingTop: 4,
    fontFamily: 'System',
  },
  bigCircle: {
    backgroundColor: 'transparent',
    color: '#d4af37',
    fontSize: 60,
    textShadowColor: 'rgba(8, 6, 3, 0.75)',
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 10,
    paddingTop: 45,
    width: 180,
    height: 180,
    borderWidth: 6,
    borderColor: '#d4af37',
    borderRadius: 90,
    textAlign: 'center',
  },
  money: {
    flex: 1,
    color: '#446479',
    fontWeight: 'bold',
    },
    start: {
      alignSelf: 'flex-start'
    },
    end: {
      alignSelf: 'flex-end'
    },
      diagonalLine: {
    position: 'absolute',
    bottom: -45,
    left: -8,
    backgroundColor: 'rgba(215,210,160, 0.0)',
    width: 80,
    height: 130,
    borderRightWidth: 2,
    borderColor: '#000',
    transform: [{ rotate: '-45deg' }],
  },
  arrow: {
    fontSize: 22,
    transform: [{ rotate: '135deg' }],
    position: 'absolute',
    top: -1,
    left: 7,
  },
  cone: {
    width: 0,
    height:0,
    borderLeftWidth: 45,
    borderLeftColor: 'transparent',
    borderRightWidth: 44,
    borderRightColor: 'transparent',
    borderTopWidth: 101,
    borderTopColor: 'rgba(215,210,160, 0.5)',
    transform: [{ rotate: '-67.5deg' }],
    position: 'absolute',
    bottom: -19,
    left: 25.5,
    zIndex: 0,
  },
  bottomLine: {
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'rgba(0,0,0,0.0)',
    width: 235,
    paddingBottom: 10,
  },
  semiCircle: {
    flex: 10,
    backgroundColor: 'transparent',
    width: 220,
    height: 110,
    borderWidth: 7,
    borderBottomWidth: 0,
    borderColor: '#ffa07a',
    borderTopLeftRadius: 110,
    borderTopRightRadius: 110,
    alignItems: 'center',
    zIndex: 1,
  },
});
