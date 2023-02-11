package com.apollo.mapper;

import com.apollo.pojo.enity.Parkinglot;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Mapper
@Repository
public interface parkingLotMapper extends BaseMapper<Parkinglot> {
}
