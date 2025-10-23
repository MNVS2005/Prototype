package org.example.backend.controller;

import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<User> userlist() {
        return repository.findAll();
    }


    public Optional<User> serchbyid(Long id) {
        return repository.findById(id);
    }


    @PostMapping
    public User save(
            @RequestParam String name,
            @RequestParam String surname,
            @RequestParam int age,
            @RequestParam String dni,
            @RequestParam LocalDate birthdate
    ) {
        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setAge(age);
        user.setDni(dni);
        user.setBirthdate(birthdate);
        return repository.save(user);
    }
    @PostMapping("/{id}")
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
    @DeleteMapping("/{id}")
    public void deleteduser(Long id){
        repository.deleteById(id);
    }

}

