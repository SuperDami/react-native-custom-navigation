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

  goBack: function() {
    this.props.toBack(this.props.navigator);
  },

  goForward: function(route) {
    this.props.toRoute(route, this.props.navigator);
  },

  customAction: function(opts) {
    this.props.customAction(opts);
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
          direction={this.state.currentRoute.index - this.state.previousRoute.index}
          backButtonComponent={this.props.backButtonComponent}
          goBack={this.goBack}
          goForward={this.goForward}/>);

      previousContent = (
        <NavBarContent
          {...previousProps}
          direction={this.state.currentRoute.index - this.state.previousRoute.index}
          backButtonComponent={this.props.backButtonComponent}
          goBack={this.goBack}
          goForward={this.goForward}/>);

    } else if (this.state.currentRoute){
      currentBackground = (
        <NavbarBackground
          {...currentProps}
          style={styles.background}/>);

      currentContent = (
        <NavBarContent
          {...currentProps}
          direction={0}
          backButtonComponent={this.props.backButtonComponent}
          goBack={this.goBack}
          goForward={this.goForward}/>);
    }

    var fromIndex = this.state.previousRoute ? this.state.previousRoute.index : null;
    var toIndex = this.state.currentRoute ? this.state.currentRoute.index : null;

    var navbar = this.props.navbarComponent ? (
      <View style={styles.navbar}>
        <this.props.navbarComponent
          progress={this.state.progress}
          fromIndex={fromIndex}
          toIndex={toIndex}/>
      </View>
      ) : null;

    return (
      <View style={[styles.navbarContainer, this.props.style]}>
        {previousBackground}
        {currentBackground}
        {navbar}
        {previousContent}
        {currentContent}
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
