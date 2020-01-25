const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");
var appSettings = require('tns-core-modules/application-settings');
const firebaseApp = require("nativescript-plugin-firebase/app");

function AppRootViewModel() {
    const viewModel = observableModule.fromObject({
        //needed values in app-root.xml
        selectedPage: "",
        gesturesEnabled: true,
        defaultPage: "",
        studentFullname: "", //user's fullname in sidedrawer
        email: "" //user's email in sidedrawer
    });

    //updating selected page
    SelectedPageService.getInstance().selectedPage$
    .subscribe((selectedPage) => { viewModel.selectedPage = selectedPage; });
    console.log("selectedPage: " + viewModel.selectedPage);

    //enabling or disabling sidedrawer
    if(appSettings.getBoolean('loggedIn')) {
        viewModel.gesturesEnabled = true;
    } else {
        viewModel.gesturesEnabled = false;
    }
    
    //all document names in collection "Students"
    var allDocs = ['Freshman-CIE', 'Freshman-SOL', 'Junior-CSE', 'Junior-ICE', 'Junior-SOL', 
                    'Senior-CIE', 'Sophomore-CSE', 'Sophomore-ICE', 'Sophomore-SOL', 'MIRAFZAL-TURIN'];

    var studentEmail = appSettings.getString('studentEmail');
    var studentFullname = appSettings.getString('studentFullname');

    //searching student by email and getting his/her full name
    if(studentEmail == "" || studentFullname == "") {
        allDocs.forEach(currentDoc => {
            var students = firebaseApp.firestore().collection("Students").doc(currentDoc);
            students.get().then(doc => {
                if(doc.exists){
                    var currentDocData = JSON.parse(JSON.stringify(doc.data()));
                    for(var studentId in currentDocData){
                        if(currentDocData[studentId]["EMAIL"] == studentEmail) {
                            fullname = currentDocData[studentId]["NAME"] + " " + currentDocData[studentId]["SURNAME"];
                            viewModel.email = studentEmail;
                            viewModel.studentFullname = studentFullname;
                            appSettings.setString('studentFullname', fullname);
                            console.log("id: " + studentId); 
                            console.log("email: " + currentDocData[studentId]["EMAIL"]);
                            console.log("full name: " + fullname);
                        }
                    }
                }
            });
        });
    } else {
        viewModel.email = studentEmail;
        viewModel.studentFullname = studentFullname;
    }

    //setting default page
    viewModel.defaultPage = appSettings.getBoolean('loggedIn') ? "home/home-page" : "login/login" ;

    return viewModel;
}

module.exports = AppRootViewModel;
