'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
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

  _initState: function(direction, fadeIn) {
    var state = {};
    state.opacityStart = fadeIn ? 0 : 1;
    state.opacityEnd = fadeIn ? 1 : 0;

    if (direction > 0) {
      state.leftStart = fadeIn ? screen.width : 0;
      state.leftEnd = fadeIn ? 0 : -screen.width;
    } else if (direction < 0) {
      state.leftStart = fadeIn ? -screen.width : 0;
      state.leftEnd = fadeIn ? 0: screen.width;
    } else {
      //todo replace
    }
    this.state = state;
  },

  componentDidMount: function() {
    this._initState(1, false);
  },

  componentWillReceiveProps: function(newProps) {
    if (this.props.route != newProps.route) {
      this._initState(newProps.direction, !this.props.willDisappear);
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
      position: 'absolute',
      opacity: opacity,
      left: left
    };

    var leftCorner;

    var leftCornerContent;
    var BackButton = this.props.backButtonComponent

    if (this.props.route.index > 0 && BackButton) {
      leftCornerContent = (
        <TouchableHighlight onPress={this.goBack} underlayColor="transparent">
          <View style={styles.backView}>
            <BackButton />
          </View>
        </TouchableHighlight>);
    }

    leftCorner = (
      <View style={[styles.corner, styles.alignLeft]}>
        {leftCornerContent}
      </View>
    );

    var mainContent;
    if (this.props.route.navbarComponent) {
      mainContent = this.props.route.navbarComponent;
    } else if (this.props.route.title) {
      mainContent = (
        <Text
          style={[styles.title, this.props.route.titleStyle]}
          numberOfLines={1}>{this.props.route.title}</Text>
        )
    }

    return (
      <View style={[styles.navbar, transitionStyle]}>
        {mainContent}
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
    height: 64,
    justifyContent: 'center',
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

  title: {
    position: 'absolute',
    width: screen.width - 100,
    top: 28,
    left: 50,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },

  backView: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  }
});


module.exports = {
  NavBarContent: NavBarContent,
  NavbarBackground: NavbarBackground,
};
