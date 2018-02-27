app.controller("CreateProductDialogCtrl", function ($uibModalInstance, $http, toastr, ProductService) {

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

    viewModel.createProduct = function (product) {

        ProductService.createProduct(product)
            .then(function success(response) {
                if (response.status === 201) {
                    toastr.success("Produto adicionado com sucesso!");
                    viewModel.product = {};
                    $uibModalInstance.close(201);
                }
            }, function error(error) {
                toastr.error("Problemas ao tentar adicionar produto.");
            });
    };

    viewModel.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
