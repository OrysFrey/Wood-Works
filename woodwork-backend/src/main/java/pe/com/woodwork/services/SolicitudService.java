package pe.com.woodwork.services;

import pe.com.woodwork.dtos.DTOSolicitudSummary;
import pe.com.woodwork.entities.Solicitud;
import pe.com.woodwork.entities.User;

import java.util.List;

public interface SolicitudService {

    public List<Solicitud> listAll();
    public Solicitud listById(Long id);
    public Solicitud saveSolicitud(Solicitud solicitud);
    public List<Solicitud> listAllByCustomerId(Long id);

    public List<DTOSolicitudSummary> listSolicitudSummary();

    public void deleteSolicitud(Long id);

}
