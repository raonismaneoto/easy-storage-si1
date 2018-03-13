'use strict';

(function () {
	var app = angular.module("efApp");

	app.controller("BatchController", function BatchController($uibModalInstance, toastr, product, BatchService,ProductStatus) {
		var batchCtrl = this;

		batchCtrl.product = product;

		batchCtrl.dateFormat = 'dd/MM/yyyy';
		batchCtrl.datePicker = {
			opened : false
		}

		batchCtrl.expirationDate = new Date();
		batchCtrl.numberOfItems = 0;

		batchCtrl.dateOptions = {
			formatYear : 'yy',
			minDate : new Date(),
			startingDay: 1
		};

		batchCtrl.createBatch = function createBatch(expirationDate, numberOfItems) {	
	        var batch = {
                expirationDate: expirationDate.getDay() + "/" + (expirationDate.getMonth() + 1) + "/" + expirationDate.getFullYear(),
                numberOfItems: numberOfItems
			}

	        BatchService.saveBatch(product, batch).then(function success(response) {
				toastr.success("Lote criado com sucesso");
				product.status = ProductStatus.AVAILABLE.key;
				product.statusCode = ProductStatus.AVAILABLE.value;
				$uibModalInstance.dismiss('cancel');
            }, function error(error) {
                toastr.error("Problemas ao tentar criar lote");
                $uibModalInstance.dismiss('cancel');
            });
		};

		batchCtrl.closeDialog = function closeDialog () {
	        $uibModalInstance.dismiss('cancel');
	    };

		batchCtrl.openDatePicker = function openDatePicker() {
			batchCtrl.datePicker.opened = true;
		};
	});
})();
