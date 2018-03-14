package com.ufcg.si1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import com.ufcg.si1.notification.Notification;

@Service("notificationService")
public class NotificationServiceImpl implements NotificationService {

	@Autowired
	private DataBaseOperations dataBaseOperations;
	
	@Override
	public Notification saveNotification(Notification notification) {
		return dataBaseOperations.saveNotification(notification);
	}

	@Override
	public Notification getNotification(long id) {
		return dataBaseOperations.getNotification(id);
	}

	@Override
	public List<Notification> getNotifications() {
		return dataBaseOperations.getNotifications();
	}

	@Override
	public void deleteNotification(long id) {
		dataBaseOperations.deleteNotification(id);
	}

}
