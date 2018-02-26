'use strict';

(function () {
    var app = angular.module("efApp");

    app.controller("LoginController", function LoginController(AuthService) {
        var loginCtrl = this;

        loginCtrl.login = function login() {
            if(canLogin()) {
                AuthService.getUser(loginCtrl.username, loginCtrl.password).then(function success(response) {
                    AuthService.user = new User(response);
                    alert("Login efetuado com sucesso");
                }, function error(response) {
                    alert("Nome e/ou senha inválidos");
                });
            }
            clearFields();
        };

        loginCtrl.subscribeAdmin = function subscribeAdmin() {
            if(isPasswordValid()) {
                var user = createUser();
                AuthService.subscribeAdmin(user).then(function success(response) {
                    AuthService.user = new User(response);
                    alert("Cadastro realizado com sucesso");
                }, function error(response) {
                    alert("Não foi possível realizar o cadastro");
                });
            } else {
                alert("As senhas não conferem");
            }
            clearFields();
        };

        loginCtrl.subscribeClient = function subscribeClient() {
            if(isPasswordValid()) {
                var user = createUser();
                AuthService.subscribeClient(user).then(function success(response) {
                    AuthService.user = new User(response);
                    alert("Cadastro realizado com sucesso");
                }, function error(response) {
                    alert("Não foi possível realizar o cadastro");
                })
            } else {
                alert("As senhas não conferem.");
            }
            clearFields();
        };

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

        function isPasswordValid() {
            return loginCtrl.password === loginCtrl.confirmPassword;
        }

        function createUser() {
            return new User({
                username: loginCtrl.username,
                password: loginCtrl.password
            });
        }

        function clearFields() {
            loginCtrl.username = "";
            loginCtrl.password = "";
            loginCtrl.confirmPassword = "";
        }
    });
})();