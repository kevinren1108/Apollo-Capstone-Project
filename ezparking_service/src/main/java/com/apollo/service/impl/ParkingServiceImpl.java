package com.apollo.service.impl;

import com.apollo.mapper.parkingMapper;
import com.apollo.pojo.enity.parking;
import com.apollo.service.parkService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor = Exception.class)
@Service
public class ParkingServiceImpl extends ServiceImpl<parkingMapper, parking> implements parkService {
}
