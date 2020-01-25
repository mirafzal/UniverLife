var UserViewModel = require("../view-models/user-view-model");
var appSettings = require('tns-core-modules/application-settings');
var dialogModule = require("tns-core-modules/ui/dialogs");
const exit = require("nativescript-exit");
const timerModule = require("tns-core-modules/timer");
var user = new UserViewModel({
});

exports.loaded = function (args) {
    const page = args.object;
    page.bindingContext = user;
    console.log("Login page loaded");
}

exports.signIn = function () {
    user.login()
        .then(function () {
            var loginResultMessage = appSettings.getString('loginResultMessage');
            dialogModule.alert({
                message: loginResultMessage,
                okButtonText: 'OK'
            }); 
            if (loginResultMessage == "We have sent a confrimation link to your e-mail adress. Please check your email. "
            + "The app will automatically be closed in 5 seconds") {
            var count = 0;
            var myId = timerModule.setInterval(() => {
                count++;
                console.log(count);
                if (count == 5) {
                    clearInterval(myId);
                    exit.exit();
                }
            }, 1000);
        }
            
            
        })
        .catch(function (error) {
            dialogModule.alert({
                message: 'Something went wrong. Please report to developers about this issue.',
                okButtonText: 'OK'
            });
            console.log("myERROR" + error);
            return Promise.reject();
        })
}
