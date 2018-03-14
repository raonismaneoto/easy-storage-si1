'use strict';

/**
 * Controller responsible for the login
 */
(function () {
    var app = angular.module("efApp");

    app.controller("LoginController", function LoginController(AuthService, NotificationService, toastr, $uibModalInstance) {
        var loginCtrl = this;

        /**
         * Tries to log in
         */
        loginCtrl.login = function login() {
            if(canLogin()) {
                AuthService.getUser(loginCtrl.username, loginCtrl.password).then(function success(response) {
                    AuthService.user = new User(response);
                    toastr.success("Login efetuado com sucesso");
                }, function error(response) {
                    toastr.error("Nome e/ou senha inválidos");
                });
            }
            clearFields();
            $uibModalInstance.dismiss('cancel');
        };

        /**
         * Tries to register a new administrator
         */
        loginCtrl.subscribeAdmin = function subscribeAdmin() {
            if(isPasswordValid()) {
                var user = createUser();
                AuthService.subscribeAdmin(user).then(function success(response) {
                    var newUser = new User(response);
                	AuthService.user = newUser;
                	NotificationService.subscribe(newUser).then(function success(response) {}, function error(response) {});
                    toastr.success("Cadastro realizado com sucesso");
                }, function error(response) {
                    toastr.error("Não foi possível realizar o cadastro");
                });
            } else {
                alert("As senhas não conferem");
            }
            clearFields();
            $uibModalInstance.dismiss('cancel');
        };

        /**
         * Tries to register a new client
         */
        loginCtrl.subscribeClient = function subscribeClient() {
            if(isPasswordValid()) {
                var user = createUser();
                AuthService.subscribeClient(user).then(function success(response) {
                    AuthService.user = new User(response);
                    toastr.success("Cadastro realizado com sucesso");
                }, function error(response) {
                    toastr.error("Não foi possível realizar o cadastro");
                })
            } else {
                toastr.error("As senhas não conferem.");
            }
            clearFields();
            $uibModalInstance.dismiss('cancel');
        };

        /**
         * Returns true if all login fields are valid
         */
        function canLogin() {
            var loginAllowed = true;

            if(!loginCtrl.username || _.isEmpty(loginCtrl.username)) {
                loginAllowed = false;
            }
            if(!loginCtrl.password || _.isEmpty(loginCtrl.password)) {
                loginAllowed = false;
            }

            return loginAllowed;
        }

        /**
         * Returns true if the password and its confirmation are equal
         */
        function isPasswordValid() {
            return loginCtrl.password === loginCtrl.confirmPassword;
        }

        /**
         * Creates a new instance of the User class
         */
        function createUser() {
            return new User({
                username: loginCtrl.username,
                password: loginCtrl.password
            });
        }

        /**
         * Clears the login fields
         */
        function clearFields() {
            loginCtrl.username = "";
            loginCtrl.password = "";
            loginCtrl.confirmPassword = "";
        }
    });
})();