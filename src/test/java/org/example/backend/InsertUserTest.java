package org.example.backend;

import org.example.backend.controller.UserController;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class InsertUserTest {
    @Autowired
    private UserRepository userRepository;
    private UserController userController;
    @Test
    void insertuser(){
        User user = new User();
        user.setName("Jose");
        user.setSurname("luan");
        user.setBirthdate("10/10/2000");
        user.setAge(12);
        user.setDni("1234567A");
        userController.save(user);
    }
}
