package com.ufcg.si1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ufcg.si1.notification.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
