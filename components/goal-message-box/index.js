// @flow
import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import type Goal from '../../models/goal';
import {daysTo} from '../../libs/date-helpers';
import moment from 'moment';
import {isValidDate} from '../../libs/validators';
import myStyles from './styles';

type Props = { message: Array<string>, goal: Goal, gotoDetails: ()=> void };

const styles = StyleSheet.create(myStyles);

const GoalMessageBox = ({message, goal, gotoDetails}: Props) => (
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
            <View style={{flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between'}} >
                    <TouchableHighlight
                        onPress={gotoDetails}
                        style={[styles.goalButton,{alignSelf: 'left'}]}
                    >
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Icon style={styles.goalButtonIcon} name={'user-clock'}/>
                            <Text style={styles.goalButtonText}>
                                {goal.snoozed ? daysTo(goal.remind) : 'paused'}
                            </Text>
                            <Icon name={'chevron-down'} style={styles.goalButtonIcon}/>
                        </View>
                    </TouchableHighlight>
                <View style={{alignSelf: 'right'}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text>{goal.submittedForReview ? 'Submitted' : 'Submit?'}</Text>
                        <TouchableHighlight
                            onPress={() => (void 0)}
                            style={styles.goalButton}
                        >
                            <Icon
                                style={styles.goalButtonIcon}
                                name={goal.submittedForReview ? 'circle-check' : 'circle'}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )}
    </View>
);

export default GoalMessageBox;