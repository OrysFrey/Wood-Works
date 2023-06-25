package pe.com.woodwork.services;

import pe.com.woodwork.dtos.DTOUserSummary;
import pe.com.woodwork.entities.User;

import java.util.List;

public interface UserService {

    public List<User> listAll();
    public List<User> listAllByType(String type);
    public User listById(Long id);
    public User saveUser(User user);

    public void deleteUser(Long id);

    public List<DTOUserSummary> listUserSummary();

}
