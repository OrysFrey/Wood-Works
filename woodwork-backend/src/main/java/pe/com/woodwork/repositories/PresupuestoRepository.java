package pe.com.woodwork.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pe.com.woodwork.entities.Presupuesto;
import org.springframework.stereotype.Repository;
import pe.com.woodwork.entities.Solicitud;

import java.util.List;

@Repository
public interface PresupuestoRepository extends JpaRepository<Presupuesto, Long> {
    @Query("SELECT p FROM Presupuesto p WHERE p.id_carpenter.id= :id") // con lenguaje JPQL  1
    List<Presupuesto> listAllById_carpenter(Long id);
    @Query("SELECT p FROM Presupuesto p WHERE p.id_solicitud.id_customer.id= :id") // con lenguaje JPQL  2
    List<Presupuesto> listAllById_customer(Long id);

    /* Listar por Estado - Pendiente/Aceptado */
    public List<Presupuesto> findByEstado(String estado);   //2Spring

    /*Monto mayor a mil     SQL 3*/
    @Query(value = "SELECT * FROM presupuestos p WHERE p.monto_presupuesto > 1000", nativeQuery = true)  // (convertir) sql 3
    List<Presupuesto> listAllByMonto_presupuesto();
}
