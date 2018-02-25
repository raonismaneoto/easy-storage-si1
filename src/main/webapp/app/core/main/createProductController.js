app.controller("CreateProductCtrl", function ($uibModalInstance, $http, toastr, mainService) {

    var vm = this;

    vm.product = {};

    vm.listaDeSituacoes = [
        {
            nome: "Disponivel",
            valor: 1
        }, {
            nome: "Em Falta",
            valor: 2
        }
    ];

    this.createProduct = function (product) {

        mainService.createProduct(product)
            .then(function success(response) {
                if (response.status === 201) {
                    toastr.success("Produto adicionado com sucesso!");
                    vm.product = {};
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