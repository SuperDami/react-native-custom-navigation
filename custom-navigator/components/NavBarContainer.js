'use strict';

var React = require('react-native');

var NavBarContent = require('./NavBarContent').NavBarContent;
var NavbarBackground = require('./NavBarContent').NavbarBackground;

var {
  StyleSheet,
  View
} = React;


var NavBarContainer = React.createClass({

  getInitialState: function() {
    return {
      backButtonOpacity: 0,
    };
  },

  componentWillReceiveProps: function(newProps) {
    if (!this.props.currentRoute || (this.props.currentRoute.index === null)) {
      newProps.currentRoute.index = 0;
    }

    if (newProps.currentRoute === this.props.currentRoute) {
      return;
    }

    this.setState({
      previousRoute: this.props.currentRoute,
      currentRoute: newProps.currentRoute
    });

  },

  goBack: function() {
    this.props.toBack(this.props.navigator);
  },

  goForward: function(route) {
    this.props.toRoute(route, this.props.navigator);
  },

  customAction: function(opts) {
    this.props.customAction(opts);
  },

  handleWillFocus: function(route) {
    // console.log('handle focus: ', route);
    // console.log(this.props.navigator);
    // console.log(this.props.navigator.routeStack);
    // console.log(this.props.navState);
    // console.log(this.props.navState.routeStack);
  },

  _onAnimationChange: function(progress, fromIndex, toIndex) {
    this.setState({
      progress: progress
    });
  },

  onAnimationStart: function(fromIndex, toIndex) {
    var routeStack = this.props.navState.routeStack;
    var fromRoute = routeStack.length > fromIndex ? routeStack[fromIndex] : null;
    var toRoute = routeStack.length > toIndex ? routeStack[toIndex] : null;
    this.state = {
      previousRoute: fromRoute,
      currentRoute: toRoute,
    };

  },

  onAnimationEnd: function() {

  },

  updateProgress: function(progress, fromIndex, toIndex) {
    this._onAnimationChange(progress, fromIndex, toIndex);
  },

  // We render both the current and the previous navbar (for animation)
  render: function() {
    var preBackground = this.state.previousRoute ? (
        <NavbarBackground
          progress={this.state.progress}
          style={styles.background}
          route={this.state.previousRoute}
          willDisappear="true"/>) : null;

    var currentBackground = this.state.currentRoute ? (
        <NavbarBackground
          progress={this.state.progress}
          style={styles.background}
          route={this.state.currentRoute}/>) : null;

    var preNavbarContent = this.state.previousRoute ? (
        <NavBarContent
          progress={this.state.progress}
          route={this.state.previousRoute}
          backButtonComponent={this.props.backButtonComponent}
          willDisappear="true" />) : null;

    var currentNavbarContent = this.state.currentRoute ? (
        <NavBarContent
          progress={this.state.progress}
          route={this.state.currentRoute}
          backButtonComponent={this.props.backButtonComponent}
          goBack={this.goBack}
          goForward={this.goForward}/>) : null;

    return (
      <View style={[styles.navbarContainer, this.props.style]}>
        {preBackground}
        {currentBackground}
        {preNavbarContent}
        {currentNavbarContent}
      </View>
    )
  }
});


var styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
  },
  navbarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: 'rgba(0,0,0,0)'
  }
});


module.exports = NavBarContainer;
