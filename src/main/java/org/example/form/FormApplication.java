package org.example.form;

import org.example.controller.UserController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
public class FormApplication {

    public static void main(String[] args) {
        SpringApplication.run(FormApplication.class,args);
    }
}