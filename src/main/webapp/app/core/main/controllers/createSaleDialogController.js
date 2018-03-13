'use strict';

(function () {
    var app = angular.module("efApp");

    app.controller("CreateSaleDialogController", function CreateSaleDialogController(sales, toastr, 
        ProductService, SalesService, $uibModalInstance) {
        var createSaleCtrl = this;
        createSaleCtrl.products = [];
        createSaleCtrl.saleProducts = [];

        createSaleCtrl.createSale = function createSale() {
            var sale = prepareSale();
            if(sale) {
                SalesService.createSale(sale).then(function success(response) {
                    sales.push(new Sale(response));
                    toastr.success('Venda criada com sucesso.');
                    $uibModalInstance.close(201);
                }, function error(response) {
                    toastr.error(response);
                    $uibModalInstance.close(201);
                });
            } else {
                toastr.error("A venda deve conter pelo menos um produto.");
            }
            
        };

        createSaleCtrl.addOrRemoveProduct = function addOrRemoveProduct(product) {
            if(createSaleCtrl.hasProduct(product)) {
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

        createSaleCtrl.hasProduct = function hasProduct(product) {
            return _.includes(createSaleCtrl.saleProducts, product);
        };

        function createSaleInstance() {
            return new Sale({
                products: createSaleCtrl.saleProducts,
                itemsQuantity: createSaleCtrl.itemsQuantity,
                totalPrice: createSaleCtrl.totalPrice
            });
        }

        function getAllProducts() {
            ProductService.getAllProducts().then(function sucess(response) {
                createSaleCtrl.products = response.data;
            });
        }

        function getTotalPrice() {
            var totalPrice = 0;
            _.each(createSaleCtrl.saleProducts, function(product) {
                totalPrice += product.price;
            });
            createSaleCtrl.totalPrice = totalPrice;
        }

        function prepareSale() {
            createSaleCtrl.itemsQuantity = _.size(createSaleCtrl.saleProducts);
            getTotalPrice();
            var sale = createSaleInstance();
            return _.size(sale.products) > 0? sale : undefined;
        }

        

        getAllProducts();
    });
})();