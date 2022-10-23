package com.apollo.service;

import com.apollo.pojo.ResponseResult;
import com.apollo.pojo.enity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface LoginService {
    ResponseResult login(User user);
}
