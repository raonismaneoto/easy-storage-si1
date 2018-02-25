app.config(function ($routeProvider) {
    $routeProvider.when("/",{
      templateUrl: "app/core/main/view/productView.html",
      controller: "ProductCtrl"
    }).when("/products",{
        templateUrl: "app/core/main/view/productView.html",
        controller: "ProductCtrl"
    }).otherwise({
        redirectTo: '/'
    });
});
