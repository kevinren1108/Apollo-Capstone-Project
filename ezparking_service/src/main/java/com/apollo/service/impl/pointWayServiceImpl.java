package com.apollo.service.impl;

import com.apollo.mapper.pointWayMapper;
import com.apollo.pojo.ResponseResult;
import com.apollo.pojo.enity.StartEnd;
import com.apollo.pojo.enity.pathAndDis;
import com.apollo.pojo.enity.pointWay;
import com.apollo.service.pointWayService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.lang.Math;
import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional(rollbackFor = Exception.class)
public class pointWayServiceImpl extends ServiceImpl<pointWayMapper, pointWay> implements pointWayService {
    private static final double EARTH_RADIUS = 6371;
    @Autowired
    private pointWayService pointWayService;

    @Override
    public double calculateDistance(double startLat, double startLong, double endLat, double endLong) {
        BigDecimal dLat = new BigDecimal(Math.toRadians(endLat - startLat));
        BigDecimal dLong = new BigDecimal(Math.toRadians(endLong - startLong));
        BigDecimal startLatRad = new BigDecimal(Math.toRadians(startLat));
        BigDecimal endLatRad = new BigDecimal(Math.toRadians(endLat));

        BigDecimal a = haversin(dLat).add(
                new BigDecimal(Math.cos(startLatRad.doubleValue())).multiply(new BigDecimal(Math.cos(endLatRad.doubleValue()))
                        .multiply(haversin(dLong))));
        BigDecimal c = new BigDecimal(2).multiply(new BigDecimal(Math.atan2(Math.sqrt(a.doubleValue()), Math.sqrt(1 - a.doubleValue()))));
        return EARTH_RADIUS * c.doubleValue();
    }
    private BigDecimal haversin(BigDecimal val) {
        return val.multiply(val).divide(new BigDecimal(2), MathContext.DECIMAL32);


    }
    @Override
    public List<String> findShortestPath(StartEnd startEnd) {
        String startPoint = startEnd.getStartPoint();
        String endPoint = startEnd.getEndPoint();
        Set<String> visited = new HashSet<>();
        List<String> children = new ArrayList<>();
        List<String> path = new ArrayList<>();
        path.add(startPoint);
        String currentNode = startPoint;

        while (!currentNode.equals(endPoint)) {
            pointWay currentPoint =  pointWayService.getOne(new QueryWrapper<pointWay>().eq("name", currentNode));
            pointWay endPointInfo = pointWayService.getOne(new QueryWrapper<pointWay>().eq("name", endPoint));
            if (currentPoint.getNeighbor() == null) {
                throw new NullPointerException("Neighbor information is null");
            }
            String[] array = currentPoint.getNeighbor().substring(1, currentPoint.getNeighbor().length() - 1).split(",");
            for (String child : array) {
                if (!visited.contains(child)) {
                    children.add(child);
                }
            }
            if (children.isEmpty()) { // 没有子节点了
                path.remove(path.size() - 1); // 删除最后一个节点
                visited.remove(currentNode); // 将该节点从已访问的节点中删除
                currentNode = path.get(path.size() - 1); // 回到上一个节点
                continue;
            }
            double min = Double.MAX_VALUE;
            String bestChild = "";
            for (String child : children) {
                pointWay childInfo = pointWayService.getOne(new QueryWrapper<pointWay>().eq("name", child));
                double distance = pointWayService.calculateDistance(currentPoint.getLat().doubleValue(), currentPoint.getLng().doubleValue(), childInfo.getLat().doubleValue(), childInfo.getLng().doubleValue());
                double heuristic = pointWayService.calculateDistance(endPointInfo.getLat().doubleValue(), endPointInfo.getLng().doubleValue(), childInfo.getLat().doubleValue(), childInfo.getLng().doubleValue());
                double total = distance + heuristic;
                if (total < min) {
                    min = total;
                    bestChild = child;
                }
            }
            path.add(bestChild);
            currentNode = bestChild;
            visited.add(bestChild);
            children.clear();
        }
        return path;
    }

    @Override
    public Double getDistance(StartEnd startEnd) {
        QueryWrapper queryWrapper=new QueryWrapper();
        List<pointWay> pointList =new ArrayList<>();
        List<String> list =findShortestPath(startEnd);
        List<pathAndDis> path ;
        int size =list.size();
        double totalDistance=0;
        for(int i =0;i<size;i++){
            queryWrapper.eq("name",list.get(i));
            pointWay pointWay= pointWayService.getOne(queryWrapper);
            pointList.add(pointWay);
            queryWrapper.clear();
        }
        int size2=pointList.size()-1;
        for(int i =0;i<size2;i++){
            totalDistance=totalDistance+ pointWayService.calculateDistance(pointList.get(i).getLat().doubleValue(),pointList.get(i).getLng().doubleValue(),pointList.get(i+1).getLat().doubleValue(),pointList.get(i+1).getLng().doubleValue());

        }
        return totalDistance;

    }

}




