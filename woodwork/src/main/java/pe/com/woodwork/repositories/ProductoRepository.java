package pe.com.woodwork.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pe.com.woodwork.entities.Producto;
import org.springframework.stereotype.Repository;
import pe.com.woodwork.entities.User;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

}
