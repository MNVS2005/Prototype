package org.example.controller;

import org.example.model.User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UserController {
    @GetMapping("/form")
    public String ShowForm(Model model){
        model.addAttribute("user",new User());
        return "Form";
    }
    @PostMapping("/process")
    public String processForm(@ModelAttribute User user, Model model){
        model.addAttribute("usuario",user);
        return "Resolt";
    }

}

