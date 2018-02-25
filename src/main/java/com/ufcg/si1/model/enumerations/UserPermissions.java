package com.ufcg.si1.model.enumerations;
import exceptions.NonExistentObjectException;

public enum UserPermissions {
    ADMIN(1),
    CLIENT(2);

    private final int permissionCode;

    UserPermissions(int permissionCode) {
        this.permissionCode = permissionCode;
    }

    public int getPermissionCode() {
        return this.permissionCode;
    }

    public static UserPermissions getByPermissionCode(int permissionCode) throws NonExistentObjectException {
        for (UserPermissions permission : UserPermissions.values()) {
            if (permission.getPermissionCode() == permissionCode) {
                return permission;
            }
        }
        throw new NonExistentObjectException("Invalid Permission Code");
    }
}