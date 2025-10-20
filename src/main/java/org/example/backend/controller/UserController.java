package org.example.backend.controller;

import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository repository;

    public UserController (UserRepository repository){
        this.repository=repository;
    }


    public List<User> userlist(){
        return repository.findAll();
    }

    public Optional<User> serchbyid(Long id){
        return repository.findById(id);
    }

    public User save(User user){
        return repository.save(user);
    }


    public User actualizar(Long id, User user) {
        return repository.findById(id)
                .map(u -> {
                    u.setName(user.getName());
                    u.setSurname(user.getSurname());
                    u.setAge(user.getAge());
                    u.setDni(user.getDni());
                    u.setBirthdate(user.getBirthdate());
                    return repository.save(u);
                })
                .orElseThrow(() -> new RuntimeException("User is not found"));
    }
    public void deleteduser(Long id){
        repository.deleteById(id);
    }

}

