package com.apollo.service;

import com.apollo.pojo.ResponseResult;
import com.apollo.pojo.enity.DestinationAndParking;
import com.apollo.pojo.enity.StartEnd;
import com.apollo.pojo.enity.pathAndDis;
import com.apollo.pojo.enity.pointWay;
import com.baomidou.mybatisplus.extension.service.IService;

import java.math.BigDecimal;
import java.util.List;

public interface pointWayService extends IService<pointWay> {
    double calculateDistance(double startLat, double startLong, double endLat, double endLong);
    List<String> findShortestPath(StartEnd startEnd);
    Double getDistance(StartEnd startEnd);
     List<pathAndDis> getPathAndDis();
    public List<DestinationAndParking> getDestinationAndParking();
    void insertAmount(List<pointWay> pointWays);

}
