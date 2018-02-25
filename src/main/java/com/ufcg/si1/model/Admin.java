package com.ufcg.si1.model;
import javax.persistence.Entity;

import com.ufcg.si1.model.enumerations.UserPermissions;

import java.util.ArrayList;

@Entity
public class Admin extends User{

    public Admin(){}

    public Admin(String username, String password) {
        this.username = username;
        this.password = password;
        this.permission = UserPermissions.ADMIN;
    }

    public void setProperties(String username) {
        this.username = username;
        this.permission = UserPermissions.ADMIN;
    }

}