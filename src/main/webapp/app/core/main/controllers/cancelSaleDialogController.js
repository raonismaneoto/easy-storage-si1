'use strict';

(function () {
    var app = angular.module("efApp");

    app.controller("CancelSaleDialogController", function CancelSaleDialogController($uibModalInstance, toastr, 
        SalesService, sale, sales) {
        var cancelSaleCtrl = this;

        cancelSaleCtrl.cancelSale = function cancelSale() {
            SalesService.deleteSale(sale.id).then(function success() {
                _.remove(sales, function (currentSale) {
                    return currentSale.id === sale.id;
                });
                toastr.success('Venda removida com sucesso');
            }, function error(response) {
                toastr.error(response);
            });
        };

        cancelSaleCtrl.cancelDialog = function cancelDialog() {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();