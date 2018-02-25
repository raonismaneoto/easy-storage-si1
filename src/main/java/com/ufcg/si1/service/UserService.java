package com.ufcg.si1.service;

import com.ufcg.si1.model.User;

import org.springframework.stereotype.Service;
import exceptions.NonExistentObjectException;
import exceptions.ObjetoInvalidoException;
import exceptions.WrongPasswordException;
import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import org.springframework.beans.factory.annotation.Autowired;

public interface UserService {

    boolean userAlreadyExists(String username);

    User getCurrentUser(String username, String password) throws NonExistentObjectException;
}