package pe.com.woodwork.services;

import pe.com.woodwork.entities.PreguntaFrecuente;

import java.time.LocalDate;
import java.util.List;

public interface PreguntaFrecuenteService {

    public List<PreguntaFrecuente> listAll();
    public PreguntaFrecuente listById(Long id);
    public PreguntaFrecuente savePreguntaFrecuente(PreguntaFrecuente preguntaFrecuente);
    public void deletePreguntaFrecuente(Long id);
    public List<PreguntaFrecuente>  findByFechaPublicado (LocalDate fechaPublicado);
    public Long countByRespuestaIsNull();
}
