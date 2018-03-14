'use strict';

(function () {
    var app = angular.module("efApp");

    app.controller('SaleDetailsDialogController', function SaleDetailsDialogController(sale, $uibModalInstance) {
        var saleDetailsCtrl = this;
        saleDetailsCtrl.sale = sale;

        saleDetailsCtrl.close = function () {
            $uibModalInstance.close(201);
        };

        saleDetailsCtrl.getQuantity = function getQuantity(product) {
            var pair = _.find(saleDetailsCtrl.sale.productsQuantity, function(pair) {
                return pair.barCode === product.barCode;
            });
            return pair.quantity;
        };
    }); 
})();