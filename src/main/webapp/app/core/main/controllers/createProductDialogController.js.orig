<<<<<<< HEAD
app.controller("CreateProductDialogCtrl", function ($uibModalInstance, $http, toastr, ProductService) {
=======
app.controller("CreateProductDialogCtrl", function ($uibModalInstance, $http, toastr, 
    mainService, AuthService) {
>>>>>>> master

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
<<<<<<< HEAD

        ProductService.createProduct(product)
=======
        if(AuthService.isAdmin()) {
            mainService.createProduct(product)
>>>>>>> master
            .then(function success(response) {
                if (response.status === 201) {
                    toastr.success("Produto adicionado com sucesso!");
                    viewModel.product = {};
                    $uibModalInstance.close(201);
                }
            }, function error(error) {
                toastr.error("Problemas ao tentar adicionar produto.");
            });
        } else {
            toastr('Função destinada apenas a administradores.');
        }
    };

    viewModel.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
