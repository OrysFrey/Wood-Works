package pe.com.woodwork.servicesimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.woodwork.dtos.DTOSolicitudSummary;
import pe.com.woodwork.entities.Producto;
import pe.com.woodwork.entities.Solicitud;
import pe.com.woodwork.entities.User;
import pe.com.woodwork.repositories.SolicitudRepository;
import pe.com.woodwork.repositories.UserRepository;
import pe.com.woodwork.services.SolicitudService;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class SolicitudServiceImpl implements SolicitudService{

    @Autowired
    private SolicitudRepository solicitudRepository;

    @Autowired
    UserRepository userRepository;

    public List<Solicitud> listAll() {
        List<Solicitud> solicitudes;
        solicitudes = solicitudRepository.findAll();
        for (Solicitud s: solicitudes) {
            s.setPresupuesto(null);
            //s.setId_customer(null);
        }
        return solicitudes;
    }
    public List<Solicitud> listAllByCustomerId(Long id) {
        List<Solicitud> solicitudes;
        solicitudes = solicitudRepository.listAllById_customer(id);
        for (Solicitud s: solicitudes) {
            s.setPresupuesto(null);
            //s.setId_customer(null);
        }
        return solicitudes;
    }

    @Override
    public Solicitud listById(Long id) {
        Solicitud solicitud;
        solicitud = solicitudRepository.findById(id).get();
        solicitud.setPresupuesto(null);//--------------------
        //solicitud.setId_customer(null);
        return solicitud;
    }
    @Transactional
    public Solicitud saveSolicitud(Solicitud solicitud) {

        User userFound = userRepository.findById(solicitud.getId_customer().getId()).get();
        solicitud.setId_customer(userFound);
        Solicitud savedSolicitud = solicitudRepository.save(solicitud);
        return savedSolicitud;
    }

    public List<DTOSolicitudSummary> listSolicitudSummary() {
        List<Solicitud> solicitudList = solicitudRepository.findAll();
        List<DTOSolicitudSummary> solicitudSummaryList = new ArrayList<>();

        for (Solicitud s: solicitudList) {

            Long id = s.getId();
            String customer = s.getId_customer().getNombre_usuario();
            String description = s.getDescription();
            LocalDate fecha_fin = s.getFecha_fin();

            DTOSolicitudSummary dtoSolicitudSummary = new DTOSolicitudSummary(id, customer, description, fecha_fin);
            solicitudSummaryList.add(dtoSolicitudSummary);
        }

        return solicitudSummaryList;
    }

    @Override
    public void deleteSolicitud(Long id) {
        solicitudRepository.deleteById(id);
    }

}
