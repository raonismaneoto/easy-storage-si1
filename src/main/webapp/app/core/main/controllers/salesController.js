'use strict';

(function () {
    var app = angular.module('efApp');

    app.controller('SalesController', function SalesController(SalesService, AuthService, 
        $uibModal, toastr) {
        var salesCtrl = this;
        
        salesCtrl.sales = [];

        salesCtrl.isAdmin = function isAdmin() {
            return AuthService.isAdmin();
        };

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

        function getSales() {
            SalesService.getSales().then(function success(data) {
                salesCtrl.sales = data;
                console.log(data);
            }, function error(data) {
                toastr.error(data);
            });
        }

        getSales();

    });
})();