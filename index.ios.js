/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Navigator = require('./custom-navigator/Router');
var Demo = require('./reactComponents/demo');

var {
  Text,
  AppRegistry,
  View
} = React;

var BackButton = React.createClass({
  render() {
    return (
        <Text style={{
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 16,
            color: '#fff',
          }}>Back</Text>)
  }
});

var RootController = React.createClass({
  render() {
    return (
      <Navigator
        backButtonComponent={BackButton}
        initialRoute={{
          component: Demo,
          title: 'Root',
        }}/>);
  }
});

AppRegistry.registerComponent('ReactTest', () => RootController);