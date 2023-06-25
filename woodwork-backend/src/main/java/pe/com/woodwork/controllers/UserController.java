package pe.com.woodwork.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.woodwork.dtos.DTOUserSummary;
import pe.com.woodwork.entities.User;
import pe.com.woodwork.services.UserService;

import java.util.List;

@CrossOrigin (origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUser() {
        List<User> users = userService.listAll();
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }
    @GetMapping("/users/type_usuario/{type}")
    public ResponseEntity<List<User>> getAllUserCustomer(@PathVariable("type") String type) {
        List<User> users = userService.listAllByType(type);
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id){
        User user = userService.listById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("/users/summary")
    public ResponseEntity<List<DTOUserSummary>> getUserSummary() {
        List<DTOUserSummary> dtoUserSummaries = userService.listUserSummary();
        return new ResponseEntity<List<DTOUserSummary>>(dtoUserSummaries, HttpStatus.OK);
    }
    @PostMapping("/users")
    public ResponseEntity<User> addUser(@RequestBody User user){
        User newUser = userService.saveUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable("id") Long id){
        User foundUser = userService.listById(id);

        if (user.getNombre_usuario() != null) {
            foundUser.setNombre_usuario(user.getNombre_usuario());
        }
        if (user.getType_usuario() != null) {
            foundUser.setType_usuario(user.getType_usuario());
        }
        if (user.getTelefono() != null) {
            foundUser.setTelefono(user.getTelefono());
        }
        if (user.getCorreo_usuario() != null) {
            foundUser.setCorreo_usuario(user.getCorreo_usuario());
        }
        if (user.getPassword_usuario() != null) {
            foundUser.setPassword_usuario(user.getPassword_usuario());
        }

        User updateUser = userService.saveUser(foundUser);
        return new ResponseEntity<User>(updateUser, HttpStatus.OK);
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }

}
