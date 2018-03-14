app.controller("ProductCtrl", function ($scope, $uibModal, $http, toastr,$location, ProductService, AuthService, ProductStatus, CategoryService) {
    
    var productCtrl = this;
    productCtrl.productsList = [];
    productCtrl.categoriesList = [];
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
        ProductService.getAllProducts()
            .then(function successCallback(response) {
                productCtrl.productsList = response.data;
            }, function errorCallback(error) {
            });
    };

    var loadCategoriesList = function () {
        
    }
    productCtrl.loadCategoriesList = function () {
        CategoryService.getAllCategories()
            .then(function successCallback(response) {
                productCtrl.categoriesList = response.data;
                console.log(response.data);
            }, function errorCallback(error) {
            });
    }
    
    productCtrl.productsListIsEmpty = function () {
        return _.isEmpty(productCtrl.productsList);
    };

    productCtrl.orderProductsBy = function (field) {
        productCtrl.criterion = field;
        productCtrl.orderDirection = !productCtrl.orderDirection;
    };

    productCtrl.getProductPrice = function(product) {
        var price = '';
        if (product.statusCode ==  ProductStatus.AVAILABLE.key) {
            price = product.price*product.discountMultiplyer;
            var priceString = "R$" + intToStringWith2DecimalDigits(price);
        }

        return priceString;
    }

    function intToStringWith2DecimalDigits(number) {
        return number.toFixed(2)
    }

    productCtrl.getProductStatus = function(product) { //Ver a lista da createProductDialogController
        if (product.statusCode === ProductStatus.AVAILABLE.value ) return  ProductStatus.AVAILABLE.label;
        if (product.statusCode === ProductStatus.UNAVAILABLE.value ) return  ProductStatus.UNAVAILABLE.label;
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

    productCtrl.openDiscountDialog = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Mudar desconto',
            ariaDescribedBy: 'Tabela para mudança de desconto',
            templateUrl: 'app/core/main/views/discountDialogView.html',
            controller: 'DiscountDialogCtrl',
            controllerAs: 'discountDialogCtrl',
            resolve: {
                categories: function () {
                    return angular.copy(productCtrl.categoriesList);
                }
            }
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

    productCtrl.openReportSupermarketDialog = function(products) {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Relatório',
            ariaDescribedBy: 'Relatório Geral do Supermercado',
            templateUrl: 'app/core/main/views/reportSupermarketDialogView.html',
            controller: 'ReportSupermarketDialogCtrl',
            controllerAs: 'reportDialogCtrl',
            resolve: {
                products: function () {
                    return angular.copy(products);
                }
            }
        });
    };

    productCtrl.openAssignProductPriceDialog = function(product) {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Atribuir preço a Produto',
            ariaDescribedBy: 'Formulario para Atribuir preço a Produto',
            templateUrl: 'app/core/main/views/updateProductPriceDialogView.html',
            controller: 'UpdateProductPriceDialogCtrl',
            controllerAs: 'updateDialogCtrl',
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

    productCtrl.openCreateBatchDialog = function(product) {

        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Criar lote',
            ariaDescribedBy: 'Formulario para criar lote',
            templateUrl: 'app/core/main/views/createBatchView.html',
            controller: 'BatchController as batchCtrl',
            resolve: {
                product: product
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