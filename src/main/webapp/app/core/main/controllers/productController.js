app.controller("ProductCtrl", function ($scope, $uibModal, $http, toastr,$location, mainService, AuthService) {
    
    var productCtrl = this;
    
    $scope.PRODUCT_UNAVAILABLE = "Em Falta"
    $scope.PRODUCT_AVAILABLE = "Disponivel"
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
            });
    };
    $scope.orderProductsBy = function (field) {
        $scope.criterion = field;
        $scope.orderDirection = !$scope.orderDirection;
    };

    $scope.getProductPrice = function(product) {
        var price = 0.0
        if (product.price) {
            price = product.price;
        }
        var priceString = price.toFixed(2); //com 2 casa decimais
        return priceString;
    }

    $scope.getProductStatus = function(product) { //Ver a lista da createProductDialogController
        if (product.statusCode === 1 ) return  $scope.PRODUCT_AVAILABLE;
        if (product.statusCode === 2 ) return  $scope.PRODUCT_UNAVAILABLE;
        
    }

    $scope.openCreateProductDialog = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Adicionar Produto',
            ariaDescribedBy: 'Formulario para adição de um novo produto',
            templateUrl: 'app/core/main/views/createProductDialogView.html',
            controller: 'CreateProductDialogCtrl',
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
            templateUrl: 'app/core/main/views/loginView.html',
            controller: '',
            controllerAs: ''
        });
    };

    $scope.openRegisterDialog = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Register',
            ariaDescribedBy: 'Formulário de Registo do Usuário',
            templateUrl: 'app/core/main/views/registerView.html',
            controller: '',
            controllerAs: ''
        });
    };

    $scope.openAssignProductPriceDialog = function(product) {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Atribuir preço a Produto',
            ariaDescribedBy: 'Formulario para Atribuir preço á Produto',
            templateUrl: 'app/core/main/views/updateProductPriceDialogView.html',
            controller: 'UpdateProductPriceDialogCtrl',
            resolve: {
                product: function () {
                    return angular.copy(product);
                }
            }
        });

        modalInstance.result.then(function (result) {
            if (result.status === 200) {
                loadProductsList();
            }
        });
    };

    $scope.searchProductById = function(id) {
        mainService.getProductById(id)
            .then(function successCallback(response) {
                $scope.productsList = [
                    response.data
                ]
            }, function errorCallback(error) {
                if (error.status === 404) {
                    toastr.error(error.data.errorMessage);
                } else if (error.status === 400) {
                    toastr.error("Produto não encontrado");
                }
            });
    };

    $scope.openCreateBatchDialog = function(product) {

        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Criar lote',
            ariaDescribedBy: 'Formulario para criar lote',
            templateUrl: 'app/core/main/views/createBatchView.html',
            controller: 'BatchController',
            resolve: {
                product: function () {
                    return angular.copy(product);
                }
            }
        });

        modalInstance.result.then(function (result) {
            if (result.status === 201) {
                loadProductsList();
            }
        });
    };

    productCtrl.isAdmin = function isAdmin() {
        return AuthService.isAdmin();
    }


    loadProductsList();
});