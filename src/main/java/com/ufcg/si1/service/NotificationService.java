package com.ufcg.si1.service;

import java.util.List;

import com.ufcg.si1.notification.Notification;

public interface NotificationService {
	Notification saveNotification(Notification notification);

	Notification getNotification(long id);

	List<Notification> getNotifications();

	void deleteNotification(long id);
}
