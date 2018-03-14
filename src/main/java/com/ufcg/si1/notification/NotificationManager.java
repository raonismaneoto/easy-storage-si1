package com.ufcg.si1.notification;

import java.util.ArrayList;
import java.util.List;

import com.ufcg.si1.model.Admin;

public class NotificationManager {
	
	private List<Admin> admins;

	private static NotificationManager notificationManager;

	private NotificationManager() {
		admins = new ArrayList<Admin>();
	}

	public static NotificationManager getNotificableManager() {
		if (notificationManager == null) {
			notificationManager = new NotificationManager();
		}
		return notificationManager;
	}

	public void subscribe(Admin admin) {
		admins.add(admin);
	}
	
	public void unsubscribe(Admin admin) {
		admins.remove(admin);
	}
	
	public List<Admin> getAdmins() {
		return admins;
	}
}
