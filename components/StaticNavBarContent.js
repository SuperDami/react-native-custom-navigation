'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var StaticNavBarContent = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      navbarProps: this.props.navbarPassProps
    };
  },

  componentWillMount() {
    this.props.currentRoute &&
      (this.props.currentRoute.updateStaticNavbarProps = this._updateNavbarProps)
  },

  componentWillReceiveProps(newProps) {
    if (this.props.currentRoute !== newProps.currentRoute) {
      newProps.currentRoute.updateStaticNavbarProps = this._updateNavbarProps;
    };
  },

  render() {
    var previousIndex = this.props.previousRoute ? this.props.previousRoute.index : null;
    var index = this.props.currentRoute ? this.props.currentRoute.index : null;

    return (
      <View style={styles.navbar}>
        <this.props.navbarComponent
          route={{
            progress: this.props.progress,
            previousIndex: previousIndex,
            index: index,
            push: this.props.goForward,
            pop: this.props.goBack,
            popToTop: this.props.goFirst
          }}
          {...this.state.navbarProps}/>
      </View>
      );
  },

  _updateNavbarProps(props) {
    this.setTimeout(
      () => {
        this.setState({
          navbarProps: props
        });
      },
      0
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
});

module.exports = StaticNavBarContent;