package com.ufcg.si1.service;

import com.ufcg.si1.model.User;
import com.ufcg.si1.service.UserService;

import org.springframework.stereotype.Service;

import exceptions.NonExistentObjectException;
import exceptions.ObjetoInvalidoException;
import exceptions.WrongPasswordException;
import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import org.springframework.beans.factory.annotation.Autowired;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private DataBaseOperations dataBaseOperations;

    public boolean userAlreadyExists(String username) {
        User userResult = dataBaseOperations.getUser(username);
        return userResult != null;
    }

    public User getCurrentUser(String username, String password) throws NonExistentObjectException{
        User currentUser = dataBaseOperations.getUser(username);
        if(currentUser == null) {
            throw new NonExistentObjectException("There is no user with this username");
        }
        if(!currentUser.getPassword().equals(password)) {
            throw new WrongPasswordException("Wrong password.");
        }
        return currentUser;
    }
}

