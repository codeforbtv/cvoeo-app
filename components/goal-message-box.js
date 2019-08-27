import React from 'react';
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

export class GoalMessageBox extends React.Component{

    static propTypes = {
        goal: PropTypes.object.isRequired,
        showDetails: PropTypes.func
    }

    getRelativeDate(seconds) {
        const goalDate = moment(new Date((seconds) * 1000));
        return goalDate.fromNow();
    }

    openGoalDetails() {
        if (this.props.showDetails) {
            this.props.showDetails(this.props.goal);
        }
    }

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