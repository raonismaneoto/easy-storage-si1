
/**
 * Controller responsible for the product
 */
app.controller("ProductCtrl", function ($scope, $uibModal, $http, toastr,$location, ProductService, AuthService, ProductStatus) {
    
    var productCtrl = this;
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

    /**
     * Updates the productsList with all the current products
     */
    var loadProductsList = function () {
        ProductService.getAllProducts()
            .then(function successCallback(response) {
                productCtrl.productsList = response.data;
            }, function errorCallback(error) {
            });
    };
    
    /**
     * Returns true if the productsList is empty
     */
    productCtrl.productsListIsEmpty = function () {
        return _.isEmpty(productCtrl.productsList);
    };

    /**
     * Changes the product ordering criteria
     * @param field - The ordering criteria
     */
    productCtrl.orderProductsBy = function (field) {
        productCtrl.criterion = field;
        productCtrl.orderDirection = !productCtrl.orderDirection;
    };

    /**
     * Returns the price of a product in a string format
     * @param product - The product
     */
    productCtrl.getProductPrice = function(product) {
        var price = '';
        if (product.statusCode == 1) {
            price = product.price;
            var priceString = "R$" + intToStringWith2DecimalDigits(price);
        }

        return priceString;
    }

    /**
     * Receives a number and returns a string of it with two decimal digits
     * @param number - The number
     */
    function intToStringWith2DecimalDigits(number) {
        return number.toFixed(2)
    }

    /**
     * Returns the status of a product
     * @param product
     */
    productCtrl.getProductStatus = function(product) {
        if (product.statusCode === ProductStatus.AVAILABLE.value ) return  ProductStatus.AVAILABLE.label;
        if (product.statusCode === ProductStatus.UNAVAILABLE.value ) return  ProductStatus.UNAVAILABLE.label;
    }

    /**
     * Creates a modal dialog for the creation of a product
     */
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

    /**
     * Creates a modal dialog for the user login
     */
    productCtrl.openLoginDialog = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Login',
            ariaDescribedBy: 'Formulário de Autenticação do Usuário',
            templateUrl: 'app/core/main/views/loginView.html',
            controller: '',
            controllerAs: ''
        });
    };

    /**
     * Creates a modal dialog for the user sign up
     */
    productCtrl.openRegisterDialog = function() {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'Register',
            ariaDescribedBy: 'Formulário de Registo do Usuário',
            templateUrl: 'app/core/main/views/registerView.html',
            controller: '',
            controllerAs: ''
        });
    };

    /**
     * Creates a modal dialog for the supermarket report
     * @param products - The products of which the report will be made
     */
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

    /**
     * Creates a modal dialog for the product price assignment
     * @param product - The product which price will be changed
     */
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

    /**
     * Creates a modal dialog for the batch creation
     * @param products - The product of which the new batch will be made of
     */
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

    /**
     * Returns true if the current user is an administrator
     */
    productCtrl.isAdmin = function isAdmin() {
        return AuthService.isAdmin();
    }


    loadProductsList();
});