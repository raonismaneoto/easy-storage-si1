package com.ufcg.si1.model;
import javax.persistence.Entity;

import com.ufcg.si1.model.enumerations.UserPermissions;

import java.util.ArrayList;

@Entity
public class Client extends User {

    public Client() {}

    public Client(String username, String password) {
        this.username = username;
        this.password = password;
        this.permission = UserPermissions.CLIENT;
    }

    public void setProperties(String username) {
        this.username = username;
        this.permission = UserPermissions.CLIENT;
    }
}