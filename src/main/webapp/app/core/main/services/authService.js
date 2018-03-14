'use strict';

(function () {
    var app = angular.module("efApp");

    app.service("AuthService", function AuthService($http, $q) {
        var authService = this;

        authService.user = new User();

        authService.getUser = function getUser(username, password) {
            var deffered = $q.defer();
            $http.get('/api/user/find?username=' + username + "&password=" + password).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        authService.subscribeAdmin = function subscribeAdmin(admin) {
            var deffered = $q.defer();
            $http.post("/api/user/create/admin?username=" + admin.username, admin).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        authService.subscribeClient = function subscribeClient(client) {
            var deffered = $q.defer();
            $http.post("/api/user/create/client?username=" + client.username, client).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        authService.logout = function logout() {
            var deffered = $q.defer();
            $http.delete("/api/user/logout").then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        }

        authService.isAdmin = function isAdmin() {
            return authService.user.isAdmin();
        }

        authService.getCurrentUser = function getCurrentUser() {
        	return authService.getLastUser();
        }
        
        function getLastUser() {
            $http.get("/api/user/lastuser").then(function success(response) {
                if(response.data.userName) {
                    authService.user = new User(response.data);
                }
            });
        }

        getLastUser();

    })
})();