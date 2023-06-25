package pe.com.woodwork.repositories;

import org.springframework.data.jpa.repository.Query;
import pe.com.woodwork.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //@Query("SELECT u FROM User u WHERE u.type_usuario = :type")  // (convertir) sql 1
    @Query(value = "SELECT * FROM users u WHERE u.type_usuario = :type", nativeQuery = true)  // (convertir) sql 1
    List<User> listAllByType(String type);

    @Query(value = "SELECT * FROM users u WHERE u.correo_usuario = :correo", nativeQuery = true)  // (convertir) sql 2
    User findByCorreo(String correo);

}
