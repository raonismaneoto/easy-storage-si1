'use strict';

(function () {
    var app = angular.module("efApp");
    
    app.controller("NotificationController", function NotificationController (NotificationService, toastr) {
    	var notificationCtrl = this;
    	
    	notificationCtrl.notification = {
    		message: "Bagui é doido mermo, mermão"
    	}
    	
    	notificationCtrl.saveNotification = function saveNotification(notification) {
    		NotificationService.saveNotification(notification).then(function success(response) {
    			toastr.success("Notificação Criada com Sucesso");
            }, function error(response) {
                toastr.error("Problema na criaçao da notificação");
            })
    	}	
    });
})();