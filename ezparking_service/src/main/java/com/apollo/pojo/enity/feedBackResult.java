package com.apollo.pojo.enity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.parameters.P;
@Data

@NoArgsConstructor
public class feedBackResult {
    private String ParkingLotName;
    private String ParkingLotId;
    private  int ParkingLotAmount;
    private int parkingLotExist;
    private double distance;
    private double runTime;
    private double walkTime;

    public String getParkingLotName() {
        return ParkingLotName;
    }

    public void setParkingLotName(String parkingLotName) {
        ParkingLotName = parkingLotName;
    }

    public String getParkingLotId() {
        return ParkingLotId;
    }

    public void setParkingLotId(String parkingLotId) {
        ParkingLotId = parkingLotId;
    }

    public int getParkingLotAmount() {
        return ParkingLotAmount;
    }

    public void setParkingLotAmount(int parkingLotAmount) {
        ParkingLotAmount = parkingLotAmount;
    }

    public int getParkingLotExist() {
        return parkingLotExist;
    }

    public void setParkingLotExist(int parkingLotExist) {
        this.parkingLotExist = parkingLotExist;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getRunTime() {
        return runTime;
    }

    public void setRunTime(double runTime) {
        this.runTime = runTime;
    }

    public double getWalkTime() {
        return walkTime;
    }

    public void setWalkTime(double walkTime) {
        this.walkTime = walkTime;
    }

    public feedBackResult(String parkingLotName, String parkingLotId, int parkingLotAmount, int parkingLotExist, double distance, double runTime, double walkTime) {
        ParkingLotName = parkingLotName;
        ParkingLotId = parkingLotId;
        ParkingLotAmount = parkingLotAmount;
        this.parkingLotExist = parkingLotExist;
        this.distance = distance;
        this.runTime = runTime;
        this.walkTime = walkTime;
    }
}
