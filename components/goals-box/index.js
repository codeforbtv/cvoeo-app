// @flow
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import ExpandButton from '../expand-button';
import CollapseButton from '../collapse-button';
import myStyles from './styles';
import commonStyles from '../../styles/common';
import type { Node } from 'react';
import * as R from 'ramda';

type Props = { children: Node, onExpand: () => void, title: string, showExpandButton: boolean };

const styles = StyleSheet.create({ ...commonStyles, ...myStyles });

const GoalsBox = ({ children, title, onExpand, showExpandButton }: Props) => {
    const [isExpanded, setExpanded] = useState(false);
    const getContent = R.compose(
        R.slice(0, -1),
        R.flatten,
        R.map((child, i) => [child, (<View key={i} style={styles.hr} />)]),
        R.filter(child => Boolean(child)),
        R.flatten,
        Array.from);

    return (
        <View style={styles.goalsBox}>
            <Text style={styles.goalsTitle}>{title}</Text>
            {getContent(children)}
            {showExpandButton && (
                <TouchableHighlight
                    style={styles.expandButton}
                    onPress={() => {
                        onExpand(!isExpanded);
                        setExpanded(!isExpanded);
                    }}
                    underlayColor='transparent'>
                    {isExpanded ? (<CollapseButton size={40} />) : (<ExpandButton size={40} />)}
                </TouchableHighlight>
            )}
        </View>
    );
};

export default GoalsBox;