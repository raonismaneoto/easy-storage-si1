'use strict';

(function () {
    var app = angular.module("efApp");

    app.service('SalesService', function SalesService($q, $http) {
        var service = this;

        var SALES_URI = "/api/sale"

        service.getSales = function getSales() {
            var deffered = $q.defer();
            $http.get(SALES_URI).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        service.deleteSale = function deleteSale(saleId) {
            var deffered = $q.defer();
            $http.delete(SALES_URI + "/" + saleId).then(function success(response) {
                deffered.resolve(response);
            }, function error(response) {
                deffered.reject(response);
            });
            return deffered.promise;
        };
    });
})();