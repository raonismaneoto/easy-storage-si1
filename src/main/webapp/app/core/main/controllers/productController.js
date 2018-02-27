app.controller("ProductCtrl", function ($uibModal, $http, toastr,$location, mainService) {

    var productCtrl = this;

    productCtrl.PRODUCT_UNAVAILABLE = "Em Falta"
    productCtrl.PRODUCT_AVAILABLE = "Disponivel"
    productCtrl.productsList = [];
    productCtrl.produtos = [];
    productCtrl.criteria = [
        {
            show: 'Nome',
            attribute: 'name'
        }, {
            show: 'Preço',
            attribute: 'price'
        }, {
            show: 'Categoria',
            attribute: 'category'
        }
    ];

    var loadProductsList = function () {
        mainService.getAllProducts()
            .then(function successCallback(response) {
                productCtrl.productsList = response.data;
            }, function errorCallback(error) {
            });
    };
    productCtrl.orderProductsBy = function (field) {
        productCtrl.criterion = field;
        productCtrl.orderDirection = !productCtrl.orderDirection;
    };

    productCtrl.getProductPrice = function(product) {
        var price = 0.0
        if (product.price) {
            price = product.price;
        }
        var priceString = price.toFixed(2); //com 2 casa decimais
        return priceString;
    }

    productCtrl.getProductStatus = function(product) { //Ver a lista da createProductDialogController
        if (product.statusCode === 1 ) return  productCtrl.PRODUCT_AVAILABLE;
        if (product.statusCode === 2 ) return  productCtrl.PRODUCT_UNAVAILABLE;
        
    }

    productCtrl.openCreateProductDialog = function() {
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

    productCtrl.openLoginDialog = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Login',
            ariaDescribedBy: 'Formulário de Autenticação do Usuário',
            templateUrl: 'app/core/main/views/loginView.html',
            controller: '',
            controllerAs: ''
        });
    };

    productCtrl.openRegisterDialog = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Register',
            ariaDescribedBy: 'Formulário de Registo do Usuário',
            templateUrl: 'app/core/main/views/registerView.html',
            controller: '',
            controllerAs: ''
        });
    };

    productCtrl.openAssignProductPriceDialog = function(product) {
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

    productCtrl.searchProductById = function(id) {
        mainService.getProductById(id)
            .then(function successCallback(response) {
                productCtrl.productsList = [
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

    productCtrl.openCreateBatchDialog = function(product) {

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


    loadProductsList();
});