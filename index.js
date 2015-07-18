'use strict';

var React = require('react-native');

var NavBarContainer = require('./components/NavBarContainer');

var {
  StyleSheet,
  Navigator,
  StatusBarIOS,
  View,
} = React;

var self;
var Router = React.createClass({

  getInitialState: function() {
    self = this;
    return {
      route: null,
      dragStartX: null,
      didSwitchView: null,
    };
  },

  /*
   * This changes the title in the navigation bar
   * It should preferrably be called for "onWillFocus" instad >
   * > but a recent update to React Native seems to break the animation
   */
  onDidFocus: function(route) {
    this.setState({ route: route });
  },

  onBack: function(navigator) {
    if (this.state.route.index > 0) {
      navigator.pop();
    }
  },

  onForward: function(route, navigator) {
    route.index = this.state.route.index + 1 || 1;
    navigator.push(route);
  },

  onFirst: function(navigator) {
    navigator.popToTop();
  },

  renderScene: function(route, navigator) {
    var goForward = function(route) {
      route.index = this.state.route.index + 1 || 1;
      navigator.push(route);
    }.bind(this);

    var goBackwards = function() {
      this.onBack(navigator);
    }.bind(this);

    var goToFirstRoute = function() {
      navigator.popToTop();
    };

    var didStartDrag = function(evt) {
      var x = evt.nativeEvent.pageX;
      if (x < 28) {
        this.setState({
          dragStartX: x,
          didSwitchView: false
        });
        return true;
      }
    }.bind(this);

    // Recognize swipe back gesture for navigation
    var didMoveFinger = function(evt) {
      var draggedAway = ((evt.nativeEvent.pageX - this.state.dragStartX) > 30);
      if (!this.state.didSwitchView && draggedAway) {
        this.onBack(navigator);
        this.setState({ didSwitchView: true });
      }
    }.bind(this);

    // Set to false to prevent iOS from hijacking the responder
    var preventDefault = function(evt) {
      return true;
    };

    var updateNavbarProps = function(props) {
      route.updateNavbarProps && route.updateNavbarProps(props);
      route.updateStaticNavbarProps && route.updateStaticNavbarProps(props);
    }

    var Content = route.component;
    return (
      <View
        style={[styles.container]}
        onStartShouldSetResponder={didStartDrag}
        onResponderMove={didMoveFinger}
        onResponderTerminationRequest={preventDefault}>
        <Content
          route={{
            index:route.index,
            push:goForward,
            pop:goBackwards,
            popToTop:goToFirstRoute,
          }}
          updateBarBackgroundStyle={
            (style)=>{
              route.updateBarBackgroundStyle &&
                route.updateBarBackgroundStyle(style)
            }
          }
          updateNavbarProps={updateNavbarProps}
          {...route.passProps}/>
      </View>
    )

  },

  render: function() {

    // Status bar color
    if (this.props.statusBarColor === "black") {
      StatusBarIOS.setStyle(0);
    } else {
      StatusBarIOS.setStyle(1);
    }

    var navigationBar =
      <NavBarContainer
        navbarComponent={this.props.navbarComponent}
        navbarPassProps={this.props.navbarPassProps}
        currentRoute={this.state.route}
        backButtonComponent={this.props.backButtonComponent}
        onForward={this.onForward}
        onBack={this.onBack}
        onFirst={this.onFirst}/>

    var initialRoute = this.props.initialRoute;
    initialRoute.index = 0;
    return (
      <Navigator
        initialRoute={initialRoute}
        navigationBar={navigationBar}
        renderScene={this.renderScene}
        onDidFocus={this.onDidFocus}/>)
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


module.exports = Router;