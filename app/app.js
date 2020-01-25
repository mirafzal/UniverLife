/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
require("./bundle-config");
const application = require("tns-core-modules/application");
var firebase = require("nativescript-plugin-firebase");

var appSettings = require('tns-core-modules/application-settings');
const getFrameById = require("tns-core-modules/ui/frame").getFrameById;
const exit = require("nativescript-exit");
var dialogModule = require("tns-core-modules/ui/dialogs");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
  showNotificationsWhenInForeground: true,
  onMessageReceivedCallback: function(message) {
    console.log("Title: " + message.title);
    console.log("Body: " + message.body);
    // if your server passed a custom property called 'foo', then do this:
    console.log("Value of 'mykey': " + message.data.mykey);
    console.log("Value of 'mykey2': " + message.data.mykey2);
    console.log("Is background?: " + !message.foreground);
  },
  
  onPushTokenReceivedCallback: function(token) {
    console.log("Firebase push token: " + token);
  },
  
  onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
    console.log("onAuthStateChanged function");
    
    console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");

    appSettings.setBoolean('loggedIn', data.loggedIn);

    const frame = getFrameById('my-frame-id');

    if (data.loggedIn) {
      console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
      appSettings.setString('studentEmail', data.user.email);
      frame.navigate({
        moduleName: "home/home-page",
        transition: {
            name: "fade"
        },
        backstackVisible: false,
        clearHistory: true
    });

    } 
    else {
      appSettings.setString('studentEmail', "");
      appSettings.setString('studentFullname', "");
      frame.navigate({
        moduleName: "login/login",
        transition: {
            name: "fade"
        },
        backstackVisible: false,
        clearHistory: true
      });
    }
  }
}).then(
    function () {
      console.log("firebase.init done");
      firebase.getCurrentPushToken().then((token) => {
        // may be null if not known yet
        console.log("Current push token: " + token);
      });
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);

application.on(application.launchEvent, (args) => {
  if (args.android) {
      // For Android applications, args.android is an android.content.Intent class.
      console.log("Launched Android application with the following intent: " + args.android + ".");
  } else if (args.ios !== undefined) {
      // For iOS applications, args.ios is NSDictionary (launchOptions).
      console.log("Launched iOS application with options: " + args.ios);
  }
});

application.on(application.suspendEvent, (args) => {
  if (args.android) {
      // For Android applications, args.android is an android activity class.
      console.log("suspending Activity: " + args.android);
  } else if (args.ios) {
      // For iOS applications, args.ios is UIApplication. 
      console.log("UIApplication: " + args.ios);
  }
});

application.on(application.resumeEvent, (args) => {
  if (args.android) {
      // For Android applications, args.android is an android activity class.
      console.log("resuming Activity: " + args.android);
  } else if (args.ios) {
      // For iOS applications, args.ios is UIApplication.
      console.log("UIApplication: " + args.ios);
  }
});

application.on(application.displayedEvent, (args) => {
  // args is of type ApplicationEventData
  console.log("displayedEvent " + application.displayedEvent);
});

application.on(application.orientationChangedEvent, (args) => {
  // args is of type OrientationChangedEventData
  console.log(args.newValue); // "portrait", "landscape", "unknown"
});


application.on(application.exitEvent, (args) => {
  if (args.android) {
      // For Android applications, args.android is an android activity class.
      console.log("exiting Activity: " + args.android);
  } else if (args.ios) {
      // For iOS applications, args.ios is UIApplication.
      console.log("UIApplication: " + args.ios);
  }
});

application.on(application.lowMemoryEvent, (args) => {
  if (args.android) {
      // For Android applications, args.android is an android activity class.
      console.log("Activity: " + args.android);
  } else if (args.ios) {
      // For iOS applications, args.ios is UIApplication.
      console.log("UIApplication: " + args.ios);
  }
});

application.on(application.uncaughtErrorEvent, (args) => {
  console.log("Error: " + args.error);
});

// application variable should already be included in the app.js file
// Only do this on android
if (application.android) {
  application.android.on(application.AndroidApplication.activityBackPressedEvent, backEvent);
}

// This does the work on deciding if you want to go back
// arg.cancel = true will cancel navigating back
function backEvent(args) {
  args.cancel = true;
  dialogModule.confirm({
    title: "Exit!",
    message: "Do you really want to exit?",
    okButtonText: "Yes",
    cancelButtonText: "No"
  }).then(function (result) {
    // result argument is boolean
    console.log("Dialog result: " + result);
    if(result) {
      exit.exit();
    }
  });
}

console.log("Running app");
application.run({ moduleName: "app-root/app-root" });


/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
