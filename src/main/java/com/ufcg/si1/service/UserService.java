package com.ufcg.si1.service;

import com.ufcg.si1.model.User;

import exceptions.NonExistentObjectException;

public interface UserService {

    boolean userAlreadyExists(String username);

    User getCurrentUser(String username, String password) throws NonExistentObjectException;
}