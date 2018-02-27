'use strict';

(function () {
    var app = angular.module("efApp");

    app.service("ProductService", function ProductService($http, BASE_SERVER_URL, AuthService) {
        var productService = this;

        productService.getAllProducts = function getAllProducts() {
            return $http.get(BASE_SERVER_URL + "/product/findAll")
        }

        productService.updateProduct = function updateProduct(barCode, data) {
            return $http.put(BASE_SERVER_URL + "/product/update/" + barCode, data)
        }

        productService.createProduct = function createProduct(product) {
            return $http.post("/api/product/create", JSON.stringify(product))
        }
    })
})();