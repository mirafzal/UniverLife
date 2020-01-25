const app = require("tns-core-modules/application");

const BrowseViewModel = require("./browse-view-model");

const getFrameById = require("tns-core-modules/ui/frame").getFrameById;
var UserViewModel = require("../view-models/user-view-model");
var firebase = require("nativescript-plugin-firebase");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new BrowseViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
    console.log("Browse page loaded");
}

exports.logout = function () {
    const frame = getFrameById("my-frame-id");

    firebase.logout()
        .then(() => console.log("Logout OK"))
        // .then(function(){
        //     frame.navigate({
        //         moduleName: "login/login",
        //         transition: {
        //             name: "fade"
        //         },
        //         backstackVisible: false,
        //         clearHistory: true
        //     });
        // })
        .catch(error => console.log("Logout error: " + JSON.stringify(error)));
}

var user = new UserViewModel({
});

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
