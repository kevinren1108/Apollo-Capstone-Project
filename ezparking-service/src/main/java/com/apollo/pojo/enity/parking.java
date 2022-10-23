package com.apollo.pojo.enity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@TableName("parking")
public class parking {

    private String longitude;
    private String latitude;
    @TableId
    private String name;

    public parking(String longitude, String latitude, String name) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
    }
}
