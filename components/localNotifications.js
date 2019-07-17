import React, { Component } from 'react';
import { Picker, View } from 'react-native';
import { Constants, Notifications, Permissions } from 'expo';

export default class Timer extends Component {
  onValueChange(e) {

    const localNotification = {
      title: 'Money On My Mind',
      body: `Notification delay: ${e/1000} seconds`
    };

    const schedulingOptions = {
      time: (new Date()).getTime() + Number(e)
    }

    Notifications.scheduleLocalNotificationAsync(
      localNotification, schedulingOptions
    );
  }

  handleNotification() {
    console.warn(`Notification received.`);
  }

  async componentDidMount() {

    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.')
    }

    Notifications.addListener(this.handleNotification);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Picker
          style={{ height: 50, width: 300 }}
          onValueChange={this.onValueChange}>
          <Picker.Item label="Please select notification delay..." value="0" />
          <Picker.Item label="2 seconds" value="2000" />
          <Picker.Item label="5 seconds" value="5000" />
        </Picker>
      </View>
    );
  }
};
