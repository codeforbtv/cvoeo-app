// @flow
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';

import myStyles from './styles';
import commonStyles from '../../styles/common';
import type {Node} from 'react';

type Props = { children: Node, onExpand: ()=> void, title: string };

const styles = StyleSheet.create({...commonStyles, ...myStyles});

const GoalsBox = ({children, title, onExpand}: Props) => {
    const [isExpanded, setExpanded] = useState(false);

    return (
        <View style={styles.goalsBox}>
            <Text style={styles.goalsTitle}>{title}</Text>
            {[...children].reduce((arr, child, i) => [...arr, child, (<View key={i} style={styles.hr}/>)], []).slice(0, -1)}
            <TouchableHighlight
                style={styles.dashButton}
                onPress={() => {
                    onExpand(!isExpanded);
                    setExpanded(!isExpanded);
                }}
                underlayColor='transparent'>
                <Text>X</Text>
            </TouchableHighlight>

        </View>
    );
};

export default GoalsBox;