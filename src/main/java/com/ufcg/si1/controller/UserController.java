package com.ufcg.si1.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import exceptions.ObjetoJaExistenteException;
import exceptions.NonExistentObjectException;

import com.ufcg.si1.model.User;
import com.ufcg.si1.service.UserService;
import com.ufcg.si1.service.UserServiceImpl;
import com.ufcg.si1.model.Client;
import com.ufcg.si1.model.Admin;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private DataBaseOperations dataBaseOperations;

    private UserService userService = new UserServiceImpl();

    private User lastUser;

    @RequestMapping(value="/create/client", method=RequestMethod.POST)
    public ResponseEntity<User> createClient(@RequestBody Client client) throws ObjetoJaExistenteException{
        if(userService.userAlreadyExists(client.getUserName())) {
            throw new ObjetoJaExistenteException("The user already exists");
        }
        User userToReturn = dataBaseOperations.saveUser(client);
        this.lastUser = userToReturn;
        return new ResponseEntity<User>(userToReturn, HttpStatus.CREATED);
    }

    @RequestMapping(value="/create/admin", method=RequestMethod.POST)
    public ResponseEntity<User> createAdmin(@RequestBody Admin admin) throws ObjetoJaExistenteException{
        if(userService.userAlreadyExists(admin.getUserName())) {
            throw new ObjetoJaExistenteException("The user already exists");
        }
        User userToReturn = dataBaseOperations.saveUser(admin);
        this.lastUser = userToReturn;
        return new ResponseEntity<User>(userToReturn, HttpStatus.CREATED);
    }

    @RequestMapping(value="/find", method=RequestMethod.GET)
    public ResponseEntity<User> getCurrentUser(@PathVariable("username") String username, 
        @PathVariable("password") String password) throws NonExistentObjectException{
        User currentUser = this.userService.getCurrentUser(username, password);
        lastUser = currentUser;
        return new ResponseEntity(currentUser, HttpStatus.OK);
    }

    @RequestMapping(value="/find/lastuser", method=RequestMethod.GET)
    public ResponseEntity<User> getLastUser() {
        return new ResponseEntity<User>(lastUser, HttpStatus.OK);
    }
}