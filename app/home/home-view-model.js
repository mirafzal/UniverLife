const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");
const calendarModule = require("nativescript-ui-calendar");
const colorModule = require("tns-core-modules/color");

function HomeViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Home");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */ 
        calendarEvents: new Array()
    });

    var events = new Array();
    var j = 1;

    var eventTitles = ["Turinda vecherinka", "Inhada vecherinka", "Mirafzalning uyida vecherikna", "Begzodning uyida vecherinka"];

    for (var i = 0; i < eventTitles.length; i++) {
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), 4, 9, 30);
        const endDate = new Date(now.getFullYear(), now.getMonth(), 4, 18);
        const event = new calendarModule.CalendarEvent(eventTitles[i], startDate, endDate);
        events.push(event);
        j++;
    }
    const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), 4, 15);
        const endDate = new Date(now.getFullYear(), now.getMonth(), 4, 21);
        const event = new calendarModule.CalendarEvent(eventTitles[i], startDate, endDate, false, new colorModule.Color("red"));
        events.push(event);



    viewModel.calendarEvents = events;

    return viewModel;

}

module.exports = HomeViewModel;
