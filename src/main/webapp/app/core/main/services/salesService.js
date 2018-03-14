'use strict';

/**
 * All HTTP Requests related to sales
 */
(function () {
    var app = angular.module("efApp");

    app.service('SalesService', function SalesService($q, $http) {
        var service = this;

        var SALES_URI = "/api/sale"

        /**
         * Returns a list with every sale
         */
        service.getSales = function getSales() {
            var deffered = $q.defer();
            $http.get(SALES_URI).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        /**
         * Deletes a sale
         * @param saleId - The unique id of the sale which will be deleted
         */
        service.deleteSale = function deleteSale(saleId) {
            var deffered = $q.defer();
            $http.delete(SALES_URI + "/" + saleId).then(function success(response) {
                deffered.resolve(response);
            }, function error(response) {
                deffered.reject(response);
            });
            return deffered.promise;
        };

        /**
         * Creates a sale
         * @param sale - The new sale object
         */
        service.createSale = function createSale(sale) {
            var deffered = $q.defer();
            $http.post(SALES_URI, sale).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };
    });
})();