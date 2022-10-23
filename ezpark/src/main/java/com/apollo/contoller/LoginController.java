package com.apollo.contoller;

import com.apollo.pojo.ResponseResult;
import com.apollo.pojo.enity.User;
import com.apollo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseResult login(@RequestBody User user){
   //User user1=new User((long)1,"1","1","1");
        return loginService.login(user);




    }
}
