'use strict';

/**
 * Authentication Controller
 */
(function () {
    var app = angular.module("efApp");

    app.controller("AuthController", function AuthController ($uibModal, AuthService, toastr) {
        var authCtrl = this;
        authCtrl.firstOption = true;

        authCtrl.changeOption = function changeOption(param) {
            if(param === 'product') {
                authCtrl.firstOption = true;
            } else {
                authCtrl.firstOption = false;
            }
        };

        /**
         * Opens a modal with the Login View
         */
        authCtrl.openLoginDialog = function openLoginDialog() {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'Login',
                ariaDescribedBy: 'Formulário de Autenticação do Usuário',
                templateUrl: 'app/core/main/views/loginView.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            });
        };
        
        /**
         * Opens a modal with the Register View
         */
        authCtrl.openRegisterDialog = function openRegisterDialog() {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'Register',
                ariaDescribedBy: 'Formulário de Registo do Usuário',
                templateUrl: 'app/core/main/views/registerView.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            });
        };
        
        authCtrl.openNotificationsDialog = function openNotificationsDialog() {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'Notifications',
                ariaDescribedBy: 'Notificações do Administrador',
                templateUrl: 'app/core/main/views/notificationsView.html',
                controller: 'NotificationController',
                controllerAs: 'notificationCtrl'
            });
        };
        
        authCtrl.openNotificationDialog = function openNotificationDialog() {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'Notification',
                ariaDescribedBy: 'Notificações do Administrador',
                templateUrl: 'app/core/main/views/loginView.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            });
        };

        /**
         * Returns true if some user is logged in, and false otherwise
         */
        authCtrl.isLogged = function isLogged() {
            if(!AuthService.user.userName || _.isEmpty(AuthService.user.userName)) {
                return false;
            }
            return true;
        }

        /**
         * Logs out the current user
         */
        authCtrl.logout = function logout() {
            AuthService.logout().then(function success(response) {
                AuthService.user = new User();
                toastr.success("Logout efetuado com sucesso.");
            });
        }
        
        authCtrl.isAdmin = function isAdmin() {
        	return AuthService.isAdmin();
        }
    });
})();