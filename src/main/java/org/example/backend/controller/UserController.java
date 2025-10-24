package org.example.backend.controller;

import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository repository;

    @Value("${file.upload-dir}")
    private String uploadDir;


    public UserController (UserRepository repository){
        this.repository=repository;
    }
    //Listar todos los usuarios
    @GetMapping
    public List<User> userlist(){
        return repository.findAll();
    }
    //  Buscar usuario por ID
    @GetMapping("/{id}")
    public Optional<User> serchbyid(Long id){
        return repository.findById(id);
    }
    //Actualizar usuario existente
    @PostMapping
    public User save(@RequestParam String name,
                     @RequestParam String surname,
                     @RequestParam int age,
                     @RequestParam String dni,
                     @RequestParam String birthdate,
                     @RequestParam MultipartFile photo)
            throws IOException {
        String filePath = uploadDir + "/" + photo.getOriginalFilename();
        File dest = new File(filePath);
        dest.getParentFile().mkdirs();
        photo.transferTo(dest);
        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setAge(age);
        user.setDni(dni);
        user.setBirthdate(birthdate);
        return repository.save(user);
    }


    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable long id,
            @RequestParam String name,
            @RequestParam String dni,
            @RequestParam String birthdate,
            @RequestParam int age,
            @RequestParam(required = false) MultipartFile photo
    ) throws IOException {
        Optional<User> optionalUser = repository.findById(id);
        if (optionalUser.isEmpty()) {
            return null;
        }

        User persona = optionalUser.get();
        persona.setName(name);
        persona.setDni(dni);
        persona.setBirthdate(birthdate);
        persona.setAge(age);

        if (photo != null && !photo.isEmpty()) {
            String filePath = uploadDir + "/" + photo.getOriginalFilename();
            File dest = new File(filePath);
            dest.getParentFile().mkdirs();
            photo.transferTo(dest);
            persona.setPhotoUrl("/uploads/" + photo.getOriginalFilename());
        }

        return repository.save(persona);
    }

    //Eliminar usuario por ID
    public void deleted(Long id){
        repository.deleteById(id);
    }

}

