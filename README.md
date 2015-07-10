react-native-custom-navigation
===================
The goal is making a easy navigation router for react-native, you could plug-in different navigation-bar in each view stack, and update navigation-bar background style at any time. The router would provide your navigation-bar a smooth transition animation when push, pop or swipe-back gesture.

Inspired by [react-native-router](https://github.com/t4t5/react-native-router)

![Example](https://www.dropbox.com/s/3jqguw37buhagu4/demo.gif?dl=1)

Install
-------

In your React Native project directory and run:

```npm install react-native-custom-navigation --save```

Usage
-------

```javascript
var Router = require('react-native-custom-navigation');
```

Your route object should contain component object for the page to render.
I would like setting a backButton component for each view stack, also you can pass this and manage the back-
button by your navigation-bar.

```javascript

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

var route = {
  component: FirstView,
  backButton:
  title: 'Root',
  titleStyle: {
    color: '#ddd',
    fontSize: 22
  }
}

var RootController = React.createClass({
  render() {
    return (
      <Router
        backButtonComponent={BackButton}
        initialRoute=route/>);
  }
});

AppRegistry.registerComponent('ReactTest', () => RootController);
```

Here we go.
We got a scrollView in FirstView, we can have fade-in navbar-background when we scrolling down.

```javascript
var FirstView = React.createClass({
	render() {
		return (
      <ScrollView
        scrollEventThrottle={16}
        onScroll={this._handleScroll}>
        <TouchableHighlight
          onPress={this._push}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonText}>Push with custom navbar</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
		)
	},

  _handleScroll(e) {
    var alpha = (e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y) / 200;
    if (alpha < 0) alpha = 0;
    if (alpha > 1) alpha = 1;

    var style = {backgroundColor: 'rgba(102, 106, 136, ' + alpha +')'};
    this.props.route.updateNavbarStyle(style);
  }

  _push() {
    var navbarContent = (
          <CustomNavbar
            style={{backgroundColor: color}}/>);

    this.props.route.push({
      component: FirstView,
      title: 'title would never show',
      navbarComponent: navbarContent
    });
  },
});
```

You can then navigate further to a new component by calling
```javascript
this.props.route.push()
```

You can set "navbarComponent" with your navigation-bar component.
If you want keep the fade-in effect in next view stack, make sure the background color of your navigation-bar is transparent.


Configurations
--------------


Todos
-------

- Less and clear code
- Provide interface to control your navigation-bar animation for view is transition.