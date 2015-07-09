'use strict';

var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
} = React;

var screen = require('Dimensions').get('window');
var NavbarContent = React.createClass({
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.titleText}>{this.props.title}</Text>
      </View>
    )
  },
});

var styles = StyleSheet.create({
  container: {
    width: screen.width,
    height: 64,
    justifyContent: 'center',
  },

  titleText: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

module.exports = NavbarContent;