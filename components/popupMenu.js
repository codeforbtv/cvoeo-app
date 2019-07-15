//import react in our code.
import React, { Component } from 'react';
//import all the components we are going to use.
import { View, TouchableHighlight, StyleSheet, Image } from 'react-native';
//import menu and menu item
import Menu, { MenuItem } from 'react-native-material-menu';

//import icons + styling
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../styles/common';
const styles = StyleSheet.create(commonStyles);

export default class PopupMenu extends Component {
  constructor(props) {
    super(props);
    this.icons = {
      'dots': 'ellipsis-v',
    };
  }

  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  option1Click = () => {
    this._menu.hide();
    this.props.option1Click();
  };
  render() {
    let dots = this.icons['dots'];
    return (
      <View style={[styles.title, styles.dots]}>
        <Menu
          ref={this.setMenuRef}
          button={
          <TouchableHighlight onPress={this.showMenu} underlayColor='transparent'>
            <Icon
              name={dots}
              style={{color: '#000', fontSize: 20, textAlign: "center"}}
            />
           </TouchableHighlight>
          }>
          <MenuItem onPress={this.option1Click}>{this.props.label}</MenuItem>
        </Menu>
      </View>
    );
  }
}