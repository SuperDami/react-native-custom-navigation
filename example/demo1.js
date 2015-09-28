var React = require('react-native');
var {
	Image,
	View,
  ScrollView,
	StyleSheet,
  Text,
  TouchableHighlight
} = React;

var Router = require('react-native-custom-navigation');

var navbarColors = [
  '#acc7bf',
  '#5e5f67',
  '#c37070',
  '#eae160',
  '#bf7aa3',
  '#b7d967'
];

var NavbarContent = require('./navbar');
var screen = require('Dimensions').get('window');

var BackButton = React.createClass({
  render() {
    return (
        <Text style={{
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 16,
            color: '#fff',
          }}>Back</Text>)
  }
});

var RootController = React.createClass({
  render() {
    return (
      <Router
        backButtonComponent={BackButton}
        initialRoute={{
          component: DemoView,
          title: 'Root',
          titleStyle: {
            color: '#ddd',
            fontSize: 22
          },
        }}/>);
  }
});

var NavbarWrapper = React.createClass({
  getInitialState() {
    return {};
  },

  componentWillMount() {
    this.setState({
      style: this.props.style
    });
  },

  componentWillReceiveProps(newProps) {
    if (newProps.style !== this.props.style) {
      this.setState({
        style: newProps.style
      });
    }
  },

  render() {
    return (
      <NavbarContent
        goFoward = {this._push}
        goBack = {this.props.route.pop}
        style={this.state.style}/>);
  },

  _push() {
    var colorIndex = this.props.route.index % navbarColors.length;
    var color = navbarColors[colorIndex];

    this.props.route.push({
      component: DemoView,
      navbarComponent: NavbarWrapper,
      navbarPassProps: {
        style: {
          backgroundColor: color
        }
      }
    });
  },
});

var DemoView = React.createClass({
	render() {
    var imageUri = 'https://divnil.com/wallpaper/iphone5/img/app/c/l/clear-your-desktop-wallpaper-for-640x1136-iphone-5-311-46_33a8356f2205d7c0be8727720a21a207_raw.jpg';

		return (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={this._handleScroll}>
          <Image
            style={styles.image}
            source={{uri: imageUri}}>
            <TouchableHighlight
              style={[styles.button, {marginTop: 120}]}
              onPress={this._pushToNext}>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Push</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={this._pushToNextCustomNavbar}>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Push with custom navbar</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={this._back}>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Back</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={this._popToTop}>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Pop to top</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={this._changeColor}>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>*custom bar become gray</Text>
              </View>
            </TouchableHighlight>
          </Image>
        </ScrollView>
      </View>
		)
	},

  _back() {
    this.props.route.pop();
  },

  _pushToNext() {
    var nextIndex = ++this.props.route.index;

    this.props.route.push({
      component: DemoView,
      title: nextIndex,
      titleStyle: {
        fontSize: 22,
        color: '#eee'
      }
    });
  },

  _pushToNextCustomNavbar() {
    var colorIndex = this.props.route.index % navbarColors.length;
    var color = navbarColors[colorIndex];

    this.props.route.push({
      component: DemoView,
      navbarComponent: NavbarWrapper,
      navbarPassProps: {
        style: {
          backgroundColor: color
        }
      }
    });
  },

  _popToTop() {
    this.props.route.popToTop();
  },

  _changeColor() {
    this.props.updateNavbarProps({
      style: {
        backgroundColor: '#666'
      }
    });
  },

  _handleScroll(e) {
    var alpha = (e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y) / 200;
    if (alpha < 0) alpha = 0;
    if (alpha > 1) alpha = 1;

    var style = {backgroundColor: 'rgba(102, 106, 136, ' + alpha +')'};
    this.props.updateBarBackgroundStyle(style);
  }
});

var styles = StyleSheet.create({
  container: {
    width: screen.width,
    height: screen.height,
  },

  buttonView: {
    justifyContent: 'center',
    padding: 4,
    width: 180,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4
  },

  button: {
    marginBottom: 40
  },

  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)'
  },

	image: {
    alignItems: 'center',
		width: screen.width,
		height: screen.height * 1.5,
	},
});

module.exports = RootController;