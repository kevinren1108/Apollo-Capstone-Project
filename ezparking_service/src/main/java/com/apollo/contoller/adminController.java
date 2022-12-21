package com.apollo.contoller;

import com.apollo.mapper.UserMapper;
import com.apollo.mapper.parkingMapper;
import com.apollo.pojo.enity.parking;
import com.apollo.pojo.enity.User;
import com.apollo.service.parkService;
import com.apollo.pojo.ResponseResult;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class adminController {
    @Autowired
    parkService parkService;
    @Autowired
    UserMapper userMapper;
    @Autowired
    parkingMapper parkingMapper;
    @RequestMapping("/admin/save")
    public ResponseResult saveLocation(@Param("longitude") String longitude,@Param("latitude")String latitude,@Param("name")String name ){
        parking p =new parking(longitude,latitude,name);
        parkService.save(p);


        return ResponseResult.okResult(200,"ok");

    }
    @RequestMapping("/admin/delete")
    public ResponseResult deleteLocation(@Param("name")String name ){

        HashMap<String, Object> map = new HashMap<>();

        map.put("name", name);
        parkingMapper.deleteByMap(map);

        return ResponseResult.okResult(200,"ok");
    }
    @RequestMapping("/admin/update")
    public ResponseResult updateLocation(@Param("name")String name ,@Param("longitude") String longitude){

        UpdateWrapper<parking> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("name",name).set("longitude", longitude);
        parkingMapper.update(null,updateWrapper);
        return ResponseResult.okResult(200,"ok");
    }



    @RequestMapping("/admin/query")
    public  ResponseResult queryUser(){
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("name","1");
        User user =userMapper.selectOne(queryWrapper);

        return ResponseResult.okResult(200,"ok",user);
    }
}
