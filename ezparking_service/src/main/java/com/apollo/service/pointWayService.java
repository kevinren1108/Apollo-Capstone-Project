package com.apollo.service.impl;

import com.apollo.mapper.amountMapper;
import com.apollo.mapper.pointWayMapper;
import com.apollo.pojo.ResponseResult;
import com.apollo.pojo.enity.*;
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
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackFor = Exception.class)
public class pointWayServiceImpl extends ServiceImpl<pointWayMapper, pointWay> implements pointWayService {

    @Autowired
    private pointWayService pointWayService;

    public static final double EARTH_RADIUS = 6371.0; // 地球半径，单位：米

    public double calculateDistance(double startLat, double startLong, double endLat, double endLong) {
        double lat1Rad = Math.toRadians(startLat);
        double lat2Rad = Math.toRadians(endLat);
        double deltaLatRad = Math.toRadians(endLat - startLat);
        double deltaLongRad = Math.toRadians(endLong - startLong);

        double a = Math.sin(deltaLatRad/2) * Math.sin(deltaLatRad/2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                        Math.sin(deltaLongRad/2) * Math.sin(deltaLongRad/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        double distance = EARTH_RADIUS * c;

        return distance;
    }

    @Override
    public List<String> findShortestPath(StartEnd startEnd) {
        String startPoint = startEnd.getStartPoint();
        String endPoint = startEnd.getEndPoint();
        Set<String> visited = new HashSet<>();
        Map<String, String> parentMap = new HashMap<>();
        Map<String, Double> distanceMap = new HashMap<>();
        PriorityQueue<String> queue = new PriorityQueue<>(Comparator.comparingDouble(a -> distanceMap.getOrDefault(a, Double.MAX_VALUE)));
        queue.add(startPoint);
        parentMap.put(startPoint, null);
        distanceMap.put(startPoint, 0.0);

        while (!queue.isEmpty()) {
            String currentNode = queue.poll();
            if (currentNode.equals(endPoint)) {
                break;
            }
            if (visited.contains(currentNode)) {
                continue;
            }
            visited.add(currentNode);

            pointWay currentPoint =  pointWayService.getOne(new QueryWrapper<pointWay>().eq("name", currentNode));
            if (currentPoint.getNeighbor() == null) {
                throw new NullPointerException("Neighbor information is null");
            }
            String[] array = currentPoint.getNeighbor().substring(1, currentPoint.getNeighbor().length() - 1).split(",");
            for (String child : array) {
                double dist = pointWayService.calculateDistance(currentPoint.getLat().doubleValue(), currentPoint.getLng().doubleValue(),
                        pointWayService.getOne(new QueryWrapper<pointWay>().eq("name", child)).getLat().doubleValue(),
                        pointWayService.getOne(new QueryWrapper<pointWay>().eq("name", child)).getLng().doubleValue());
                double distance = distanceMap.getOrDefault(currentNode, 0.0) + dist;
                if (!distanceMap.containsKey(child) || distance < distanceMap.get(child)) {
                    parentMap.put(child, currentNode);
                    distanceMap.put(child, distance);
                    queue.add(child);
                }
            }
        }

        List<String> path = new ArrayList<>();
        String current = endPoint;
        while (current != null) {
            path.add(current);
            current = parentMap.get(current);
        }
        Collections.reverse(path);
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

    @Autowired
    private pointWayMapper pointWayMapper;


    @Override
    public List<pathAndDis> getPathAndDis() {
        QueryWrapper<pointWay> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("type", "Destination");
        QueryWrapper<pointWay> queryWrapper2 = new QueryWrapper<>();
        queryWrapper2.like("type", "Parking lot");

        // 得到所有起点的实体类
        List<pointWay> dest = pointWayMapper.selectList(queryWrapper);
        // 得到所有停车场的实体类
        List<pointWay> parking = pointWayMapper.selectList(queryWrapper2);

        List<pathAndDis> distances = new ArrayList<>();
        dest.parallelStream().forEach(startPoint -> {
            parking.forEach(endPoint -> {
                StartEnd startEnd = new StartEnd();
                startEnd.setStartPoint(startPoint.getName());
                startEnd.setEndPoint(endPoint.getName());

                Optional<List<String>> distanceOpt = Optional.ofNullable(pointWayService.findShortestPath(startEnd));
                distanceOpt.ifPresent(distance -> {
                    double distanceValue = 0;
                    pointWay startPointInfo = pointWayMapper.selectOne(new QueryWrapper<pointWay>().eq("name", distance.get(0)));
                    for (int i = 0; i < distance.size() - 1; i++) {
                        String start = distance.get(i);
                        String end = distance.get(i + 1);
                        pointWay endPointInfo = pointWayMapper.selectOne(new QueryWrapper<pointWay>().eq("name", end));
                        distanceValue += pointWayService.calculateDistance(startPointInfo.getLat().doubleValue(), startPointInfo.getLng().doubleValue(), endPointInfo.getLat().doubleValue(), endPointInfo.getLng().doubleValue());
                        startPointInfo = endPointInfo;
                    }
                    distances.add(new pathAndDis(distance.get(0), distance.get(distance.size() - 1), distanceValue));
                });
            });
        });
        return distances;
    }

    @Override
    public List<DestinationAndParking> getDestinationAndParking() {
        QueryWrapper<pointWay> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("type", "Destination");
        QueryWrapper<pointWay> queryWrapper2 = new QueryWrapper<>();
        queryWrapper2.like("type", "Parking lot%");
        // 得到所有起点的实体类
        List<pointWay> dest = pointWayMapper.selectList(queryWrapper);
        // 得到所有停车场的实体类
        List<pointWay> parking = pointWayMapper.selectList(queryWrapper2);

        List<DestinationAndParking> result = new ArrayList<>();
        for (pointWay point : dest) {
            String name = point.getType().substring(point.getType().indexOf(":") + 2, point.getType().length() - 1);
            DestinationAndParking destAndPark = new DestinationAndParking(point.getName(), name, "Destination");
            result.add(destAndPark);
        }
        for (pointWay point : parking) {
            String name = point.getType().substring(point.getType().indexOf("Parkinglot Name: ") + 17, point.getType().length() - 1);
            DestinationAndParking destAndPark = new DestinationAndParking(point.getName(), name, "Parking lot");
            result.add(destAndPark);
        }

        return result;
    }

    @Override
    public void insertAmount(List<pointWay> pointWays) {
        // 获取所有type包含 Parking lot 的 pointway
        QueryWrapper<pointWay> wrapper = new QueryWrapper<>();
        wrapper.like("type", "Parking lot");
        List<pointWay> pointWays1 = pointWayMapper.selectList(wrapper);

        // 获取 amount 数据库中所有的记录
        List<amount> amounts = amountMapper.selectList(null);

        // 将 amount 数据库中所有记录的 name 存储到 set 中
        Set<String> amountNames = new HashSet<>();
        amounts.forEach(amount -> amountNames.add(amount.getName()));

        // 遍历 pointway
        for (pointWay pointWay : pointWays1) {
            String name = pointWay.getName();
            String type = pointWay.getType();

            // 获取可用车位数量
            String availableSpots = type.substring(type.indexOf(":") + 2, type.indexOf(")"));
            int amountValue = Integer.parseInt(availableSpots);

            // 判断该记录是否已经存在于 amount 数据库中
            if (amountNames.contains(name)) {
                // 更新该记录
                amount amount = amountMapper.selectById(name);
                if (amount != null) {
                    amount.setAmount(amountValue);
                    amount.setExist(new Random().nextInt(amountValue));
                    amountMapper.updateById(amount);
                }
            } else {
                // 插入新记录
                amount amount = new amount(name, amountValue, amountValue/2);
                amountMapper.insert(amount);
            }
        }
    }

    @Autowired
    amountMapper amountMapper;


}




