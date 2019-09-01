<<<<<<< HEAD
// @flow
import React, {Fragment} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
=======
import React from 'react';
>>>>>>> master
import commonStyles from '../styles/common';
import PropTypes from 'prop-types';
import {
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    View  } from 'react-native';
import moment from 'moment';
const styles = StyleSheet.create(commonStyles);

<<<<<<< HEAD
type Props = { message: Array<string>, gotoDetails: ()=> void };
=======
export class GoalMessageBox extends React.Component{
>>>>>>> master

    static propTypes = {
        goal: PropTypes.object.isRequired,
        showDetails: PropTypes.func
    }

<<<<<<< HEAD
const GoalMessageBox = ({message, gotoDetails}: Props) => (
    <TouchableHighlight
        onPress={gotoDetails}
        style={styles.dashRow}
    >
        <Fragment>
            <View style={styles.smallerBlock}>
                <Text style={styles.date}/>
            </View>
            <View style={styles.biggerBlock}>
                <Text style={styles.subTitle}>{message[0] || ''}</Text>
                <Text style={styles.subText}>{message[1] || ''}</Text>
            </View>
        </Fragment>
    </TouchableHighlight>
);
=======
    getRelativeDate(seconds) {
        const goalDate = moment(new Date((seconds) * 1000));
        return goalDate.fromNow();
    }

    openGoalDetails() {
        if (this.props.showDetails) {
            this.props.showDetails(this.props.goal);
        }
    }
>>>>>>> master

    render() {
        return <View style={styles.dashRow}>  
            <TouchableOpacity onPress={() => this.openGoalDetails()}>
                <View style={styles.biggerBlock}>
                    <Text style={styles.subTitle}>{this.props.goal.title || ''}</Text>
                    <Text style={styles.subText}>{this.props.goal.detail || ''}</Text>
                </View>
                {
                    this.props.goal.goalDate.seconds &&
                    <View style={[styles.smallBlock, styles.goalDateBlock]}>
                        <Image source={require('../assets/images/alarm-clock.png')} style={styles.goalDateIcon}/>
                        <Text>{this.getRelativeDate(this.props.goal.goalDate.seconds)}</Text>
                    </View>
                }
            </TouchableOpacity>
        </View>
    }
    
}