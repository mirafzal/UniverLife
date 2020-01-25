const application = require("tns-core-modules/application");
const getFrameById = require("tns-core-modules/ui/frame").getFrameById;
const AppRootViewModel = require("./app-root-view-model");
const firebaseApp = require("nativescript-plugin-firebase/app");
const appSettings = require('tns-core-modules/application-settings');

function onLoaded(args) {
    const drawerComponent = args.object;
    drawerComponent.bindingContext = new AppRootViewModel();
    console.log("app-root loaded");
}

function onNavigationItemTap(args) {
    const component = args.object;
    const componentRoute = component.route;
    const componentTitle = component.title;
    const bindingContext = component.bindingContext;

    bindingContext.set("selectedPage", componentTitle);

    const frame = getFrameById("my-frame-id");
    
    frame.navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        },
        backstackVisible: false
    });

    const drawerComponent = application.getRootView();
    drawerComponent.closeDrawer();
}


exports.onLoaded = onLoaded;
exports.onNavigationItemTap = onNavigationItemTap;
