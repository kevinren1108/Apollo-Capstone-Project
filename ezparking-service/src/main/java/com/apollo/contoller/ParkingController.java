package com.apollo.contoller;

import com.apollo.mapper.DestinationAndParkingMapper;
import com.apollo.mapper.amountMapper;
import com.apollo.mapper.pathanddisMapper;
import com.apollo.mapper.pointWayMapper;
import com.apollo.pojo.ResponseResult;
import com.apollo.pojo.enity.*;
import com.apollo.service.DestinationAndParkingService;
import com.apollo.service.pathAndDisService;
import com.apollo.service.pointWayService;
import com.apollo.service.userService;
import com.apollo.util.RedisCache;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
public class ParkingController {
    @Autowired
    private amountMapper amountMapper;
    @Autowired
    private pathanddisMapper pathanddisMapper;
    @Autowired
    private  pathAndDisService pathAndDisService;
    @Autowired
    userService userService;
    @Autowired
    RedisCache redisCache;
    @Autowired
    pointWayService pointWayService;
    @Autowired
    pointWayMapper pointWayMapper;
    @Autowired
    DestinationAndParkingMapper destinationAndParkingMapper;
    @RequestMapping("/insertWP")
    private ResponseResult savePintWay(@RequestBody Map<String,Object> map){
        // Delete all records in the database table
        pointWayMapper.delete(null);

        // Get all keys of the received map object
        Set<String> keySet = map.keySet();

        // Iterate over all keys
        for (String key : keySet) {
            // Get the corresponding map value for each key
            Map value = (Map) map.get(key);
            // Convert the properties to the correct data type
            BigDecimal lat = (BigDecimal) value.get("lat");
            BigDecimal lng= (BigDecimal) value.get("lng");
            String type= (String) value.get("type");
            String neighbor= value.get("neighbor").toString();
            // Create a new instance of the pointWay class and set its properties
            pointWay pointWay=new pointWay();
            pointWay.setName(key);
            pointWay.setType(type);
            pointWay.setLat(lat);
            pointWay.setNeighbor(neighbor);
            pointWay.setLng(lng);
            // Insert the pointWay instance into the database table
            pointWayMapper.insert(pointWay);
        }

        // Return a success response with a 200 status code and a message "save successfully"
        return ResponseResult.okResult(200,"save successfully");
    }



    @RequestMapping("/loadWP")
    private ResponseResult queryPointway() {
        // Create a QueryWrapper object
        QueryWrapper queryWrapper=new QueryWrapper();
        // Select all records from the pointWay table
        List<pointWay> list= pointWayMapper.selectList(null);
        // Create a new list to store updated data
        List<pointWay> list2=new ArrayList<>();
        // Iterate over all records
        for (pointWay item: list){
            // Query the DestinationAndParking table using the id property of the current pointWay record
            queryWrapper.eq("id",item.getName());
            DestinationAndParking destinationAndParking= destinationAndParkingMapper.selectOne(queryWrapper);
            // If a record is found, update the type property of the current pointWay record
            String name = null;
            if (destinationAndParking != null) {
                name= destinationAndParking.getName();
                String type=item.getType();
                int startIndex = type.indexOf("Name:");
                int endIndex = type.indexOf(")");
                String targetString = type.substring(0, startIndex + 6) + name+ type.substring(endIndex);
                item.setType(targetString);
            }
            // Clear the QueryWrapper object
            queryWrapper.clear();
            // Add the updated pointWay record to the list
            list2.add(item);
        }
        // Return the updated list of pointWay records as the response
        return ResponseResult.okResult(200,"ok", list);
    }

    @RequestMapping("/updateWP")
    private  ResponseResult updatePointWay(@RequestBody pointWay pointWay){
        // Create an UpdateWrapper object
        UpdateWrapper<pointWay> updateWrapper =new UpdateWrapper<>();
        // Update the record in the pointWay table that matches the specified name
        pointWayMapper.update(pointWay,updateWrapper.eq("name",pointWay.getName()).set("lat",pointWay.getLat()).set("lng",pointWay.getLng()).set("type",pointWay.getType()).set("neighbor",pointWay.getNeighbor()));
        // Return a success response with a 200 status code and a message "ok"
        return ResponseResult.okResult(200,"ok");
    }

    @RequestMapping("/CreateCapability")
    private ResponseResult CreateCapability(){
        // Store a value "200" in the Redis cache under the key "ParkingName:test"
        redisCache.setCacheObject("ParkingName:test",200);
        // Return a success response with a 200 status code and a message "ok"
        return ResponseResult.okResult(200,"ok");
    }


