react-native-custom-navigation
===================
The goal is making a easy navigation router for react-native, you could plug-in different navigation-bar in each view stack, and update navigation-bar background style at any time. The router would provide your navigation-bar a smooth transition animation when push, pop or swipe-back gesture is activating.

Inspired by [react-native-router](https://github.com/t4t5/react-native-router)

Case 1:
Different view stack using different navgation bar

![Example](https://www.dropbox.com/s/3jqguw37buhagu4/demo.gif?dl=1)


Case 2:
Using singleton navigation bar for all views

![Example](https://www.dropbox.com/s/ik6i3x6m2bgirh5/demo2.gif?dl=1)



Install
-------

In your React Native project directory and run:

```npm install react-native-custom-navigation --save```



Demo
-------

In node_modules/react-native-custom-navigation/example directory and run:

```npm install```

In ```index.ios.js```, 2 demos are ready for you.


```javascript
var React = require('react-native');
var Demo1 = require('./demo1');
var Demo2 = require('./demo2');

var {
  AppRegistry,
} = React;

AppRegistry.registerComponent('ReactTest', () => Demo1);
```

Update
-------
0.2.1:
- Not specifying react-native as dependency in package.json
- Demo using react-native 0.11

0.2.0:
- You can pass initial props to your navbar component by
setting **`navbarPassProps`** when pushing a route object.
- You can update current navbar props in current view module by calling **`this.props.updateNavbarProps`**.
- Access the passing props in your navbar module by **`this.props.xxx`**,
- Handle the passing props in **`componentWillMound`** or **`componentWillReceiveProps`** to render navbar UI.
- The usage of these features can be found in the example that had been updated.


Basic Usage
-------

```javascript
var Router = require('react-native-custom-navigation');
```

Your route object should contain component object for the page to render.
I would like setting a back-button component for each view stack, also you can pass this and manage the back-button by your navigation-bar.

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
Now we got a scrollView here, we can have fade-in navbar-background when we scrolling down.

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

You can set "navbarComponent" as navigation-bar in next route object.
If you want still have the fade-in effect, make sure the background color of your "navbarComponent" is transparent.


Configurations
--------------
The **`<Router />`** object used to initialize the navigation can take the following props:
- `initialRoute` (required)
- `backButtonComponent`
- `navbarComponent`: Set the component as the singleton navbar for all views.
- `navbarPassProps`: Send initial props to your singleton navbar, access it by `this.props.xxx`

The **`this.props.route.push()`** callback prop takes one parameter (a JavaScript object) which can have the following keys:
- `title`
- `titleStyle`
- `component` (required) The next view component
- `navbarComponent`: Set the component as the navbar in this route
- `passProps`: Send object data to your view component. access the data by `this.props.xxx`
- `navbarPassProps`: Send initial data to your navbar, access it by `this.props.xxx`

The **`navbarComponent` and `component`** access route parameter or function by ***`this.props.route`*** which have the following keys:
- `index`
- `previousIndex`(for singleton navbar only)
- `progress`(for singleton navbar only): current transition animation progress (0 - 1)
- ~~`updateNavbarStyle`(view component only)~~
- `push`
- `pop`
- `popToTop`

~~The **`this.props.route.updateNavbarStyle()`** callback prop takes style object which update the style of navbar background~~

**`this.props.route.updateNavbarStyle`** this function had been abandoned, replace with **`this.props.updateBarBackgroundStyle()`** .


Todos
-------

- Less and clear code
- Make transition animation looks naturally when using singleton navbar and stack navbar at same time.

Questions?
---------
feel free to [follow me on Twitter](https://twitter.com/eatdami)