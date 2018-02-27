app.factory("productService", function ($http,BASE_SERVER_URL, AuthService) {

    return {
        getAllProducts: _getAllProducts,
        updateProductById: _updateProductById,
        getProductById: _getProductById,
        createProduct: _createProduct
    };
    
    function _getAllProducts() {
        return $http.get(BASE_SERVER_URL + "/product/")
    }

    function _updateProductById(id, data) {
        return $http.put(BASE_SERVER_URL + "/product/" + id, data)
    }

    function _getProductById(id) {
        return $http.get("/api/product/" + id)
    }
    
    function _createProduct(product) {
        return $http.post("/api/product/", JSON.stringify(product))
    }
});