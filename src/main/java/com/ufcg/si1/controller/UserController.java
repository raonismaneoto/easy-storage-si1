package com.ufcg.si1.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
    @Autowired
    private UserService userService = new UserServiceImpl();

    private User lastUser = new Client();

    @RequestMapping(value="/create/client", method=RequestMethod.POST)
    public ResponseEntity<User> createClient(@RequestBody Client client, 
        @RequestParam("username") String username) throws ObjetoJaExistenteException{
        if(userService.userAlreadyExists(username)) {
            throw new ObjetoJaExistenteException("The user already exists");
        }
        // This is due spring-boot and hibernate don't work as expected with heritage
        client.setProperties(username);
        User userToReturn = dataBaseOperations.saveUser(client);
        this.lastUser = userToReturn;
        return new ResponseEntity<User>(userToReturn, HttpStatus.CREATED);
    }

    @RequestMapping(value="/create/admin", method=RequestMethod.POST)
    public ResponseEntity<User> createAdmin(@RequestBody Admin admin, 
        @RequestParam("username") String username) throws ObjetoJaExistenteException{
        if(userService.userAlreadyExists(username)) {
            throw new ObjetoJaExistenteException("The user already exists");
        }
        // This is due spring-boot and hibernate don't work as expected with heritage
        admin.setProperties(username);
        User userToReturn = dataBaseOperations.saveUser(admin);
        this.lastUser = userToReturn;
        return new ResponseEntity<User>(userToReturn, HttpStatus.CREATED);
    }

    @RequestMapping(value="/find", method=RequestMethod.GET)
    public ResponseEntity<User> getCurrentUser(@RequestParam("username") String username, 
        @RequestParam("password") String password) throws NonExistentObjectException{
        User currentUser = userService.getCurrentUser(username, password);
        lastUser = currentUser;
        return new ResponseEntity<User>(currentUser, HttpStatus.OK);
    }

    @RequestMapping(value="/lastuser", method=RequestMethod.GET)
    public ResponseEntity<User> getLastUser() {
        return new ResponseEntity<User>(lastUser, HttpStatus.OK);
    }

    @RequestMapping(value="/logout", method=RequestMethod.DELETE)
    public ResponseEntity<User> logout() {
        this.lastUser = new Client();
        return new ResponseEntity<User>(lastUser, HttpStatus.OK);
    }
}