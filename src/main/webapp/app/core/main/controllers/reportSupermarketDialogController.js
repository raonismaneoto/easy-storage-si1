app.controller("ReportSupermarketDialogCtrl", function ($uibModalInstance, ProductService, toastr, products) {

    var reportDialogCtrl = this;

    reportDialogCtrl.products = products;
    reportDialogCtrl.flagCollapse = [];

    reportDialogCtrl.close = function () {
        $uibModalInstance.dismiss('close');
    };

    reportDialogCtrl.insertFlagCollapse = function () {
    	reportDialogCtrl.products.forEach(function (product) {
    		var obj = new Object();
    		obj.key = product.barCode;
    		obj.value = false;
    		reportDialogCtrl.flagCollapse.push(obj);
    	});
    };

    reportDialogCtrl.invertFlagCollapse = function (barCode) {
    	for (var i = reportDialogCtrl.flagCollapse.length - 1; i >= 0; i--) {
    		if (reportDialogCtrl.flagCollapse[i].key === barCode) {
    			reportDialogCtrl.flagCollapse[i].value = !reportDialogCtrl.flagCollapse[i].value;
    			break;
    		}
    	}
    };

    reportDialogCtrl.getFlagCollapse = function (barCode) {
    	for (var i = reportDialogCtrl.flagCollapse.length - 1; i >= 0; i--) {
    		if (reportDialogCtrl.flagCollapse[i].key === barCode) {
    			return reportDialogCtrl.flagCollapse[i].value;
    			break;
    		}
    	}
    };

    reportDialogCtrl.insertFlagCollapse();
});