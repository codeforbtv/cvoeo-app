import React from 'react';
import commonStyles from '../../../styles/common';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View  } from 'react-native';
import moment from 'moment';
const styles = StyleSheet.create(commonStyles);

export const Goal = (props) => {
    return <View style={styles.dashRow}>  
        <View style={styles.smallerBlock}>
            <Text style={styles.date}> </Text>
        </View>  
        <View style={styles.biggerBlock}>
            <Text style={styles.subTitle}>{props.title || ''}</Text>
            <Text style={styles.subText}>{props.detail || ''}</Text>
        </View>
    </View>
}

Goal.propTypes = {
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    goalDate: PropTypes.date
}

