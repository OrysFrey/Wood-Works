package pe.com.woodwork.servicesimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.woodwork.entities.PreguntaFrecuente;
import pe.com.woodwork.entities.User;
import pe.com.woodwork.repositories.PreguntaFrecuenteRepository;
import pe.com.woodwork.repositories.UserRepository;
import pe.com.woodwork.services.PreguntaFrecuenteService;

import java.time.LocalDate;
import java.util.List;

@Service
public class PreguntaFrecuenteServiceImpl implements PreguntaFrecuenteService {

    @Autowired
    PreguntaFrecuenteRepository preguntaFrecuenteRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<PreguntaFrecuente> listAll() {
        List<PreguntaFrecuente> preguntaFrecuentes;
        preguntaFrecuentes = preguntaFrecuenteRepository.findAll();
        return preguntaFrecuentes;
    }

    @Override
    public PreguntaFrecuente listById(Long id) {
        PreguntaFrecuente preguntaFrecuente;
        preguntaFrecuente = preguntaFrecuenteRepository.findById(id).get();
        return preguntaFrecuente;
    }

    @Override
    public PreguntaFrecuente savePreguntaFrecuente(PreguntaFrecuente preguntaFrecuente) {
        /*
        User userFound = userRepository.findById(solicitud.getId_customer().getId()).get();
        solicitud.setId_customer(userFound);
        Solicitud savedSolicitud = solicitudRepository.save(solicitud);
        return savedSolicitud;
         */
        User userFound = userRepository.findById(preguntaFrecuente.getUser_id().getId()).get();
        preguntaFrecuente.setUser_id(userFound);
        return preguntaFrecuenteRepository.save(preguntaFrecuente);
    }

    @Override
    public void deletePreguntaFrecuente(Long id) {
        preguntaFrecuenteRepository.deleteById(id);
    }

    @Override
    public List<PreguntaFrecuente>  findByFechaPublicado(LocalDate fechaPublicado) {
        return preguntaFrecuenteRepository.findByFechaPublicado(fechaPublicado);
    }

    public Long countByRespuestaIsNull(){
        return preguntaFrecuenteRepository.countByRespuestaIsNull();
    }

}
