// @flow
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import commonStyles from '../styles/common';

type Props = {message: Array<string>};

const styles = StyleSheet.create(commonStyles);

const GoalMessageBox = ({message}: Props) => (
    <View style={styles.dashRow}>
        <View style={styles.smallerBlock}>
            <Text style={styles.date}/>
        </View>
        <View style={styles.biggerBlock}>
            <Text style={styles.subTitle}>{message[0] || ''}</Text>
            <Text style={styles.subText}>{message[1] || ''}</Text>
        </View>
    </View>
);

export default GoalMessageBox;