    /**
     * countUp - Increase the number of available parking spots in a specific parking lot
     *
     * @param parkingLot - The name of the parking lot
     * @return ResponseResult - An object that encapsulates the result of the API call
     * with 200 OK status and message "ok" if the count is successfully increased,
     * 400 Bad Request status and message "The parking lot is full" if the parking lot is already full.
     */
    @RequestMapping("/countUp")
    private ResponseResult countUp(@Param("parkingLot") String parkingLot){
        // Initialize a query wrapper to query the database
        QueryWrapper queryWrapper = new QueryWrapper();
        // Set the condition to query the database for a specific parking lot
        queryWrapper.eq("name", parkingLot);
        // Get the record of the specific parking lot from the database
        amount amount = amountMapper.selectOne(queryWrapper);
        // Log the record in the console
        System.out.println(amount);
        // Get the number of available parking spots
        int exist = amount.getExist();
        // Check if there is at least one available parking spot
        if (exist > 0) {
            // Increase the number of available parking spots by 1
            amount.setExist(exist +1);
            // Initialize an update wrapper to update the database
            UpdateWrapper updateWrapper = new UpdateWrapper();
            // Set the condition to update the database for the specific parking lot
            updateWrapper.eq("name", amount.getName());
            // Update the database
            amountMapper.update(amount, updateWrapper);
            // Return the response with 200 OK status and message "ok"
            return ResponseResult.okResult(200, "ok");
        } else {
            // Return the response with 400 Bad Request status and message "The parking lot is full"
            return ResponseResult.errorResult(400, "The parking lot is full");
        }
    }
    /**
     * countDown method decrements the exist count of the parking lot if there is any available parking spot.
     * @param parkingLot - name of the parking lot
     * @return ResponseResult with status 200 and message "ok" if decremented successfully, else returns with status 400 and message "The parking lot is full".
     */
    @RequestMapping("/countDown")
    private ResponseResult countDown(@Param("parkingLot") String parkingLot) {
        // Create query wrapper to select the parking lot by name
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("name", parkingLot);
        // Select the parking lot details
        amount amount = amountMapper.selectOne(queryWrapper);
        System.out.println(amount);
        int exist = amount.getExist();
        if (exist > 0) {
            amount.setExist(exist - 1);
            // Create update wrapper to update the decremented exist count
            UpdateWrapper updateWrapper = new UpdateWrapper();
            updateWrapper.eq("name", amount.getName());
            amountMapper.update(amount, updateWrapper);
            return ResponseResult.okResult(200, "ok");
        } else {
            return ResponseResult.errorResult(400, "The parking lot is full");
        }
    }

