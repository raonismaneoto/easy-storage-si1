'use strict';

(function () {
    var app = angular.module("efApp");

    app.controller("AuthController", function AuthController ($uibModal, AuthService) {
        var authCtrl = this;

        authCtrl.openLoginDialog = function openLoginDialog() {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'Login',
                ariaDescribedBy: 'Formulário de Autenticação do Usuário',
                templateUrl: 'app/core/main/views/loginView.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            });
        };
    
        authCtrl.openRegisterDialog = function openRegisterDialog() {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'Register',
                ariaDescribedBy: 'Formulário de Registo do Usuário',
                templateUrl: 'app/core/main/views/registerView.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            });
        };

        authCtrl.isLogged = function isLogged() {
            if(!AuthService.user.userName || _.isEmpty(AuthService.user.userName)) {
                return false;
            }
            return true;
        }

        authCtrl.logout = function logout() {
            AuthService.logout().then(function success(response) {
                AuthService.user = {};
                alert("Logout efetuado com sucesso.");
            });
        }
    });
})();