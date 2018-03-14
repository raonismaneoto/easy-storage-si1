'use strict';

/**
 * All HTTP Requests related to batches
 */
(function () {
	var app = angular.module("efApp");
	
	app.service("BatchService", function BatchService($http, $q, BASE_SERVER_URL) {
		var batchService = this;
		
	    /**
         * Creates a new batch
         * @param product - The product of which the batch will be created
         * @param batch - The new batch
         */
		batchService.saveBatch = function saveBatch(product, batch) {
			var deffered = $q.defer();
			$http.post(BASE_SERVER_URL + "/product/batch/create/" + product.barCode, JSON.stringify(batch)).then(function success(response) {
				deffered.resolve(response.data);
			}, function error(response) {
				deffered.reject(response.data);
			});
			return deffered.promise; 
		}
	});
})();