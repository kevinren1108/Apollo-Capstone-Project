package com.apollo.mapper;

import com.apollo.pojo.enity.DestinationAndParking;
import com.apollo.pojo.enity.Parkinglot;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface DestinationAndParkingMapper extends BaseMapper<DestinationAndParking> {
}
