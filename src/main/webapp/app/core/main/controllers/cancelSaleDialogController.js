'use strict';

/**
 * Controller for the dialog responsible for cancelling a sale
 */
(function () {
    var app = angular.module("efApp");

    app.controller("CancelSaleDialogController", function CancelSaleDialogController($uibModalInstance, toastr, 
        SalesService, sale, sales) {
        var cancelSaleCtrl = this;

        /**
         * Cancels a sale
         */
        cancelSaleCtrl.cancelSale = function cancelSale() {
            SalesService.deleteSale(sale.id).then(function success() {
                _.remove(sales, function (currentSale) {
                    return currentSale.id === sale.id;
                });
                toastr.success('Venda removida com sucesso');
                $uibModalInstance.close(201);
            }, function error(response) {
                toastr.error(response);
                $uibModalInstance.close(201);
            });
        };

        /**
         * Closes the current modal
         */
        cancelSaleCtrl.cancelDialog = function cancelDialog() {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();