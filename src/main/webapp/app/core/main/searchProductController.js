app.controller("SearchProductCtrl", function ($scope, $uibModal, $http, toastr,$location, mainService) {

    var urlServer = "http://localhost:8080/api/";
    // $scope.title = "Search Product";
    $scope.productsList = [];
    $scope.produtos = [];
    $scope.criteria = [
        {
            show: 'Nome',
            attribute: 'name'
        }, {
            show: 'Preço',
            attribute: 'price'
        }, {
            show: 'Categoria',
            attribute: 'category'
        }];

    var loadProductsList = function () {
        mainService.getAllProducts()
            .then(function successCallback(response) {
                $scope.productsList = response.data;
            }, function errorCallback(error) {
                console.log(error);
            });
    };

    $scope.orderProductsBy = function (field) {
        $scope.criterion = field;
        $scope.orderDirection = !$scope.orderDirection;
    };

    $scope.openCreateProductDialog = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Adicionar Produto',
            ariaDescribedBy: 'Formulario para adição de um novo produto',
            templateUrl: 'app/core/main/createProductView.html',
            controller: 'CreateProductCtrl',
            controllerAs: 'cpCtrl'
        });

        modalInstance.result.then(function (result) {
            if (result === 201) {
              loadProductsList();
            }
        });
    };

    $scope.openLoginDialog = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Login',
            ariaDescribedBy: 'Formulário de Autenticação do Usuário',
            templateUrl: 'app/core/main/loginView.html',
            controller: '',
            controllerAs: ''
        });
    };

    $scope.openRegisterDialog = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Register',
            ariaDescribedBy: 'Formulário de Registo do Usuário',
            templateUrl: 'app/core/main/registerView.html',
            controller: '',
            controllerAs: ''
        });
    };

    $scope.openAtribuirPrecoParaProdutoDialog = function(product) {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Atribuir preço a Produto',
            ariaDescribedBy: 'Formulario para Atribuir preço á Produto',
            templateUrl: 'app/core/main/updateProductPriceView.html',
            controller: 'UpdateProductPriceCtrl',
            resolve: {
                product: function () {
                    return angular.copy(product);
                }
            }
        });

        modalInstance.result.then(function (result) {
            console.log(result)
            if (result.status === 200) {
                loadProductsList();
            }
        });
    };

    $scope.searchProductById = function(id) {
        // Falta implementar
        console.log(id)
        mainService.getProductById(id)
            .then(function successCallback(response) {
                $scope.productsList = [
                    response.data
                ]
                console.error("Não carregou")
            }, function errorCallback(error) {
                console.error(error);
                if (error.status === 404) {
                    console.log(error.data.errorMessage);
                    toastr.error(error.data.errorMessage);
                } else if (error.status === 400) {
                    toastr.error("Produto não encontrado");
                }
            });
    };

    $scope.openCriarLoteDialog = function(product) {

        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Criar lote',
            ariaDescribedBy: 'Formulario para criar lote',
            templateUrl: 'app/core/main/createLoteView.html',
            controller: 'CreateBatchCtrl',
            resolve: {
                product: function () {
                    return angular.copy(product);
                }
            }
        });

        modalInstance.result.then(function (result) {
            console.log(result)
            if (result.status === 201) {
                loadProductsList();
            }
        });
    };

    // $scope.createLot = function(produto) {
    //     console.log(produto)
    // };
    //
    // $scope.atribuirPrice = function(product) {
    //     console.log(product)
    // };

    loadProductsList();
    loadProductsList();
});