'use strict';

/**
 * Controller for the dialog responsible for creating a sale
 */
(function () {
    var app = angular.module("efApp");

    app.controller("CreateSaleDialogController", function CreateSaleDialogController(sales, toastr, 
        ProductService, SalesService, $uibModalInstance) {
        var createSaleCtrl = this;
        createSaleCtrl.products = [];
        createSaleCtrl.saleProducts = [];
        createSaleCtrl.productsQuantity = [];

        /**
         * Creates a sale
         */
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

        /**
         * Add a product to the current sale if it's not included yet, or remove from it otherwise
         * @param product - The product to be updated in the sale
         */
        createSaleCtrl.addOrRemoveProduct = function addOrRemoveProduct(product) {
            if(createSaleCtrl.hasProduct(product)) {
                _.remove(createSaleCtrl.saleProducts, function(currentProduct) {
                    return product.barCode === currentProduct.barCode;
                });
            } else {
                createSaleCtrl.saleProducts.push(product);
            }
        };

        /**
         * Closes the current modal
         */
        createSaleCtrl.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

        /**
         * Returns true if the product is already in the current sale
         * @param product - The product to be tested
         */
        createSaleCtrl.hasProduct = function hasProduct(product) {
            return _.includes(createSaleCtrl.saleProducts, product);
        };

        /**
         * Adds a pair of product and its quantity to the current sale
         * @param quantity - How many products will be bought
         * @param product - The product to be added
         */
        createSaleCtrl.addProductAndQuantityPair = function addProductAndQuantityPair(quantity, product) {
            createSaleCtrl.productsQuantity.push({
                barCode: product.barCode, quantity: quantity
            });
        };

        /**
         * Creates a new instance of a Sale class
         */
        function createSaleInstance() {
            return new Sale({
                products: createSaleCtrl.saleProducts,
                itemsQuantity: createSaleCtrl.itemsQuantity,
                totalPrice: createSaleCtrl.totalPrice,
                productsQuantity: createSaleCtrl.productsQuantity
            });
        }

        /**
         * Updates the list of available products
         */
        function getAllProducts() {
            ProductService.getAllProducts().then(function sucess(response) {
                createSaleCtrl.products = response.data;
            });
        }

        /**
         * Calculates the total price of the sale
         */
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