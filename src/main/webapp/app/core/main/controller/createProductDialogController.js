app.controller("CreateProductDialogCtrl", function ($uibModalInstance, $http, toastr, mainService) {

    var viewModel = this;

    viewModel.product = {};

    viewModel.listaDeSituacoes = [
        {
            label: "Disponivel",
            value: 1
        }, {
            label: "Em Falta",
            value: 2
        }
    ];

    this.createProduct = function (product) {

        mainService.createProduct(product)
            .then(function success(response) {
                if (response.status === 201) {
                    toastr.success("Produto adicionado com sucesso!");
                    viewModel.product = {};
                    console.log(response)
                    $uibModalInstance.close(201);
                }
            }, function error(error) {
                console.log(error);
                toastr.error("Problemas ao tentar adicionar produto.");
            });
    };

    this.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});