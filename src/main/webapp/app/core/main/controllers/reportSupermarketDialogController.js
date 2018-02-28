app.controller("ReportSupermarketDialogCtrl", function ($uibModalInstance, ProductService, toastr, products) {

    var reportDialogCtrl = this;

    reportDialogCtrl.products = products;
    reportDialogCtrl.flagCollapse = [];
    reportDialogCtrl.productBatches = [];

    reportDialogCtrl.close = function () {
        $uibModalInstance.close('close');
    };

    reportDialogCtrl.insertFlagCollapse = function () {
        _.forEach(products, function (product) {
            reportDialogCtrl.flagCollapse[product.barCode] = false;
        });
    };

    reportDialogCtrl.invertFlagCollapse = function (barCode) {
        reportDialogCtrl.flagCollapse[barCode] = !reportDialogCtrl.flagCollapse[barCode];
        if (reportDialogCtrl.flagCollapse[barCode]) reportDialogCtrl.getBatches(barCode);
    };

    reportDialogCtrl.getBatches = function (barCode) {
        ProductService.getBatchesByProduct(barCode)
            .then(function successCallback(response) {
                reportDialogCtrl.productBatches[barCode] = response;
            }, function errorCallback(error) {
        });
    };

    reportDialogCtrl.insertFlagCollapse();
});