    /**
     * queryCount method returns the total count of available parking spots in all parking lots.
     * @return ResponseResult with status 200 and message "ok" along with the total count of available parking spots.
     */
    @RequestMapping("/queryCount")
    private  ResponseResult queryCount(){
        // Create query wrapper to select all parking lots
        QueryWrapper queryWrapper = new QueryWrapper();
        int totalAvailableSpots = 0;
        List<amount> list=amountMapper.selectList(null);
        // Loop through the list of parking lots and add up the exist count of each parking lot
        for(amount item:list){
            totalAvailableSpots = item.getExist() + totalAvailableSpots;
        }
        return ResponseResult.okResult(200,"ok",totalAvailableSpots);
    }


@RequestMapping("/savePath")
//获得子节点的值。
//得到所有的点存入list
    private  ResponseResult savePath() {
    int currentStatus = 4;
    List<String> path = new ArrayList<>();
    List<String> list2 = new ArrayList<>();
    List<pointWay> list = pointWayMapper.selectList(null);
    System.out.println("this is list   :" + list);
    Set<String> visited = new HashSet<>();

    System.out.println("dfdfdf" + visited.contains(2));

//得到现在状态的经纬度，子节点。
    String str = list.get(currentStatus).getNeighbor();
//判断子节点是否存在于set中 ，如果是TRUE就删除，如果是FALSE就存入list2
    String[] array = str.substring(1, str.length() - 1).split(",");
    for (String element : array) {
        if (visited.contains(element) == false) {
            list2.add(element);
        }
    }
    //得到 list 元素的 index。
    List<Integer> result = new ArrayList<>();
    for (int i = 0; i < list2.size(); i++) {
        for (int j = 0; j < list.size(); j++) {
            if (list.get(j).getName().equals(list2.get(i))) {
                result.add(j);
            }
        }
    }
    System.out.println("this is result是在list中的编号" + result);
//查询list2 中节点信息。 并且储存
    List<Double> compare = new ArrayList<>();
    List<Double> compare2 = new ArrayList<>();
    pointWay current = list.get(currentStatus);
    pointWay end = list.get(5);


    for (int i = 0; i < result.size(); i++) {
        pointWay children = list.get(result.get(i));
        double distance = pointWayService.calculateDistance(current.getLat().doubleValue(), current.getLng().doubleValue(), children.getLat().doubleValue(), children.getLng().doubleValue());
        double Heuristic = pointWayService.calculateDistance(end.getLat().doubleValue(), end.getLng().doubleValue(), children.getLat().doubleValue(), children.getLng().doubleValue());
        compare.add(distance + Heuristic);
        compare2.add(distance + Heuristic);
    }


//计算list2 的距离现在节点的距离
    Collections.sort(compare2);
    int bestPoint = 0;
        for (int i = 0; i < compare.size(); i++) {
            if (compare.get(i).equals(compare2.get(0))) {
                bestPoint = i;
            }
        }
//相互比较，选择最优解，然后将最优解存入list3 将list2 存入set，并且初始化list2
    path.add(list.get(result.get(bestPoint)).getName());
    for (int i = 0; i < list2.size(); i++) {
        visited.add(list2.get(i));
    }
    System.out.println(path);

        for (int i = 0; i < list.size(); i++) {
            if (path.get(path.size()-1) == list.get(i).getName()) {
                currentStatus=i;
                break;
            }
        }
        System.out.println("current is :"+list.get(currentStatus));
//直到到达目的地。
//然后比较几个停车场的距离，最短的为最优解。

    System.out.println(visited);
    return ResponseResult.okResult(200,"ok",pointWayService.calculateDistance(list.get(1).getLat().doubleValue(),list.get(1).getLng().doubleValue(),list.get(2).getLat().doubleValue(),list.get(2).getLng().doubleValue()));
}
@RequestMapping("/getTotalNum")
public  ResponseResult getTotalLot(){

    // Initialize the variable to store the total count
    int total = 0;

// Create a QueryWrapper object to query the data
    QueryWrapper queryWrapper = new QueryWrapper();

// Add the "like" condition to filter the data by type
    queryWrapper.like("type","parking");

// Get the list of data that matches the query condition
    List<pointWay> list = pointWayMapper.selectList(queryWrapper);

// Loop through the list to get the total count
    for(pointWay item : list) {
        // Get the string value of the type field
        String str = item.getType();
        // Find the start index of the count string
        int startIndex = str.indexOf(": ");
        // Find the end index of the count string
        int endIndex = str.indexOf(")");
        // Get the count string
        String subString = str.substring(startIndex+2, endIndex);
        // Convert the count string to integer
        int a = Integer.parseInt(subString);
        // Add the count to the total count
        total = a + total;
        // Print the count for debugging purpose
        System.out.println(a+1);
    }

// Return the result with the status code 200 and the total count
    return ResponseResult.okResult(200,"ok",total);
}


@RequestMapping("/getDestination")
public ResponseResult as(){
//查询pointway的相关信息，并且直接删除

    //用like寻找neighbor带 pointway.getNamede的项目，并且储存为list
    QueryWrapper<pointWay> queryWrapper =new QueryWrapper<>();
    // 预防 type
    queryWrapper.like("type", "Destination");
    return ResponseResult.okResult(200,"ok",pointWayMapper.selectList(queryWrapper));}
    /**
     * Delete all instances of the specified name in the neighbor field of pointWay objects in the database.
     *
     * @param pointWay The pointWay object which contains the name to be deleted.
     * @return The response result with status code 200 and message "ok".
     */
    @RequestMapping("/deleteWp")
    public ResponseResult delete(@RequestBody pointWay pointWay) {
        // Create a query wrapper to search for the pointWay objects that contain the name in the neighbor field.
       QueryWrapper<pointWay> queryWrapper3=new QueryWrapper<>();
       queryWrapper3.eq("name",pointWay.getName());
        pointWayMapper.delete(queryWrapper3);

        QueryWrapper<pointWay> queryWrapper = new QueryWrapper();
        queryWrapper.like("neighbor", pointWay.getName());
        // Get a list of pointWay objects that match the search criteria.
        List<pointWay> list = pointWayMapper.selectList(queryWrapper);
        // Loop through the list of pointWay objects.
        for (pointWay item : list) {
            // Remove all instances of the name from the neighbor field.
            String str = item.getNeighbor();
            String aa = str.replace(pointWay.getName(), "");
            while (aa.contains(",,")) {
                aa = aa.replace(",,", ",");
            }
            aa = aa.replace(",]", "]");
            aa = aa.replace("[,", "[");
            item.setNeighbor(aa);
            // Create a query wrapper to search for the specific pointWay object by name.
            QueryWrapper<pointWay> queryWrapper2 = new QueryWrapper();
            queryWrapper2.like("neighbor", "["+pointWay.getName()+",%").eq("name",item.getName());
            queryWrapper2.or().like("neighbor", "%," + pointWay.getName() + ",%").eq("name",item.getName());
            queryWrapper2.or().like("neighbor", "%," + pointWay.getName() + "]").eq("name",item.getName());
            // Update the pointWay object with the updated neighbor field.
            pointWayMapper.update(item, queryWrapper2);
        }
        // Return the response result with status code 200 and message "ok".
        return ResponseResult.okResult(200, "ok");
    }


