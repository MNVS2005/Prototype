package org.example.backend;

import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
public class UpdateUserTest {
    @Autowired
    private UserRepository userRepository;
    @Test
    void updateuser(){
        User user = new User();
        user.setName("Juan");
        user.setSurname("manuel");
        user.setDni("12345678A");
        user.setBirthdate("10/10/1900");
        user.setAge(33);
        user.setPhotoUrl("/uploads/juan.jpg");
        user = userRepository.save(user);

        user.setName("Carlos");
        user.setDni("17654321B");
        user.setBirthdate("12/10/3000");
        user.setAge(38);
        user.setPhotoUrl("/uploads/carlos.jpg");

        User personaActualizada = userRepository.save(user);

        // Comprobaciones
        assertThat(personaActualizada.getName()).isEqualTo("Carlos");
        assertThat(personaActualizada.getDni()).isEqualTo("17654321B");
        assertThat(personaActualizada.getBirthdate()).isEqualTo("12/10/3000");
        assertThat(personaActualizada.getAge()).isEqualTo(38);
        assertThat(personaActualizada.getPhotoUrl()).isEqualTo("/uploads/carlos.jpg");
    }
}
