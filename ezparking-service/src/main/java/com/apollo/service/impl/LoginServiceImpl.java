package com.apollo.service.impl;

import com.apollo.pojo.ResponseResult;
import com.apollo.pojo.enity.LoginUser;
import com.apollo.pojo.enity.User;
import com.apollo.pojo.vo.UserInfoVo;
import com.apollo.pojo.vo.UserLoginVo;
import com.apollo.service.LoginService;
import com.apollo.util.BeanCopyUtils;
import com.apollo.util.JwtUtil;
import com.apollo.util.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RedisCache redisCache;

    @Override
    public ResponseResult login(User user) {
        UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(user.getName(),user.getPassword());
        Authentication authenticate= authenticationManager.authenticate(authenticationToken);
        if(Objects.isNull(authenticate)){
            throw new RuntimeException("用户名或密码错误");

        }
        //获取userid 生成token
        LoginUser loginUser = (LoginUser) authenticate.getPrincipal();
        String userId = loginUser.getUser().getId().toString();
        String jwt = JwtUtil.createJWT(userId);
        //把用户信息存入redis
        redisCache.setCacheObject("LoginUser:id:"+userId,loginUser);
        //把token和userinfo封装 返回
        //把User转换成UserInfoVo
        UserInfoVo userInfoVo = BeanCopyUtils.copyBean(loginUser.getUser(), UserInfoVo.class);
        UserLoginVo vo = new UserLoginVo(jwt,userInfoVo);
        return ResponseResult.okResult(200,"success",vo);


    }
}
