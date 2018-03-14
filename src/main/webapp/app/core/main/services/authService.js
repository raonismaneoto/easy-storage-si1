'use strict';

/**
 * All HTTP Requests related to authentication
 */
(function () {
    var app = angular.module("efApp");

    app.service("AuthService", function AuthService($http, $q, BASE_SERVER_URL) {
        var authService = this;

        /* The user currently logged in */
        authService.user = new User();

        /**
         * Tries to log in a user
         * @param username - The user unique login
         * @param password - The user password
         */
        authService.getUser = function getUser(username, password) {
            var deffered = $q.defer();
            $http.get(BASE_SERVER_URL + "/user/find?username=" + username + "&password=" + password).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        /**
         * Creates a new user with administrator privileges
         * @param admin - The user object
         */
        authService.subscribeAdmin = function subscribeAdmin(admin) {
            var deffered = $q.defer();
            $http.post(BASE_SERVER_URL + "/user/create/admin?username=" + admin.username, admin).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };

        /**
         * Creates a new user with client privileges
         * @param client - The user object
         */
        authService.subscribeClient = function subscribeClient(client) {
            var deffered = $q.defer();
            $http.post(BASE_SERVER_URL + "/user/create/client?username=" + client.username, client).then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        };


        /**
         * Exits the current user session
         */
        authService.logout = function logout() {
            var deffered = $q.defer();
            $http.delete(BASE_SERVER_URL + "/user/logout").then(function success(response) {
                deffered.resolve(response.data);
            }, function error(response) {
                deffered.reject(response.data);
            });
            return deffered.promise;
        }

        /**
         * Returns true if the current user is an administrator
         */
        authService.isAdmin = function isAdmin() {
            return authService.user.isAdmin();
        }

        /**
         * Updates then returns the user that is currently logged in
         */
        function getLastUser() {
            $http.get(BASE_SERVER_URL + "/user/lastuser").then(function success(response) {
                if(response.data.userName) {
                    authService.user = new User(response.data);
                }
            });
        }

        getLastUser();

    })
})();