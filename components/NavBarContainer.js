'use strict';

var React = require('react-native');

var NavBarContent = require('./NavBarContent').NavBarContent;
var NavbarBackground = require('./NavBarContent').NavbarBackground;
var StaticNavBarContent = require('./StaticNavBarContent');

var {
  StyleSheet,
  View
} = React;

var NavBarContainer = React.createClass({

  getInitialState: function() {
    return {};
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

  _goBack: function() {
    this.props.onBack(this.props.navigator);
  },

  _goForward: function(route) {
    this.props.onForward(route, this.props.navigator);
  },

  _goFirst: function() {
    this.props.onFirst(this.props.navigator);
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

    var currentProps = {
      progress:this.state.progress,
      route:this.state.currentRoute,
    };

    var previousProps = {
      progress:this.state.progress,
      route:this.state.previousRoute,
      willDisappear:true
    };

    var navigatorProps = {
      goForward: this._goForward,
      goBack: this._goBack,
      goFirst: this._goFirst
    };

    var previousContent, currentContent;
    var previousBackground, currentBackground;
    if (this.state.previousRoute) {
      previousBackground = (
        <NavbarBackground
          {...previousProps}
          style={styles.background}/>);

      currentBackground = (
        <NavbarBackground
          {...currentProps}
          style={styles.background}/>);

      currentContent = (
        <NavBarContent
          {...currentProps}
          {...navigatorProps}
          direction={this.state.currentRoute.index - this.state.previousRoute.index}
          backButtonComponent={this.props.backButtonComponent}/>);

      previousContent = (
        <NavBarContent
          {...previousProps}
          {...navigatorProps}
          direction={this.state.currentRoute.index - this.state.previousRoute.index}
          backButtonComponent={this.props.backButtonComponent}/>);

    } else if (this.state.currentRoute){
      currentBackground = (
        <NavbarBackground
          {...currentProps}
          style={styles.background}/>);

      currentContent = (
        <NavBarContent
          {...currentProps}
          {...navigatorProps}
          direction={0}
          backButtonComponent={this.props.backButtonComponent}/>);
    }

    var staticContent;
    if (this.props.navbarComponent) {
      staticContent = (
        <StaticNavBarContent
          previousRoute={this.state.previousRoute}
          currentRoute={this.state.currentRoute}
          progress={this.state.progress}
          navbarComponent={this.props.navbarComponent}
          navbarPassProps={this.props.navbarPassProps}
          {...navigatorProps}/>
        )
    }

    var navbarContents = [staticContent, previousContent, currentContent];

    return (
      <View style={[styles.navbarContainer, this.props.style]}>
        {previousBackground}
        {currentBackground}
        {navbarContents}
      </View>
    )
  }
});


var styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 64,
    justifyContent: 'center',
    flexDirection: 'row',
  },

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
