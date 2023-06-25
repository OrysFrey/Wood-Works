package pe.com.woodwork.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.woodwork.entities.Solicitud;

import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
    @Query("SELECT s FROM Solicitud s WHERE s.id_customer.id = :id") // con lenguaje JPQL  3
    List<Solicitud> listAllById_customer(Long id);
}
