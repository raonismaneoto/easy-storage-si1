'use strict';

(function () {
	var app = angular.module("efApp");
	
	app.service("BatchService", function BatchService($http, $q) {
		var batchService = this;
		
		batchService.saveBatch = function saveBatch(product, batch) {
			var deffered = $q.defer();
			$http.post('/api/product/batch/create/' + product.barCode, JSON.stringify(batch)).then(function success(response) {
				deffered.resolve(response.data);
			}, function error(response) {
				deffered.reject(response.data);
			});
			return deffered.promise; 
		}
	});
})();