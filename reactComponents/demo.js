var React = require('react-native');
var {
	Image,
	View,
  ScrollView,
	StyleSheet,
  Text,
  TouchableHighlight
} = React;

var imageArray = [
  'https://divnil.com/wallpaper/iphone5/img/app/c/l/clear-your-desktop-wallpaper-for-640x1136-iphone-5-311-46_33a8356f2205d7c0be8727720a21a207_raw.jpg',
  'http://live-wallpaper.net/iphone5s/img/app/i/p/iphone5_ios7_01869_40f81d87eba8242eb9d1d777aa0f620a_raw.jpg',
  'http://3.bp.blogspot.com/-6sBo91tPiXU/UHx6TZMG4CI/AAAAAAAAIyw/RCTivAH6dVk/s1600/iphone-5-wallpapers-01.png',
  'http://live-wallpaper.net/iphone5s/img/app/c/0/c0dc6d89f28ea771d0af7167236a5117_raw.jpg'
];

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
var DemoView = React.createClass({
	render() {
    var imageIndex = this.props.route.index % imageArray.length;
    var imageUri = imageArray[imageIndex];

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
                <Text style={styles.buttonText}>Pop to top </Text>
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
      title: nextIndex
    });
  },

  _pushToNextCustomNavbar() {
    var colorIndex = this.props.route.index % imageArray.length;
    var color = navbarColors[colorIndex];
    var nextIndex = this.props.route.index + 1;
    var navbarContent = (
          <NavbarContent
            style={{backgroundColor: color}}/>);

    this.props.route.push({
      component: DemoView,
      navbarComponent: navbarContent
    });
  },

  _popToTop() {
    this.props.route.popToTop();
  },

  _handleScroll(e) {
    var alpha = (e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y) / 200;
    if (alpha < 0) alpha = 0;
    if (alpha > 1) alpha = 1;

    var style = {backgroundColor: 'rgba(102, 106, 136, ' + alpha +')'};
    this.props.route.updateNavbarStyle && this.props.route.updateNavbarStyle(style);
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

module.exports = DemoView;