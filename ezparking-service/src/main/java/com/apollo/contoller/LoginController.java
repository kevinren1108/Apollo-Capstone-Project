package com.apollo.contoller;

import com.apollo.mapper.UserMapper;
import com.apollo.pojo.ResponseResult;
import com.apollo.pojo.enity.User;
import com.apollo.service.LoginService;
import com.apollo.service.userService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fasterxml.jackson.databind.deser.std.StdNodeBasedDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.regex.Pattern;

@RestController
public class LoginController {
    @Autowired
    private LoginService loginService;
    @Autowired
    private userService userService;
    @Autowired
    UserMapper userMapper;
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @ResponseBody
    public ResponseResult login(@RequestBody User user){
        System.out.println("i am "+ user.getName());
   //User user1=new User((long)1,"1","1","1");
        return loginService.login(user);

    }
    @GetMapping("/register")
    //只需要 用户名 密码 和 邮箱
    public  ResponseResult Register(@RequestBody User user){
        System.out.println("i am "+user.getName());
        //为该接口注册用户设定角色
        user.setRole("student");
     //账户重复验证
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("name",user.getName());
        if(userMapper.selectCount(queryWrapper)>0){
            return ResponseResult.errorResult(400,"The user name has been registered. ");
        }

     //邮箱格式验证
        String REGEX="^\\w+((-\\w+)|(\\.\\w+))*@\\w+(\\.\\w{2,3}){1,3}$";
         boolean checkEmail=  Pattern.matches(REGEX, user.getEmail());

         if (checkEmail==false){return ResponseResult.errorResult(400,"Incorrect email format");}
         user.setPassword( passwordEncoder.encode(user.getPassword()));
         userService.save(user);

        return ResponseResult.okResult(200,"registered successfully");
    }

}
