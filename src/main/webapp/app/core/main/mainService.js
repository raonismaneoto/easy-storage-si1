app.factory("mainService", function ($http,BASE_SERVER_URL, AuthService) {

    return {
        getAllProducts: _getAllProducts,
        updateProduct: _updateProduct,
        createProduct: _createProduct,
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
});