    @RequestMapping("/findShortestPath")
    public ResponseResult findShortestPath(@RequestBody StartEnd startEnd) {
       String startPoint= startEnd.getStartPoint();
       String endPoint=startEnd.getEndPoint();
// Create a set to keep track of visited nodes
        Set<String> visited = new HashSet<>();
// Create a list to store the current node's children
        List<String> children = new ArrayList<>();
// Create a list to store the final path
        List<String> path = new ArrayList<>();
        path.add(startPoint);
// Set the current node as the start point
        String currentNode = startPoint;
        int totalNumOfPoints = pointWayMapper.selectCount(null);
        while (!currentNode.equals(endPoint)) {
            if(path.size() > totalNumOfPoints){
                String lastElem = path.get(path.size()-1);
                path.remove(path.size()-1);
                visited.remove(lastElem);
                currentNode = path.get(path.size()-1);
            }
// Get the information of the current node and the endpoint from the database
            pointWay currentPoint = pointWayMapper.selectOne(new QueryWrapper<pointWay>().eq("name", currentNode));
            pointWay endPointInfo = pointWayMapper.selectOne(new QueryWrapper<pointWay>().eq("name", endPoint));
// Get the children of the current node
            String[] array = currentPoint.getNeighbor().substring(1, currentPoint.getNeighbor().length() - 1).split(",");
            for (String child : array) {
                if (!visited.contains(child)) {
                    children.add(child);
                }
            }
// Compare the distance and heuristic of each child and select the best one
            double min = Double.MAX_VALUE;
            String bestChild = "";
            for (String child : children) {
                pointWay childInfo = pointWayMapper.selectOne(new QueryWrapper<pointWay>().eq("name", child));
                double distance = pointWayService.calculateDistance(currentPoint.getLat().doubleValue(), currentPoint.getLng().doubleValue(), childInfo.getLat().doubleValue(), childInfo.getLng().doubleValue());
                double heuristic = pointWayService.calculateDistance(endPointInfo.getLat().doubleValue(), endPointInfo.getLng().doubleValue(), childInfo.getLat().doubleValue(), childInfo.getLng().doubleValue());
                double total = distance + heuristic;
                if (total < min) {
                    min = total;
                    bestChild = child;
                }
            }
// Add the best child to the path and set it as the new current node
            path.add(bestChild);
            currentNode = bestChild;
            visited.add(bestChild);
            children.clear();
        }



        return ResponseResult.okResult(200,"ok",path);

    }
  @RequestMapping("/114514")
  public ResponseResult addall(@RequestBody List<pointWay> list){
        for (pointWay item: list){

            pointWayMapper.insert(item);
        }




        return ResponseResult.okResult(200,"ok");
  }
    @RequestMapping("/updatePLwp")
    public ResponseResult updatePLwp(@RequestBody uploadPL uploadPL) {
        // Get the id and then query in the amount
        String id = uploadPL.getId();
        if (uploadPL.getAmount() != 0) {
            UpdateWrapper updateWrapper = new UpdateWrapper();
            QueryWrapper queryWrapper = new QueryWrapper();
            // Query for the amount based on the name
            queryWrapper.eq("name", id);
            updateWrapper.eq("name", id);
            amount amount = amountMapper.selectOne(queryWrapper);
            // Update the amount
            amount.setAmount(uploadPL.getAmount());
            amountMapper.update(amount, updateWrapper);
        }
        // Update the name of the destination and parking if the new name is not null
        if (uploadPL.getName() != null) {
            QueryWrapper queryWrapper1 = new QueryWrapper();
            // Query for the destination and parking based on the id
            queryWrapper1.eq("id", id);
            DestinationAndParking destinationAndParking = destinationAndParkingMapper.selectOne(queryWrapper1);
            // Update the name of the destination and parking
            destinationAndParking.setName(uploadPL.getName());
            UpdateWrapper updateWrapper1 = new UpdateWrapper();
            updateWrapper1.eq("id", id);
            destinationAndParkingMapper.update(destinationAndParking, queryWrapper1);
        }
        // Return success result with 200 status code and "ok" message
        return ResponseResult.okResult(200, "ok");
    }


