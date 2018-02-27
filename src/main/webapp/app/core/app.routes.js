app.config(function ($routeProvider) {
    $routeProvider.when("/",{
      templateUrl: "app/core/main/views/productView.html",
      controller: "ProductCtrl",
      controllerAs: "productCtrl"
    }).when("/products",{
        templateUrl: "app/core/main/views/productView.html",
        controller: "ProductCtrl",
        controllerAs: "productCtrl"
    }).otherwise({
        redirectTo: '/'
    });
});
