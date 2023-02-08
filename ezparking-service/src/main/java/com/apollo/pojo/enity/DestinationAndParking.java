package com.apollo.pojo.enity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.datatransfer.FlavorTable;

@Data
@NoArgsConstructor
@TableName("AllPandD")
public class DestinationAndParking {
    private String id;
    private  String name;
    private  String type;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public DestinationAndParking(String id, String name, String type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}
