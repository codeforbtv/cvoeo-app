import React from 'react';
import commonStyles from '../../../styles/common';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View  } from 'react-native';
const styles = StyleSheet.create(commonStyles);

export class GoalDetail extends React.Component{

    static propTypes = {
        goal: PropTypes.object
    }

    render() {
        return <View style={styles.dashRow}>  
            <Text style={styles.subTitle}>{this.props.goal.title || ''}</Text>
        </View>
    }
   
}