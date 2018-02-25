package com.ufcg.si1.model;
import javax.persistence.Id;

import com.ufcg.si1.model.enumerations.UserPermissions;

import javax.persistence.Entity;
import java.util.List;
import javax.persistence.Table;

@Entity
@Table(name="\"User\"")
public abstract class User {

    @Id
    protected String username;

    protected String password;

    protected UserPermissions permission;

    public String getUserName() {
        return this.username;
    }

    public void setUserName(String newUserName) {
        this.username = newUserName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String newPassword) {
        this.password = newPassword;
    }

    public UserPermissions getPermission() {
        return this.permission;
    }

    public void setPermissions(UserPermissions newPermission) {
        this.permission = newPermission;
    }
}