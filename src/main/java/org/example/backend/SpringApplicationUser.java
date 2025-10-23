package org.example.backend;

import jakarta.annotation.sql.DataSourceDefinitions;
import org.example.backend.controller.UserController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootApplication
public class SpringApplicationUser {
    public static void main(String[] args) {
        SpringApplication.run(SpringApplicationUser.class,args);
    }
}