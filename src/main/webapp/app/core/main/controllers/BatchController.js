app.controller("BatchController", function ($uibModalInstance, $http, toastr, product, mainService) {

    var batchCtrl = this;

    batchCtrl.product = product;
    batchCtrl.dateformat = 'dd/MM/yyyy';
    batchCtrl.datePicker = {
        opened : false
    };

    batchCtrl.expirationDate = new Date();
    batchCtrl.numberOfItens = 0;

    batchCtrl.dateOptions = {
        formatYear: 'yy',
        minDate: new Date(),
        startingDay: 1
    };

    batchCtrl.submit = function (expirationDate, numberOfItems) {
        var batch = {
            expirationDate: expirationDate.getDay() + "/" + (expirationDate.getMonth() + 1) + expirationDate.getFullYear(),
            numberOfItens: numberOfItems
        }

        mainService.createBatch(product, batch)
            .then(function success(response) {
                if (response.status === 201) {
                    toastr.success("Lote criado com sucesso!");
                    $uibModalInstance.close({
                        status: 201
                    });
                }
            }, function error(error) {
                toastr.error("Problemas ao tentar adicionar produto.");
            });
    };

    batchCtrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    batchCtrl.openDatePicker = function () {
        batchCtrl.datePicker.opened = true;
    }
});
