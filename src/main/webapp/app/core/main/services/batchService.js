app.factory("batchService", function ($http,BASE_SERVER_URL, AuthService) {

    return {
        createBatch: _createBatch
    };
    
    function _createBatch(product, batch) {
        return $http.post("/api/product/" + product.id + "/batch", JSON.stringify(batch))
    }
});