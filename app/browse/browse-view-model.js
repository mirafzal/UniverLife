const observableModule = require("tns-core-modules/data/observable");
const appRootViewModel = require("../app-root/app-root-view-model");

const SelectedPageService = require("../shared/selected-page-service");

function BrowseViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Browse");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
    });


    return viewModel;
}

module.exports = BrowseViewModel;
