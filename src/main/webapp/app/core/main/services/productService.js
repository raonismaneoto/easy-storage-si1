'use strict';

/**
 * All HTTP Requests related to Product
 */
(function () {
    var app = angular.module("efApp");

    app.service("ProductService", function ProductService($http, $q, BASE_SERVER_URL, AuthService) {
        var productService = this;

        /**
         * Returns a list with every product
         */
        productService.getAllProducts = function getAllProducts() {
            return $http.get(BASE_SERVER_URL + "/product/findAll")
        }

        /**
         * Updates a product information
         * @param barCode - The product unique id
         * @param data - The new information to be updated
         */
        productService.updateProduct = function updateProduct(barCode, data) {
            return $http.put(BASE_SERVER_URL + "/product/update/" + barCode, data)
        }

        /**
         * Creates a new product
         * @param barCode - The product unique id
         * @param data - The new information to be updated
         */
        productService.createProduct = function createProduct(product) {
            return $http.post(BASE_SERVER_URL + "/product/create", JSON.stringify(product))
        }

        /**
         * Returns a list with every product's batch
         * @param barCode - The product unique id
         */
        productService.getBatchesByProduct = function getBatchesByProduct(barCode) {
            var deffered = $q.defer();
            $http.get(BASE_SERVER_URL + "/product/batch/" + barCode).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

    })
})();