    /**
     * updateDNwp method updates a DestinationAndParking object based on the ID and name provided in the RequestBody object "uploadPL".
     * @param uploadPL: The RequestBody object that contains the ID and name of the DestinationAndParking object to be updated.
     * @return ResponseResult: Returns the response result with a status code of 200 and message "ok" if the name is not null and the update is successful.
     *                         Returns the response result with a status code of 400 and message "empty name." if the name is null.
     */
    @RequestMapping("/updateDNwp")
    public ResponseResult updateDNwp(@RequestBody uploadPL uploadPL){
        // Get the ID of the DestinationAndParking object to be updated.
        String id = uploadPL.getId();

        // Check if the name in the RequestBody object is not null
        if (uploadPL.getName() != null){
            // Get the DestinationAndParking object based on the ID.
            QueryWrapper queryWrapper1 = new QueryWrapper();
            queryWrapper1.eq("id", id);
            DestinationAndParking destinationAndParking = destinationAndParkingMapper.selectOne(queryWrapper1);
            // Set the name of the DestinationAndParking object to the name provided in the RequestBody object.
            destinationAndParking.setName(uploadPL.getName());
            // Update the DestinationAndParking object in the database.
            UpdateWrapper updateWrapper1 = new UpdateWrapper();
            updateWrapper1.eq("id", id);
            destinationAndParkingMapper.update(destinationAndParking, queryWrapper1);
            // Return the response result with a status code of 200 and message "ok".
            return ResponseResult.okResult(200, "ok");
        }

        // Return the response result with a status code of 400 and message "empty name." if the name is null.
        return ResponseResult.errorResult(400, "empty name.");
    }


    @Autowired
  private   DestinationAndParkingService destinationAndParkingService;

 @RequestMapping("/getPath")
 public ResponseResult getPath(@RequestBody pointWay pointWay){
        String id =  pointWay.getName();
        QueryWrapper queryWrapper =new QueryWrapper();
        queryWrapper.eq("start",id);
        QueryWrapper queryWrapper1=new QueryWrapper();
        List<feedBackResult> amountList = new ArrayList<>();
     QueryWrapper queryWrapper2=new QueryWrapper();

        List<pathAndDis> list= pathanddisMapper.selectList(queryWrapper);
       list.sort(Comparator.comparingDouble(pathAndDis::getDistance));
        for (pathAndDis item : list){

            queryWrapper1.eq("name",item.getEnd());
            amount amount =amountMapper.selectOne(queryWrapper1);
            if (amount.getExist()<amount.getAmount()){
                queryWrapper2.eq("id",item.getEnd());
                feedBackResult feedBackResult=new feedBackResult();
                //amount.getAmount(),amount.getExist()
                feedBackResult.setParkingLotAmount(amount.getAmount());
                feedBackResult.setParkingLotExist(amount.getExist());
                feedBackResult.setParkingLotId(item.getEnd());
                feedBackResult.setParkingLotName( destinationAndParkingService.getOne(queryWrapper2).getName());
                int distance =(int)(item.getDistance()*1000);
                System.out.println(distance);
                feedBackResult.setDistance(distance);
                feedBackResult.setRunTime((int)(item.getDistance()/20*100));
                feedBackResult.setWalkTime((int)((item.getDistance()/5*100)));
                amountList.add(feedBackResult);
            }

            queryWrapper2.clear();
          queryWrapper1.clear();


        }
        List<feedBackResult> finalList=new ArrayList<>();
        for (int i = 0 ;i<=4;i++){
            finalList.add(amountList.get(i));
        }


        return ResponseResult.okResult(200,"ok",finalList);
 }
 @RequestMapping("/tta")
 public  ResponseResult qw(){
        destinationAndParkingMapper.selectList(null);


        return ResponseResult.okResult(200,"ok",destinationAndParkingMapper.selectList(null));
 }
@RequestMapping("/getAllDestination")
public ResponseResult getAllDestination(){
        QueryWrapper queryWrapper=new QueryWrapper();
        queryWrapper.eq("type","Destination");
        List<DestinationAndParking> list  = destinationAndParkingMapper.selectList(queryWrapper);

        return ResponseResult.okResult(200,"ok",list);
}

