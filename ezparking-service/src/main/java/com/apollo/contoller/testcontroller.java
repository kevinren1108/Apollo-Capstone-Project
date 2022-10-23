package com.apollo.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testcontroller {
    @Autowired
    PasswordEncoder passwordEncoder;
    @RequestMapping("/")
 public String test(){
        String s =passwordEncoder.encode("1");
////$2a$10$WhOcA72ieeUP8UACQ50bzu37lVq6rdsqBrR5vCa0qiVmjmTS0Quxm
        return s;}
}
