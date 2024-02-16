package com.example.backend.controllers;

import com.example.backend.dtos.UserLoginDTO;
import com.example.backend.dtos.UserRegisterDTO;
import com.example.backend.entities.User;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @PostMapping(path = "register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegisterDTO user) {
        User createdUser = userService.registerUser(user);

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping(path = "login")
    public ResponseEntity<User> loginUser(@RequestBody UserLoginDTO userLoginDTO) {
        User loggedUser = userService.loginUser(userLoginDTO);

        return new ResponseEntity<>(loggedUser, HttpStatus.ACCEPTED);
    }
}
