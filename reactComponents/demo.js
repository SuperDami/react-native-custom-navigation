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
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Starburst_in_NGC_4449_(captured_by_the_Hubble_Space_Telescope).jpg/800px-Starburst_in_NGC_4449_(captured_by_the_Hubble_Space_Telescope).jpg',
];

var NavbarContent = require('./navbar');
var screen = require('Dimensions').get('window');
var DemoView = React.createClass({
	render() {
    var images = [];
    for(var i in imageArray) {
      images.push(
        <Image
          style={styles.image}
          source={{uri: imageArray[i]}}>
        </Image>
        );
    }

		return (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={this._handleScroll}>
          {images}
        </ScrollView>
        <TouchableHighlight
          style={styles.button}
          onPress={this._pushToNext}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonText}>push to next</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, {top: 180}]}
          onPress={this._pushToNextCustomNavbar}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonText}>push to next using custom navbar</Text>
          </View>
        </TouchableHighlight>
      </View>
		)
	},

  _pushToNext() {
    var nextIndex = ++this.props.route.index;
    var navbarContent = (
          <NavbarContent
            title={'index ' + nextIndex}/>);

    this.props.route.push({
      component: DemoView,
      title: nextIndex
    });
  },

  _pushToNextCustomNavbar() {
    var nextIndex = ++this.props.route.index;
    var navbarContent = (
          <NavbarContent
            title={'index ' + nextIndex}/>);

    this.props.route.push({
      component: DemoView,
      navbarComponent: navbarContent
    });
  },

  _handleScroll(e) {
    var alpha = (e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y) / 200;
    if (alpha < 0) alpha = 0;
    if (alpha > 1) alpha = 1;

    var style = {backgroundColor: 'rgba(85, 137, 183, ' + alpha +')'};
    this.props.route.updateNavbarStyle && this.props.route.updateNavbarStyle(style);
  }
});

var styles = StyleSheet.create({
  container: {
    width: screen.width,
    height: screen.height,
  },

  buttonView: {
    width: 100,
    height: 40,
  },

  button: {
    position: 'absolute',
    left: 100,
    top: 100,
  },

  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff'
  },

	image: {
		width: screen.width,
		height: screen.height * 2,
	},
});

module.exports = DemoView;