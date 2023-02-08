package com.apollo.service.impl;

import com.apollo.mapper.UserMapper;
import com.apollo.pojo.enity.LoginUser;
import com.apollo.pojo.enity.User;
import com.apollo.service.userService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
@Transactional(rollbackFor = Exception.class)
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    userService userService;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //根据用户名查询用户信息
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("name",username);
        System.out.println(queryWrapper);

        User user = userMapper.selectOne(queryWrapper);
        //判断是否查到用户  如果没查到抛出异常

        if (Objects.isNull(user)) {
            throw new RuntimeException("The user does not exist.");
        }

     return new LoginUser(user,null);   //返回用户信息
    }
}
