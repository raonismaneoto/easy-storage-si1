
/**
 * Controller for the modal dialog responsible for updating price of product
 */
app.controller("UpdateProductPriceDialogCtrl", function ($uibModalInstance, ProductService, toastr, product) {

    var updateDialogCtrl = this;

    updateDialogCtrl.product = product;

    /**
     * Updates an existing product
     * @param product - the product to be edited
     */
    updateDialogCtrl.submit = function (product) {

        ProductService.updateProduct(product.barCode, product)
            .then(function success(response) {

                if (response.status === 200) {
                    toastr.success("Produto editado com sucesso!");
                    $uibModalInstance.close({
                        status: 200,
                        newProduct: response.data
                    });
                }
            }, function error(error) {
                toastr.error("Problemas ao tentar atribuir preço ao produto: " + product.id);
            });

    };

    /**
     * Closes the current modal
     */
    updateDialogCtrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});