'use strict';

/**
 * Controller responsible for sales
 */
(function () {
    var app = angular.module('efApp');

    app.controller('SalesController', function SalesController(SalesService, AuthService, 
        $uibModal, toastr) {
        var salesCtrl = this;
        
        salesCtrl.sales = [];

        /**
         * Returns true if the logged user is an administrator
         */
        salesCtrl.isAdmin = function isAdmin() {
            return AuthService.isAdmin();
        };

        /**
         * Creates a modal dialog for creation of sale
         */
        salesCtrl.openCreateSaleDialog = function openCreateSaleDialog() {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'Adicionar Venda',
                ariaDescribedBy: 'Formulario para adição de uma nova venda',
                templateUrl: 'app/core/main/views/createSaleDialogView.html',
                controller: 'CreateSaleDialogController',
                controllerAs: 'createSaleCtrl',
                resolve: {
                    sales: function () {
                        return salesCtrl.sales;
                    }
                }
            });
        };

        /**
         * Creates a modal dialog for cancelling a sale
         */
        salesCtrl.openCancelSaleDialog = function openCancelSaleDialog(sale) {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'Remover venda',
                ariaDescribedBy: 'Confirmação de cancelamento',
                templateUrl: 'app/core/main/views/cancelSaleView.html',
                controller: 'CancelSaleDialogController',
                controllerAs: 'cancelSaleCtrl',
                resolve: {
                    sales: function () {
                        return salesCtrl.sales;
                    },
                    sale: function() {
                        return sale;
                    }
                }
            });
        };


        /**
         * Updates the list of sales
         */
        function getSales() {
            SalesService.getSales().then(function success(data) {
                salesCtrl.sales = data;
            }, function error(data) {
                toastr.error(data);
            });
        }

        getSales();

    });
})();