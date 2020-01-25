var firebase = require("nativescript-plugin-firebase");
var observableModule = require("tns-core-modules/data/observable");

var appSettings = require('tns-core-modules/application-settings');

const SelectedPageService = require("../shared/selected-page-service");

var loginResultMessage = "";

function User(info) {
    SelectedPageService.getInstance().updateSelectedPage("LOGIN");

    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new observableModule.fromObject({
        email: info.email || "", //email textfield value
        isLoading: false, //activity indicator (loading)
        isEnabled: true, //login button
        editable: true //email textfield
    });

    viewModel.login = function() {
        viewModel.isLoading = true;
        viewModel.isEnabled = false;
        viewModel.editable = false;
        return firebase.login({
            type: firebase.LoginType.EMAIL_LINK,
            emailLinkOptions: {
                email: viewModel.get("email"),
                url: "https://univerlife.page.link/"
            }
          })
          .then(function (result) {
            appSettings.setString('loginResultMessage', 
                                  "We have sent a confrimation link to your e-mail adress. Please check your email. " 
                                   + "The app will automatically be closed in 5 seconds");
            console.dir(JSON.stringify(result));
            viewModel.isLoading = false;
          })
          .catch(function (error) {
              viewModel.isLoading = false;
              viewModel.isEnabled = true;
              viewModel.editable = true;
              console.log(error);
              if (error == "Auth type EMAIL_LINK requires an 'emailLinkOptions.email' argument") {
                loginResultMessage = "Please enter your e-mail adress.";
              } else if (error == "com.google.firebase.FirebaseNetworkException: A network error (such as timeout, interrupted connection or unreachable host) has occurred.") {
                loginResultMessage = "Check your internet connection and try again.";
              } else if (error == "com.google.firebase.auth.FirebaseAuthInvalidCredentialsException: The email address is badly formatted.") {
                loginResultMessage = "Invalid e-mail adress. Please enter valid e-mail adress.";
              } else {
                loginResultMessage = "Unexpected error: " + error;
              }
              appSettings.setString('loginResultMessage', loginResultMessage);
          })
    };
    return viewModel;
}

module.exports = User;

//