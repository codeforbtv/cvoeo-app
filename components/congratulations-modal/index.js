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
import myStyles from './styles';

const styles = StyleSheet.create(myStyles);

const CongratulationsModal = ({visibility, message, updateGoal, displayName}) => (
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
                    <Text style={styles.header}>{`${displayName}!`}</Text>
                    <Text style={styles.goalText}>{message}</Text>
                    <View style={styles.footer}>
                        <View style={styles.line} />
                        <TouchableHighlight
                            onPress={updateGoal({congratulationsViewed: true})}
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
