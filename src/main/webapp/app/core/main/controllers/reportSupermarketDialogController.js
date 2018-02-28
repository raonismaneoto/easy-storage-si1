app.controller("ReportSupermarketDialogCtrl", function ($uibModalInstance, ProductService, toastr, products) {

    var reportDialogCtrl = this;

    reportDialogCtrl.products = products;
    reportDialogCtrl.flagCollapse = [];
    reportDialogCtrl.productBatches = [];

    reportDialogCtrl.close = function () {
        $uibModalInstance.close('close');
    };

    reportDialogCtrl.insertFlagCollapse = function () {
    	reportDialogCtrl.products.forEach(function (product) {
    		var obj = new Object();
    		obj.key = product.barCode;
    		obj.value = false;
            obj.batches = reportDialogCtrl.getBatches(product.barCode);
    		reportDialogCtrl.flagCollapse.push(obj);
    	});
    };

    reportDialogCtrl.invertFlagCollapse = function (barCode) {
        var aux;
    	for (var i = reportDialogCtrl.flagCollapse.length - 1; i >= 0; i--) {
            aux = reportDialogCtrl.flagCollapse[i];
    		if (aux.key === barCode) {
    			aux.value = !aux.value;
    			break;
    		}
    	}
        if (aux.value) reportDialogCtrl.getBatches(barCode);
    };

    reportDialogCtrl.getFlagCollapse = function (barCode) {
    	for (var i = reportDialogCtrl.flagCollapse.length - 1; i >= 0; i--) {
    		if (reportDialogCtrl.flagCollapse[i].key === barCode) {
    			return reportDialogCtrl.flagCollapse[i].value;
    			break;
    		}
    	}
    };

    reportDialogCtrl.getBatches = function (barCode) {
        ProductService.getBatchesByProduct(barCode)
            .then(function successCallback(response) {
                reportDialogCtrl.productBatches[barCode] = response;
            }, function errorCallback(error) {
        });
    };

    reportDialogCtrl.getBatchesFlagCollapse = function (barCode) {
        for (var i = reportDialogCtrl.flagCollapse.length - 1; i >= 0; i--) {
            if (reportDialogCtrl.flagCollapse[i].key === barCode) {
                return reportDialogCtrl.flagCollapse[i].batches;
                break;
            }
        }
    };

    reportDialogCtrl.insertFlagCollapse();
});