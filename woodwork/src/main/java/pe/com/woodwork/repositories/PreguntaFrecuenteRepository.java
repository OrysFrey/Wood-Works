package pe.com.woodwork.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.com.woodwork.entities.PreguntaFrecuente;
import org.springframework.stereotype.Repository;
import pe.com.woodwork.entities.Presupuesto;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PreguntaFrecuenteRepository extends JpaRepository<PreguntaFrecuente, Long> {

    /*Buscar por id/usuario*/
    //public PreguntaFrecuente findById(Long id);
    /*Buscar por fecha - fechaPublicado*/
    public List<PreguntaFrecuente> findByFechaPublicado (LocalDate fechaPublicado); //1Spring
    /*Buscar por pregunta*/

    /*contar preguntas sin respuesta*/ //Spring
    public Long countByRespuestaIsNull();

}
