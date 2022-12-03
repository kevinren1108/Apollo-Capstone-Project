package com.apollo.contoller;

import com.alibaba.fastjson.JSONObject;
import com.apollo.pojo.enity.LoginUser;
import com.apollo.util.RedisCache;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testcontroller {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private RedisCache redisCache;
    @RequestMapping("/")
 public String test(){
        String s =passwordEncoder.encode("1");
////$2a$10$WhOcA72ieeUP8UACQ50bzu37lVq6rdsqBrR5vCa0qiVmjmTS0Quxm
        return s;}
    @RequestMapping("/2")
    public String test2(){
        LoginUser loginUser = redisCache.getCacheObject("LoginUser:id:" +2);
        String i =loginUser.getUser().getRole();
        
        return i;

}





}
