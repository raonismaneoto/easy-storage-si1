app.controller("UpdateProductPriceDialogCtrl", function ($uibModalInstance, ProductService, toastr, product) {

    var updateDialogCtrl = this;

    updateDialogCtrl.product = product;

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

    updateDialogCtrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});