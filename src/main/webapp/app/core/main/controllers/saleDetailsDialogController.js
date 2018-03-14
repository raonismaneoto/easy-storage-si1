'use strict';

(function () {
    var app = angular.module("efApp");

    app.controller('SaleDetailsDialogController', function SaleDetailsDialogController(sale, $uibModalInstance) {
        var saleDetailsCtrl = this;
        saleDetailsCtrl.sale = sale;
        console.log(sale);

        saleDetailsCtrl.close = function () {
            $uibModalInstance.close(201);
        };
    });
})();