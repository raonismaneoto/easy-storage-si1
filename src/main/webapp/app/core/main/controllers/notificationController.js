'use strict';

(function () {
    var app = angular.module("efApp");
    
    app.controller("NotificationController", function NotificationController (NotificationService, toastr) {
    	var notificationCtrl = this;
    	
    	notificationCtrl.notifications = [];
    	
    	notificationCtrl.notification = { message: "" };
    	
    	notificationCtrl.saveNotification = function saveNotification(notification) {
    		NotificationService.saveNotification(notification).then(function success(response) {
    			toastr.success("Notificação Criada com Sucesso");
            }, function error(response) {
                toastr.error("Problema na criaçao da notificação");
            })
    	}	
    	
    	var findAll = function findAll() {
    		NotificationService.findAll().then(function success(response) {
    			notificationCtrl.notifications = response;
            }, function error(response) {
                toastr.error("Erro ao carregar a lista de notificações");
            })
    	}
    	
    	findAll();
    });
})();