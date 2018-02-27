'use strict';

(function () {
    var app = angular.module("efApp");

    app.service("BatchService", function BatchService($http, BASE_SERVER_URL, AuthService) {
        var batchService = this;

        batchService.createBatch = function createBatch(product, batch) {
            return $http.post("/api/product/" + product.id + "/batch", JSON.stringify(batch))
        }
    })
})();