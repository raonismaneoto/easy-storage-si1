'use strict';

(function () {
    var app = angular.module("efApp");

    app.service("CategoryService", function CategoryService($http, $q, BASE_SERVER_URL, AuthService) {
        var categoryService = this;

        categoryService.getAllCategories = function getAllProducts() {
            return $http.get(BASE_SERVER_URL + "/product/category")
        }

        categoryService.updateCategory = function updateProduct(category) {
            return $http.put(BASE_SERVER_URL + "/product/category",category);
        }

    })
})();