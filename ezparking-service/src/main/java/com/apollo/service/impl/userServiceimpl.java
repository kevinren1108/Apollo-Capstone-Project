package com.apollo.service.impl;

import com.apollo.mapper.UserMapper;
import com.apollo.pojo.enity.User;
import com.apollo.service.userService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Transactional(rollbackFor = Exception.class)
@Service
public class userServiceimpl extends ServiceImpl<UserMapper, User> implements userService {


}
