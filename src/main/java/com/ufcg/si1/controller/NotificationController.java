package com.ufcg.si1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ufcg.si1.model.Admin;
import com.ufcg.si1.notification.Notification;
import com.ufcg.si1.notification.NotificationManager;
import com.ufcg.si1.service.NotificationService;
import com.ufcg.si1.service.NotificationServiceImpl;
import com.ufcg.si1.service.UserService;
import com.ufcg.si1.service.UserServiceImpl;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {
	
	@Autowired
	NotificationService notificationService = new NotificationServiceImpl();
	
	@Autowired
	UserService userService = new UserServiceImpl();
	
	NotificationManager notificationManager = NotificationManager.getNotificableManager();
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ResponseEntity<Notification> saveNotification(@RequestBody Notification notification) {
		notification = notificationService.saveNotification(notification);
		for (Admin admin : notificationManager.getAdmins()) {
			admin.handleNotification(notification);
			userService.saveUser(admin);
		}
		return new ResponseEntity<Notification>(notification, HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/subscribe", method = RequestMethod.POST)
	public ResponseEntity<Admin> subscribeAdmin(@RequestBody Admin admin) {
		notificationManager.subscribe(admin);
		return new ResponseEntity<Admin>(admin, HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(value = "/unsubscribe", method = RequestMethod.POST)
	public ResponseEntity<Admin> unsubscribeAdmin(@RequestBody Admin admin) {
		notificationManager.unsubscribe(admin);
		return new ResponseEntity<Admin>(admin, HttpStatus.ACCEPTED);
	}
	
	
}
