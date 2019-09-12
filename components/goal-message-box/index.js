// @flow
import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import type Goal from '../../models/goal';
import {daysTo} from '../../libs/date-helpers';
import moment from 'moment';
import {isValidDate} from '../../libs/validators';
import myStyles from './styles';
import * as R from 'ramda';

type Props = { message: Array<string>, goal: Goal, gotoDetails: ()=> void, updateGoal: Object => void };

const styles = StyleSheet.create(myStyles);

const statusIcon = R.cond([
    [goal => Boolean(goal.completed), () => 'check-circle'],
    [goal => Boolean(goal.submittedForReview), () => 'dot-circle'],
    [R.T, () => 'circle']
]);

const status = R.cond([
    [goal => Boolean(goal.completed), () => 'Done!'],
    [goal => Boolean(goal.submittedForReview), () => 'Submitted!'],
    [R.T, () => 'Submit?']
]);

const GoalMessageBox = ({message, goal, gotoDetails, updateGoal}: Props) => (
    <View style={styles.goalMessageBox}>
        <View style={{alignSelf: 'flex-start'}}>
            <Text style={styles.date}>
                {!(goal && isValidDate(goal.goalDate)) ? null : `Due: ${moment(goal.goalDate).format('mm-dd-yyyy')}`}
            </Text>
        </View>
        <View style={{alignSelf: 'flex-start'}}>
            <Text style={styles.goalMessageBoxTitle}>{message[0] || ''}</Text>
            <Text style={styles.goalMessageBoxDetail}>{message[1] || ''}</Text>
        </View>
        {!goal ? null : (
            <View style={{flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                {!goal.completed ? && !goal.submittedForReview (
                    <TouchableHighlight
                        onPress={gotoDetails}
                        style={styles.goalButton}
                    >
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Icon style={styles.goalButtonIcon} name={'user-clock'}/>
                            <Text style={styles.goalButtonText}>
                                {!goal.snoozed ? daysTo(goal.remind) : 'paused'}
                            </Text>
                            <Icon name={'chevron-down'} style={styles.goalButtonIcon}/>
                        </View>
                    </TouchableHighlight>
                ) : <View/>}
                <View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={styles.statusText}>{status(goal)}</Text>
                        <TouchableHighlight
                            onPress={updateGoal({submittedForReview: !goal.submittedForReview})}
                            style={[styles.goalButton, {backgroundColor: '#E4845D', alignSelf: 'stretch'}]}
                        >
                            <Icon
                                style={[styles.goalButtonIcon, {color: 'white'}]}
                                name={statusIcon(goal)}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )}
    </View>
);

export default GoalMessageBox;