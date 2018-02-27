'use strict';

(function () {
    var app = angular.module("efApp");

    app.service("ProductService", function ProductService($http, BASE_SERVER_URL, AuthService) {
        var productService = this;

        productService.getAllProducts = function getAllProducts() {
            return $http.get(BASE_SERVER_URL + "/product/")
        }

        productService.updateProductById = function updateProductById(id, data) {
            return $http.put(BASE_SERVER_URL + "/product/" + id, data)
        }

        productService.getProductById = function getProductById(id) {
            return $http.get("/api/product/" + id)
        }
        
        productService.createProduct = function createProduct(product) {
            return $http.post("/api/product/", JSON.stringify(product))
        }
    })
})();