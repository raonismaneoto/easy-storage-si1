app.factory("mainService", function ($http,BASE_SERVER_URL, AuthService) {

    return {
        getAllProducts: _getAllProducts,
        updateProduct: _updateProduct,
        createProduct: _createProduct,
        createBatch: _createBatch
    };
    
    function _getAllProducts() {
        return $http.get(BASE_SERVER_URL + "/product/findAll")
    }

    function _updateProduct(barCode, data) {
        return $http.put(BASE_SERVER_URL + "/product/update/" + barCode, data)
    }
    
    function _createProduct(product) {
        return $http.post("/api/product/create", JSON.stringify(product))
    }

    function _createBatch(product, batch) {
        return $http.post("/api/product/batch/create/" + product.barCode, JSON.stringify(batch))
    }
});