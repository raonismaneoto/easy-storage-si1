'use strict';

(function () {
    var app = angular.module("efApp");

    app.service("NotificationService", function NotificationService($http, $q) {
        var notificationService = this;

        notificationService.saveNotification = function saveNotification(notification) {
        	var deffered = $q.defer();
    		$http.post('/api/notification/save', notification).then(function success(response) {
    			deffered.resolve(response.data);
    		}, function error(response) {
    			deffered.reject(response.data);
    		});
    		return deffered.promise;
        }
        
        notificationService.subscribe = function subscribe(admin) {
        	var deffered = $q.defer();
    		$http.post('/api/notification/subscribe', admin).then(function success(response) {
    			deffered.resolve(response.data);
    		}, function error(response) {
    			deffered.reject(response.data);
    		});
    		return deffered.promise;
        }
    })
})();