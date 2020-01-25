const app = require("tns-core-modules/application");
const HomeViewModel = require("./home-view-model");
const calendarModule = require("nativescript-ui-calendar");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HomeViewModel();
    console.log("Home page loaded");
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

export function onDateSelected(args) {
    console.log("onDateSelected: " + args.date);
}

export function onDateDeselected(args) {
    console.log("onDateDeselected: " + args.date);
}

export function onNavigatedToDate(args) {
    console.log("onNavigatedToDate: " + args.date);
}

export function onNavigatingToDateStarted(args) {
    console.log("onNavigatingToDateStarted: " + args.date);
}

export function onViewModeChanged(args) {
    console.log("onViewModeChanged: " + args.newValue);
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
