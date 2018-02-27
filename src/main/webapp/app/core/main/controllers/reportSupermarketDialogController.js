app.controller("ReportSupermarketDialogCtrl", function ($uibModalInstance, ProductService, toastr, products) {

    var reportDialogCtrl = this;

    reportDialogCtrl.products = products;

    
    reportDialogCtrl.close = function () {
        $uibModalInstance.dismiss('close');
    };
});