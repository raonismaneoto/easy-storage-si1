package com.ufcg.si1.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;

import com.ufcg.si1.model.enumerations.UserPermissions;
import com.ufcg.si1.notification.Notification;

@Entity
public class Admin extends User {
	
	@ManyToMany
	private List<Notification> notifications;

	public Admin() {
		notifications = new ArrayList<Notification>();
	}

	public Admin(String username, String password) {
		this.username = username;
		this.password = password;
		this.permission = UserPermissions.ADMIN;
	}

	public Admin(String username, String password, List<Notification> notifications) {
		this.username = username;
		this.password = password;
		this.permission = UserPermissions.ADMIN;
		this.notifications = notifications;
	}

	public void setProperties(String username) {
		this.username = username;
		this.permission = UserPermissions.ADMIN;
	}

	public void handleNotification(Notification notification) {
		notifications.add(notification);
	}

}