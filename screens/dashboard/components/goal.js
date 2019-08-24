import React from 'react';
import commonStyles from '../../../styles/common';
import PropTypes from 'prop-types';
import {
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    View  } from 'react-native';
const styles = StyleSheet.create(commonStyles);

export class Goal extends React.Component{

    static propTypes = {
        goal: PropTypes.object.isRequired,
        showDetails: PropTypes.func
    }

    openGoalDetails = () => {
        if (this.props.showDetails) {
            this.props.showDetails(this.props.goal);
        }
    }

    render() {
        return <View style={styles.dashRow}>  
            <TouchableOpacity onPress={this.openGoalDetails}>
                <View style={styles.biggerBlock}>
                    <Text style={styles.subTitle}>{this.props.goal.title || ''}</Text>
                    {/* <Text style={styles.subText}>{this.props.goal.detail || ''}</Text> */}
                </View>
                <View style="styles.smallBlock">
                    <Image source={require('../../../assets/images/alarm-clock.png')} style={{width: 50, height: 50}}/>
                    <Text>TODO: add Reminder Date</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
    
}