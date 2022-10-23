package com.apollo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@MapperScan("com/apollo/mapper")
@SpringBootApplication
public class apolloApplication {
    public static void main(String[] args) {
        SpringApplication.run(apolloApplication.class, args);
    }
}
