package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository repository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // Listar usuarios
    @GetMapping
    public List<User> userlist() {
        logger.info("Se listaron todos los usuarios");
        return repository.findAll();
    }

    // Buscar usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> searchById(@PathVariable Long id) {
        logger.info("Buscando usuario con ID: {}", id);
        Optional<User> user = repository.findById(id);

        if (user.isEmpty()) {
            logger.warn("No se encontró usuario con ID: {}", id);
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }

    // Crear usuario
    @PostMapping
    public ResponseEntity<?> save(
            @RequestParam String name,
            @RequestParam String surname,
            @RequestParam int age,
            @RequestParam String dni,
            @RequestParam String birthdate,
            @RequestParam MultipartFile photo
    ) throws IOException {
        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setAge(age);
        user.setDni(dni);
        user.setBirthdate(birthdate);

        logger.info("Intentando guardar nuevo usuario: {}", user.getName());

        String filePath = uploadDir + "/" + photo.getOriginalFilename();
        File dest = new File(filePath);
        dest.getParentFile().mkdirs();
        photo.transferTo(dest);

        user.setPhotoUrl("/uploads/" + photo.getOriginalFilename());
        User savedUser = repository.save(user);

        logger.info("Usuario guardado correctamente con ID: {}", savedUser.getId());
        return ResponseEntity.ok(savedUser);
    }

    // Actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable long id,
            @Valid @ModelAttribute User newUserData,
            @RequestParam(required = false) MultipartFile photo
    ) throws IOException {
        logger.info("Actualizando usuario con ID: {}", id);

        Optional<User> optionalUser = repository.findById(id);
        if (optionalUser.isEmpty()) {
            logger.error("No existe usuario con ID: {}", id);
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        user.setName(newUserData.getName());
        user.setSurname(newUserData.getSurname());
        user.setDni(newUserData.getDni());
        user.setBirthdate(newUserData.getBirthdate());
        user.setAge(newUserData.getAge());

        if (photo != null && !photo.isEmpty()) {
            String filePath = uploadDir + "/" + photo.getOriginalFilename();
            File dest = new File(filePath);
            dest.getParentFile().mkdirs();
            photo.transferTo(dest);
            user.setPhotoUrl("/uploads/" + photo.getOriginalFilename());
            logger.info("Foto actualizada para el usuario ID {}", id);
        }

        User updated = repository.save(user);
        logger.info("Usuario actualizado correctamente con ID: {}", id);
        return ResponseEntity.ok(updated);
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        logger.info("Eliminando usuario con ID: {}", id);
        if (!repository.existsById(id)) {
            logger.warn("Intento de eliminar un usuario inexistente con ID: {}", id);
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        logger.info("Usuario eliminado correctamente con ID: {}", id);
        return ResponseEntity.ok("Usuario eliminado");
    }
}
