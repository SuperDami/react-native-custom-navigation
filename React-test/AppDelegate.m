//
//  AppDelegate.m
//  React-test
//
//  Created by chen zhejun on 2015/06/24.
//  Copyright (c) 2015年 superdami. All rights reserved.
//

#import "AppDelegate.h"
#import "RCTRootView.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    NSURL *jsCodeLocation;
    
    /**
     * Loading JavaScript code - uncomment the one you want.
     *
     * OPTION 1
     * Load from development server. Start the server from the repository root:
     *
     * $ npm start
     *
     * To run on device, change `localhost` to the IP address of your computer
     * (you can get this by typing `ifconfig` into the terminal and selecting the
     * `inet` value under `en0:`) and make sure your computer and iOS device are
     * on the same Wi-Fi network.
     */
    
    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];
    
    /**
     * OPTION 2
     * Load from pre-bundled file on disk. To re-generate the static bundle
     * from the root of your project directory, run
     *
     * $ react-native bundle --minify
     *
     * see http://facebook.github.io/react-native/docs/runningondevice.html
     */
    
    //   jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"ReactTest"
                                                     launchOptions:launchOptions];
    
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [[UIViewController alloc] init];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    return YES;
}

@end
