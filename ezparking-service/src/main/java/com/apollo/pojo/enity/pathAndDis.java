package com.apollo.pojo.enity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@TableName("pathanddis")
public class pathAndDis {
    private String start;
    private  String end;
    private  double distance;

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public pathAndDis(String start, String end, double distance) {
        this.start = start;
        this.end = end;
        this.distance = distance;
    }
}
