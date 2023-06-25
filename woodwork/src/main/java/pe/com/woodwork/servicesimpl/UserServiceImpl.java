package pe.com.woodwork.servicesimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.woodwork.dtos.DTOUserSummary;
import pe.com.woodwork.entities.Solicitud;
import pe.com.woodwork.exceptions.IncompleteDataException;
import pe.com.woodwork.entities.User;
import pe.com.woodwork.repositories.UserRepository;
import pe.com.woodwork.services.UserService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> listAll() {
        List<User> users;
        users = userRepository.findAll();
        for (User u: users) {
            u.setProductos(null);
            u.setPresupuestos(null);
            u.setSolicitudes(null);
        }
        return users;
    }

    @Override
    public List<User> listAllByType(String type) {
        List<User> users;
        users = userRepository.listAllByType(type);
        for (User u: users) {
            u.setProductos(null);
            u.setPresupuestos(null);
            u.setSolicitudes(null);
        }
        return users;
    }

    @Override
    public User listById(Long id) {
        User user;
        user = userRepository.findById(id).get();
        user.setPresupuestos(null);
        user.setSolicitudes(null);
        user.setProductos(null);
        return user;
    }
    @Transactional
    public User saveUser(User user) {
        if (user.getId() == null || user.getId() == 0) {
            if (userRepository.findByCorreo(user.getCorreo_usuario()) != null) {
                throw new IncompleteDataException("Value for correo is duplicated");
            }
        }
        if (user.getPassword_usuario() == null || user.getPassword_usuario().isEmpty()) {
            throw new IncompleteDataException("User Password can not be null or empty");
        }
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<DTOUserSummary> listUserSummary() {
        List<User> userList = userRepository.findAll();
        List<DTOUserSummary> userSummaryList = new ArrayList<>();
        for (User u: userList) {
            Long id = u.getId();
            String nombre_usuario = u.getNombre_usuario();
            String type_usuario = u.getType_usuario();
            String telefono = u.getTelefono();
            String correo_usuario = u.getCorreo_usuario();

            DTOUserSummary dtoUserSummary = new DTOUserSummary(id, nombre_usuario, type_usuario, telefono, correo_usuario);
            userSummaryList.add(dtoUserSummary);
        }
        return userSummaryList;
    }

}
