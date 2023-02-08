package com.apollo.mapper;

import com.apollo.pojo.enity.Parkinglot;
import com.apollo.pojo.enity.amount;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface amountMapper  extends BaseMapper<amount> {
}
