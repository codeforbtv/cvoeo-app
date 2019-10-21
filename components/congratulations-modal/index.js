import React from 'React';
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    Image,
    Alert,
    StyleSheet
} from 'react-native';

// TODO completing a goal should triger the modal but only once
const CongratulationsModal = ({visibility, message, updateGoal, goal}) => (
    <View>
        <View style={styles.container}>
            <Modal
                animationType='slide'
                visible={visibility}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <View style={styles.modal}>
                    <Image
                        source={require('../../assets/images/pig_party.gif')}
                        style={styles.gifImage}
                        resizeMode='contain'
                    />
                    <Text style={styles.header}>Congratulations!</Text>
                    <Text style={styles.goalText}>{message}</Text>
                    <View style={styles.footer}>
                        <View style={styles.line} />
                        <TouchableHighlight
                            onPress={
                                updateGoal({snoozed: false}) // snoozed stand in for congratulationsGiven
                            }
                        >
                            <Text style={styles.exit}>Got it</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    </View>
);

export default CongratulationsModal;

// TODO move to a styles.js for consistency
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gifImage: {
        width: '100%'
    },
    modal: {
        flex: 1,
        alignItems: 'center'
    },
    header:{
        flex: 1,
        fontSize: 30,
        color: '#DC552B',
        padding: 10,
        fontWeight: 'bold',
        fontFamily: 'System'
    },
    footer:{
        flex: 2,
        width: '100%'
    },
    line:{
        paddingTop: 20,
        borderBottomColor: '#eee',
        borderBottomWidth: 2,
        width: '100%'
    },
    exit: {
        fontSize: 24,
        textAlign: 'right',
        color: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    goalText: {
        flex: 1.5,
        fontSize: 24,
        color: '#3f2949',
        textAlign: 'center',
        fontFamily: 'System'
    }
});
