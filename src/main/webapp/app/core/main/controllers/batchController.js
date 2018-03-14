'use strict';

/**
 * Batch Controller
 */
(function () {
	var app = angular.module("efApp");

	app.controller("BatchController", function BatchController($uibModalInstance, toastr, product, BatchService,ProductStatus, NotificationService) {
		var batchCtrl = this;

		/* The product of which the batch is made of */
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

		/**
		 * Creates a new batch
		 * @param expirationDate - The expiration date of the new batch
		 * @param numberOfItems - How many products the batch has
		 */
		batchCtrl.createBatch = function createBatch(expirationDate, numberOfItems) {	
	        var batch = {
                expirationDate: expirationDate.getDay() + "/" + (expirationDate.getMonth() + 1) + "/" + expirationDate.getFullYear(),
                numberOfItems: numberOfItems
			}

	        BatchService.saveBatch(product, batch).then(function success(response) {
				toastr.success("Lote criado com sucesso");
				
				batchCtrl.closeToExpiration(expirationDate);
				
				product.status = ProductStatus.AVAILABLE.key;
				product.statusCode = ProductStatus.AVAILABLE.value;
				$uibModalInstance.dismiss('cancel');
            }, function error(error) {
                toastr.error("Problemas ao tentar criar lote");
                $uibModalInstance.dismiss('cancel');
            });
		};

		/**
		 * Closes the current modal
		 */
		batchCtrl.closeDialog = function closeDialog () {
	        $uibModalInstance.dismiss('cancel');
	    };

		/**
		 * Opens the date picker for the expiration date
		 */	
		batchCtrl.openDatePicker = function openDatePicker() {
			batchCtrl.datePicker.opened = true;
		};


	    batchCtrl.closeToExpiration = function (expirationDate) {
	        var currentDate = new Date();

	        var timeDiff = Math.abs(expirationDate.getTime() - currentDate.getTime());
			var diffDays = timeDiff / (1000 * 3600 * 24); 
			console.log(diffDays);
	        
	        if (diffDays < 30) {
	            var notification = {
	                message: "Lote de " + product.name + " está perto do seu vencimento!"
	            }
	            NotificationService.saveNotification(notification).then(function success(response) {
	                toastr.success(notification.message);
	            }, function error(response) {
	                toastr.error("Problema na criaçao da notificação");
	            })
	        }
	    };
	});
})();
