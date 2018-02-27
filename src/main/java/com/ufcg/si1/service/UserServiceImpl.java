package com.ufcg.si1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import com.ufcg.si1.model.User;

import exceptions.NonExistentObjectException;
import exceptions.WrongPasswordException;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private DataBaseOperations dataBaseOperations;
    
    public User saveUser(User user) {
    	return dataBaseOperations.saveUser(user);
    }
    
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

