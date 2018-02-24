package com.ufcg.si1.model.enumerations;

import exceptions.NonExistentObjectException;

public enum Status {
    AVAILABLE(1),
    UNAVAILABLE(2);

    private final int statusCode;

    Status(int statusCode) {
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public static Status getByStatusCode(int statusCode) throws NonExistentObjectException {
        for (Status status : Status.values()) {
            if (status.getStatusCode() == statusCode) {
                return status;
            }
        }
        throw new NonExistentObjectException("Invalid Status Code");
    }
}