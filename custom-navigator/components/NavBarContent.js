'use strict';

var React = require('react-native');

var NavButton = require('./NavButton');

var time = 200;
var {
  StyleSheet,
  Text,
  View
} = React;

var NavbarBackground = React.createClass({
  getInitialState: function() {
    return {};
  },

  _initState: function(fadeIn) {
    var state = {};
    state.opacityStart = fadeIn ? 0 : 1;
    state.opacityEnd = fadeIn ? 1 : 0;
    state.progress = 0;
    this.state = state;
  },

  componentWillMount: function() {
    this.props.route.updateNavbarStyle = this._updateNavbarStyle;
    this._initState(false);
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.route !== this.props.route) {
      this._initState(!this.props.willDisappear);
      if (!this.props.willDisappear) {
        newProps.route.updateNavbarStyle = this._updateNavbarStyle;
      }
    }

    this.state.progress = newProps.progress;
  },

  _updateNavbarStyle: function(style) {
    this.props.route.style = style;
    this.setState({
      currentStyle: style,
    });
  },

  render() {
    var opacity = (this.state.opacityEnd - this.state.opacityStart) * this.state.progress + this.state.opacityStart;
    var transitionStyle = {
      opacity: opacity,
    };

    var currentStyle = this.state.currentStyle;
    var savedStyle = this.props.route.style;
    return (
      <View style={[this.props.style, currentStyle, savedStyle, transitionStyle]}>
      </View>
    );
  }
});

var screen = require('Dimensions').get('window');
var NavBarContent = React.createClass({

  getInitialState: function() {
    return {};
  },

  _initState: function(actionDirection, fadeIn) {
    var state = {};
    state.opacityStart = fadeIn ? 0 : 1;
    state.opacityEnd = fadeIn ? 1 : 0;

    if (actionDirection === 'left') {
      state.leftStart = fadeIn ? screen.width : 0;
      state.leftEnd = fadeIn ? 0 : -screen.width;
    } else {
      state.leftStart = fadeIn ? -screen.width : 0;
      state.leftEnd = fadeIn ? 0: screen.width;
    }
    this.state = state;
  },

  componentDidMount: function() {
    this._initState('left', false);
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.route !== this.props.route) {
      if ((newProps.route.index > this.props.route.index) || !this.props.route.index ) {
        if (this.props.willDisappear) {
          this._initState('right', false);
        } else {
          this._initState('left', true);
        }
      } else {
        if (this.props.willDisappear) {
          this._initState('left', false);
        } else {
          this._initState('right', true);
        }
      }
    }
  },

  goBack: function() {
    if (!this.props.willDisappear) {
      this.props.goBack();
    }
  },

  goForward: function(route) {
    this.props.goForward(route);
  },

  customAction: function(opts) {
    this.props.customAction(opts);
  },

  render() {
    var left = (this.state.leftEnd - this.state.leftStart) * this.props.progress + this.state.leftStart;
    var opacity = (this.state.opacityEnd - this.state.opacityStart) * this.props.progress + this.state.opacityStart;

    var transitionStyle = {
      opacity: opacity,
      left: left
    };

    var leftCorner;
    var rightCorner;
    var titleComponent;

    var leftCornerContent;
    if (this.props.route.index > 0) {
      leftCornerContent = <NavButton onPress={this.goBack} backButtonComponent={this.props.backButtonComponent} />;
    }

    leftCorner = (
      <View style={[styles.corner, styles.alignLeft]}>
        {leftCornerContent}
      </View>
    );

    var mainContent;
    if (this.props.route.navbarComponent) {
      mainContent = this.props.route.navbarComponent;
    }

    return (
      <View style={[styles.navbar, this.props.route.headerStyle, transitionStyle]}>
        <View>
          {mainContent}
        </View>
        {leftCorner}
      </View>
    );
  }
});


var styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 64, // Default iOS navbar height
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  corner: {
    flex: 1,
    left:0,
    top: 18,
    position: 'absolute',
    justifyContent: 'center',
  },
  alignLeft: {
    alignItems: 'flex-start'
  },
});


module.exports = {
  NavBarContent: NavBarContent,
  NavbarBackground: NavbarBackground,
};
