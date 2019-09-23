import React, { Component } from "React";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Image,
  Alert,
  StyleSheet
} from "react-native";

// TODO modal doesnt need to be statefull
// TODO completing a goal should triger the modal but only once
export default class CongratulationsModal extends Component<{}> {
  state = {
    isModalVisible: this.props.visibility
  };

  setModalVisible(visible) {
    this.setState({ isModalVisible: visible });
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Modal
            animationType="slide" 
            visible={this.state.isModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.modal}>
              <Image
                source={require("../../assets/images/pig_party.gif")}
                style={styles.gifImage}
                resizeMode="contain"
              />
              <Text>{`${this.props.visibility}`}</Text>
              <Text style={styles.header}>Congratulations!</Text>
              <Text style={styles.goalText}>{this.props.goal}</Text>
              <View style={styles.footer}>
              <View style={styles.line}></View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.isModalVisible);
                }}
              >
                <Text style={styles.exit}>Got it</Text>
              </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

//TODO move to a styles.js for consistency 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gifImage: {
     width: '100%',
  },
  modal: {
    flex: 1,
    alignItems: "center",
  },
  header:{
    flex: 1,
    fontSize: 30,
    color: '#DC552B',
    padding: 10
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
    color: "#3f2949"
  }
});
