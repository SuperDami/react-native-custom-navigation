'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var NavbarBackground = React.createClass({
  mixins: [TimerMixin],

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
    this.props.route.updateBarBackgroundStyle = this._updateBarBackgroundStyle;
    this._initState(false);
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.route !== this.props.route) {
      this._initState(!this.props.willDisappear);
      if (!this.props.willDisappear) {
        newProps.route.updateBarBackgroundStyle = this._updateBarBackgroundStyle;
      }
    }

    this.state.progress = newProps.progress;
  },

  _updateBarBackgroundStyle: function(style) {
    this.props.route.barBackgroundStyle = style;
    this.setTimeout(this.forceUpdate, 0);
  },

  render() {
    var opacity = (this.state.opacityEnd - this.state.opacityStart) * this.state.progress + this.state.opacityStart;
    var transitionStyle = {
      opacity: opacity,
    };

    return (
      <View style={[this.props.style, transitionStyle, this.props.route.barBackgroundStyle]} />
    );
  }
});

var screen = require('Dimensions').get('window');
var NavBarContent = React.createClass({
  mixins: [TimerMixin],

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

  componentWillMount: function() {
    this._initState(1, false);
    this.props.route.updateNavbarProps = this._updateNavbarProps;
  },

  componentWillReceiveProps: function(newProps) {
    if (this.props.route !== newProps.route) {
      this._initState(newProps.direction, !this.props.willDisappear);
      if (!newProps.willDisappear) {
        newProps.route.updateNavbarProps = this._updateNavbarProps;
      }
    }
  },

  _updateNavbarProps: function(props) {
    this.props.route.navbarProps = props;
    this.setTimeout(this.forceUpdate, 0);
  },

  render() {
    var left = (this.state.leftEnd - this.state.leftStart) * this.props.progress + this.state.leftStart;
    var opacity = (this.state.opacityEnd - this.state.opacityStart) * this.props.progress + this.state.opacityStart;

    var transitionStyle = {
      position: 'absolute',
      opacity: opacity,
      left: left
    };

    var mainContent;
    if (this.props.route.navbarComponent) {
      var navbarProps = this.props.route.navbarProps ? this.props.route.navbarProps : this.props.route.navbarPassProps
      var NavbarComponent = this.props.route.navbarComponent;
      mainContent = (
        <NavbarComponent
          route={{
            index: this.props.route.index,
            push: this.props.goForward,
            pop: this.props.goBack,
            popToTop: this.props.goFirst
          }}
          {...navbarProps}/>
        );
    } else {
      var leftCorner;
      var leftCornerContent;
      var BackButton = this.props.backButtonComponent

      if (this.props.route.index > 0 && BackButton) {
        leftCornerContent = (
          <TouchableHighlight onPress={this.props.goBack} underlayColor="transparent">
            <View style={styles.backView}>
              <BackButton />
            </View>
          </TouchableHighlight>);
      }

      leftCorner = (
        <View
          key='nav-back'
          style={[styles.corner, styles.alignLeft]}>
          {leftCornerContent}
        </View>
      );

      mainContent = [leftCorner];
        if (this.props.route.title) {
          mainContent.push(
            <Text
              key='nav-title'
              style={[styles.title, this.props.route.titleStyle]}
              numberOfLines={1}>{this.props.route.title}</Text>
        );
      }
    }

    return (
      <View style={[styles.navbar, transitionStyle]}>
        {mainContent}
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
