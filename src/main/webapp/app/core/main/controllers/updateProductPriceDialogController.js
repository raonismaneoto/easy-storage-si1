app.controller("UpdateProductPriceDialogCtrl", function ($scope, $uibModalInstance, ProductService, toastr, product) {

    $scope.product = product;

    $scope.submit = function (product) {


        ProductService.updateProductById(product.id, product)
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

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});