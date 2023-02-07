package com.apollo.service.impl;

import com.apollo.mapper.parkingMapper;
import com.apollo.mapper.pathanddisMapper;
import com.apollo.pojo.enity.parking;
import com.apollo.pojo.enity.pathAndDis;
import com.apollo.service.parkService;
import com.apollo.service.pathAndDisService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class pathAndDisServiceImpl extends ServiceImpl<pathanddisMapper, pathAndDis> implements pathAndDisService {
}
