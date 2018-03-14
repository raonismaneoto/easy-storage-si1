app.controller("DiscountDialogCtrl", function ($uibModalInstance, ProductService, toastr,categories,CategoryService) {

    var discountDialogCtrl = this;

    discountDialogCtrl.categories = [];
    discountDialogCtrl.flagCollapse = [];
    discountDialogCtrl.productBatches = [];

    discountDialogCtrl.close = function () {
        $uibModalInstance.close('close');
    };

    discountDialogCtrl.loadCategories = function (barCode) {
        CategoryService.getAllCategories()
        .then(function successCallback(response) {
            discountDialogCtrl.categories = response.data;
            console.log(discountDialogCtrl.categories);
        }, function errorCallback(error) {
        });
    };

    discountDialogCtrl.loadCategories();
});