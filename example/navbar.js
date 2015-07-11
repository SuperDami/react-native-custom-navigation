'use strict';

var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;

var screen = require('Dimensions').get('window');
var NavbarContent = React.createClass({
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={[styles.corner, styles.leftCorner]}>
          <TouchableHighlight onPress={this.props.goBack} underlayColor="transparent">
            <View style={styles.backView}>
              <Text style={styles.buttonText}>{'<'}</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={[styles.corner, styles.rightCorner]}>
          <TouchableHighlight onPress={this.props.goFoward} underlayColor="transparent">
            <View style={styles.backView}>
              <Text style={styles.buttonText}>{'>'}</Text>
            </View>
          </TouchableHighlight>
        </View>

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

  buttonText: {
    fontSize: 32,
    color: '#111',
    textAlign: 'center',
  },

  corner: {
    top: 20,
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
  },

  leftCorner: {
    left:0,
  },

  rightCorner: {
    right:0,
  },

  backView: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  }
});

module.exports = NavbarContent;