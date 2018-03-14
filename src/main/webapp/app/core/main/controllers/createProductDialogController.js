
/**
 * Controller for the dialog responsible for creating a product
 */
app.controller("CreateProductDialogCtrl", function ($uibModalInstance, $http, toastr, ProductService, AuthService) {

    var viewModel = this;

    viewModel.product = {};

    /**
     * Creates a product
     * @param product - the product to be created
     */
    viewModel.createProduct = function (product) {
        if(AuthService.isAdmin()) {
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
        } else {
            toastr('Função destinada apenas a administradores.');
        }
    };

    /**
     * Closes the current modal
     */
    viewModel.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
