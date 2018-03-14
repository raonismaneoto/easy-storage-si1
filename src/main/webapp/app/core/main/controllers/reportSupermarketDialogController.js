
/**
 * Controller responsible for supermarket report modal dialog 
 */
app.controller("ReportSupermarketDialogCtrl", function ($uibModalInstance, ProductService, toastr, products) {

    var reportDialogCtrl = this;

    reportDialogCtrl.products = products;
    reportDialogCtrl.flagCollapse = [];
    reportDialogCtrl.productBatches = [];

    /**
     * Closes the current modal
     */
    reportDialogCtrl.close = function () {
        $uibModalInstance.close('close');
    };

    /**
     * Initialize the collapsed report for all products
     */
    reportDialogCtrl.insertFlagCollapse = function () {
        _.forEach(products, function (product) {
            reportDialogCtrl.flagCollapse[product.barCode] = false;
        });
    };

    /**
     * Expands the report list if it's collapsed or collapse it if it's expanded
     * @param barCode - The unique id of the clicked product
     */
    reportDialogCtrl.invertFlagCollapse = function (barCode) {
        reportDialogCtrl.flagCollapse[barCode] = !reportDialogCtrl.flagCollapse[barCode];
        if (reportDialogCtrl.flagCollapse[barCode]) reportDialogCtrl.getBatches(barCode);
    };

    /**
     * Updates the list of batches for some product
     * @param barCode - The unique id of the clicked product
     */
    reportDialogCtrl.getBatches = function (barCode) {
        ProductService.getBatchesByProduct(barCode)
            .then(function successCallback(response) {
                reportDialogCtrl.productBatches[barCode] = response;
            }, function errorCallback(error) {
        });
    };

    reportDialogCtrl.insertFlagCollapse();
});