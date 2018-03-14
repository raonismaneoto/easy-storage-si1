app.controller("DiscountDialogCtrl", function ($uibModalInstance, ProductService, toastr,categories,CategoryService,DiscountType) {

    var discountDialogCtrl = this;

    discountDialogCtrl.categories = [];

    discountDialogCtrl.discounts = DiscountType;

    discountDialogCtrl.close = function () {
        $uibModalInstance.close('close');
    };

    discountDialogCtrl.loadCategories = function (barCode) {
        CategoryService.getAllCategories()
        .then(function successCallback(response) {
            discountDialogCtrl.categories = response.data;
        }, function errorCallback(error) {
        });
    };

    discountDialogCtrl.changeDiscount = function (discount) {
        discountDialogCtrl.category.discountType = discount.key;
        discountDialogCtrl.category.priceMultiplyer = discount.discountMultiplyer;
        CategoryService.updateCategory(discountDialogCtrl.category)
        .then(function successCallback(response) {
        }, function errorCallback(error) {
        });
    };

    discountDialogCtrl.loadCategories();
});