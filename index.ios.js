/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Navigator = require('./custom-navigator/Router');
var Demo = require('./reactComponents/demo');

var {
  AppRegistry,
  View
} = React;

var RootController = React.createClass({
  render() {
    return (
      <Navigator
        initialRoute={{
          component: Demo,
          title: 'root'
        }}/>);
  }
});

AppRegistry.registerComponent('ReactTest', () => RootController);