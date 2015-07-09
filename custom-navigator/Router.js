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

  customAction: function(opts) {
    this.props.customAction(opts);
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

    var customAction = function(opts) {
      this.customAction(opts);
    }.bind(this);

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

    var Content = route.component;

    return (
      <View
        style={[styles.container, this.props.bgStyle]}
        onStartShouldSetResponder={didStartDrag}
        onResponderMove={didMoveFinger}
        onResponderTerminationRequest={preventDefault}>
        <Content
          route={{
            index:route.index,
            push:goForward,
            pop:goBackwards,
            popToTop:goToFirstRoute,
            updateNavbarStyle:(style)=>{
              route.updateNavbarStyle &&
                route.updateNavbarStyle(style)
            }
          }}
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
        currentRoute={this.state.route}
        backButtonComponent={this.props.backButtonComponent}
        toRoute={this.onForward}
        toBack={this.onBack}/>

    var initialRoute = this.props.initialRoute;
    initialRoute.index = 0;
    return (
      <Navigator
        initialRoute={initialRoute}
        navigationBar={navigationBar}
        renderScene={this.renderScene}
        onDidFocus={this.onDidFocus}
      />
    )
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});


module.exports = Router;