    /**
     * This method sets all destinations and parking lots.
     * @RequestMapping("/setAllDestination") maps the URL "/setAllDestination" to this method.
     * The method returns a ResponseResult object with status code 200 and message "ok" if the operation is successful.
     * If there is any error, it will return an error message.
     */
    @RequestMapping("/setAllDestination")
    public ResponseResult setAllDestination(){
        // Create a query wrapper to select all pointWay objects whose type is like "Destination(".
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.like("type", "Destination(");

        // Create another query wrapper to select all pointWay objects whose type is like "Parking lot(".
        QueryWrapper queryWrapper2 = new QueryWrapper();
        queryWrapper2.like("type", "Parking lot(");

        // Create an empty list to store all DestinationAndParking objects.
        List<DestinationAndParking> list = new ArrayList<>();

        // Create two empty variables to store the id and name of each destination and parking lot.
        String id = new String();
        String name = new String();

        // Get a list of all pointWay objects that are destinations.
        List<pointWay> DestList = pointWayMapper.selectList(queryWrapper);
        // Get a list of all pointWay objects that are parking lots.
        List<pointWay> ParkingList = pointWayMapper.selectList(queryWrapper2);

        // Create a new list to store all DestinationAndParking objects.
        List<DestinationAndParking> list1 = new ArrayList<>();

        // Loop through all destinations, extract the id and name, and store them in the list1.
        for (pointWay item : DestList) {
            id = item.getName();
            name = item.getType();
            int start = name.indexOf(":") + 2;
            int end = name.indexOf(")");
            name = name.substring(start, end);
            DestinationAndParking destinationAndParking = new DestinationAndParking(id, name, "Destination");
            list1.add(destinationAndParking);
        }

        // Loop through all parking lots, extract the id and name, and store them in the list1.
        for (pointWay item : ParkingList) {
            id = item.getName();
            name = item.getType();
            int start = name.indexOf(":") + 2;
            int end = name.indexOf(")");
            name = name.substring(start, end);
            DestinationAndParking destinationAndParking = new DestinationAndParking(id, name, "Parking lot");
            list1.add(destinationAndParking);
        }

        // Loop through all items in list1 and insert them into the destinationAndParkingMapper.
        for (DestinationAndParking item : list1) {
            destinationAndParkingMapper.insert(item);
        }

        // Return a ResponseResult object with status code 200 and message "ok".
        return ResponseResult.okResult(200, "ok", list1);
    }



    @RequestMapping("/getdis")
public ResponseResult dis(@RequestBody List<pathAndDis> pathAndDis){
        for (int i =0;i<pathAndDis.size();i++){
            System.out.println(pathAndDis.get(i)+"dfddf");
           pathAndDisService.save(pathAndDis.get(i));
        }

        return ResponseResult.okResult(200,"ok");
}

    @RequestMapping("/thisTest")
    public ResponseResult test(@RequestBody   StartEnd startEnd){
        QueryWrapper queryWrapper=new QueryWrapper();
        queryWrapper.like("type","Destination");
        QueryWrapper queryWrapper2=new QueryWrapper();
        queryWrapper2.like("type","Parking lot");
        //得到所有起点的实体类
        List<pointWay> dest= pointWayMapper.selectList(queryWrapper);
        //得到所有停车场的实体类
        List<pointWay> parking=pointWayMapper.selectList(queryWrapper2);
       // StartEnd startEnd=new StartEnd();
        List<pathAndDis> path=new ArrayList<>();
      /*  for (int i =1;i<dest.size();i++){
            for (int j =0;j<parking.size();j++){
                startEnd.setStartPoint(dest.get(i).getName());
                startEnd.setEndPoint(parking.get(j).getName());

            }


        }*/
        pointWayService.getDistance(startEnd);
        pathAndDis pathAndDis=new pathAndDis(startEnd.getStartPoint(),startEnd.getEndPoint(), pointWayService.getDistance(startEnd));
        path.add(pathAndDis);


        pointWayService.getDistance(startEnd);
        return ResponseResult.okResult(200,"ok", path);

    }
 }
