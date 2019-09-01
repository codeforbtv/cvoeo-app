// @flow
import React, {Fragment} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import commonStyles from '../styles/common';

type Props = { message: Array<string>, gotoDetails: ()=> void };

const styles = StyleSheet.create(commonStyles);

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

export default GoalMessageBox;