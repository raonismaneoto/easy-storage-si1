'use strict';

(function () {
    var app = angular.module("efApp");

    app.controller("CreateSaleDialogController", function CreateSaleDialogController(sales, toastr, 
        ProductService, SalesService, $uibModalInstance) {
        var createSaleCtrl = this;
        createSaleCtrl.products = [];
        createSaleCtrl.saleProducts = [];

        createSaleCtrl.createSale = function createSale() {
            var sale = createSaleInstance();
        };

        createSaleCtrl.addOrRemoveProduct = function addOrRemoveProduct(product) {
            if(_.includes(createSaleCtrl.saleProducts, product)) {
                _.remove(createSaleCtrl.saleProducts, function(currentProduct) {
                    return product.barCode === currentProduct.barCode;
                });
            } else {
                createSaleCtrl.saleProducts.push(product);
            }
        };

        createSaleCtrl.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

        function createSaleInstance() {
            return new Sale({
                products: createSaleCtrl.saleProducts,
                itemsQuantity: createSaleCtrl.itemsQuantity
            });
        }

        function getAllProducts() {
            ProductService.getAllProducts().then(function sucess(response) {
                createSaleCtrl.products = response.data;
            });
        }

        getAllProducts();
    });
})();