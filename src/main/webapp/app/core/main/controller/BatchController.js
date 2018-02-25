app.controller("BatchController", function ($scope, $uibModalInstance, $http, toastr, product, mainService) {

    $scope.produto = product;
    $scope.dateformat = 'dd/MM/yyyy';
    $scope.datePicker = {
        opened : false
    };

    $scope.expirationDate = new Date();
    $scope.numberOfItens = 0;

    $scope.dateOptions = {
        formatYear: 'yy',
        minDate: new Date(),
        startingDay: 1
    };

    $scope.submit = function (expirationDate, numberOfItems) {
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

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.openDatePicker = function () {
        $scope.datePicker.opened = true;
    }
});
