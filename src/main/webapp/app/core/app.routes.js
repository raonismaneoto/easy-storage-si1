app.config(function ($routeProvider) {
    $routeProvider.when("/",{
      templateUrl: "app/core/main/views/productView.html",
      controller: "ProductCtrl as productCtrl"
    }).when("/products",{
        templateUrl: "app/core/main/views/productView.html",
        controller: "ProductCtrl as productCtrl"
    }).otherwise({
        redirectTo: '/'
    });
});
