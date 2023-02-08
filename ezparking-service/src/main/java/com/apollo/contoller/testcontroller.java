package com.apollo.contoller;

import com.apollo.pojo.ResponseResult;
import com.apollo.pojo.enity.*;
import com.apollo.util.RedisCache;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class testcontroller {
@RequestMapping("/")
   private String test(){
   return "this is a test api";
}






















   }




