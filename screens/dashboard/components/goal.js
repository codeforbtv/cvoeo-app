import React from 'react';
import commonStyles from '../../../styles/common';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View  } from 'react-native';
const styles = StyleSheet.create(commonStyles);

export class Goal extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        detail: PropTypes.string.isRequired,
    }

    //TODO: needs safer key .. perhaps add id value to goal object
    render() {
        return <View style={styles.dashRow}>    
            <View style={styles.smallerBlock}>
                <Text style={styles.date}> </Text>
            </View>
            <View style={styles.biggerBlock}>
                <Text style={styles.subTitle}>{this.props.title || ''}</Text>
                <Text style={styles.subText}>{this.props.detail || ''}</Text>
            </View>
        </View>
    }
}

