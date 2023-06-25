package pe.com.woodwork.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.woodwork.dtos.DTOSolicitudSummary;
import pe.com.woodwork.entities.Solicitud;
import pe.com.woodwork.entities.User;
import pe.com.woodwork.services.SolicitudService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class SolicitudController {

    @Autowired
    SolicitudService solicitudService;

    @GetMapping("/solicitudes")
    public ResponseEntity<List<Solicitud>> getAllSolicitud() {
        List<Solicitud> solicitudes = solicitudService.listAll();
        return new ResponseEntity<List<Solicitud>>(solicitudes, HttpStatus.OK);
    }
    @GetMapping("/customer/{id}/solicitudes")
    public ResponseEntity<List<Solicitud>> getAllSolicitudByCustomer(@PathVariable("id") Long id) {
        List<Solicitud> solicitudes = solicitudService.listAllByCustomerId(id);
        return new ResponseEntity<List<Solicitud>>(solicitudes, HttpStatus.OK);
    }

    @GetMapping("/solicitudes/{id}")
    public ResponseEntity<Solicitud> getSolicitud(@PathVariable("id") Long id){
        Solicitud solicitud = solicitudService.listById(id);
        return new ResponseEntity<Solicitud>(solicitud, HttpStatus.OK);
    }
    @GetMapping("/solicitudes/summary")
    public ResponseEntity<List<DTOSolicitudSummary>> getSolicitudSummary() {
        List<DTOSolicitudSummary> dtoSolicitudSummaries = solicitudService.listSolicitudSummary();
        return new ResponseEntity<List<DTOSolicitudSummary>>(dtoSolicitudSummaries, HttpStatus.OK);
    }
    @PostMapping("/solicitudes")
    public ResponseEntity<Solicitud> addSolicitud(@RequestBody Solicitud solicitud){
        Solicitud newSolicitud = solicitudService.saveSolicitud(solicitud);
        return new ResponseEntity<Solicitud>(newSolicitud, HttpStatus.CREATED);
    }
    @PutMapping("/solicitudes/{id}")
    public ResponseEntity<Solicitud> updateSolicitud(@RequestBody Solicitud solicitud, @PathVariable("id") Long id){
        Solicitud foundSolicitud = solicitudService.listById(id);

        if (solicitud.getId_customer() != null) {
            foundSolicitud.setId_customer(solicitud.getId_customer());
        }
        if (solicitud.getDescription() != null) {
            foundSolicitud.setDescription(solicitud.getDescription());
        }
        if (solicitud.getFecha_inicio() != null) {
            foundSolicitud.setFecha_inicio(solicitud.getFecha_inicio());
        }
        if (solicitud.getFecha_fin() != null) {
            foundSolicitud.setFecha_fin(solicitud.getFecha_fin());
        }
        if (solicitud.getAncho_producto() != null) {
            foundSolicitud.setAncho_producto(solicitud.getAncho_producto());
        }
        if (solicitud.getAlto_producto() != null) {
            foundSolicitud.setAlto_producto(solicitud.getAlto_producto());
        }
        if (solicitud.getLargo_producto() != null) {
            foundSolicitud.setLargo_producto(solicitud.getLargo_producto());
        }
        if (solicitud.getAncho_espacio() != null) {
            foundSolicitud.setAncho_espacio(solicitud.getAncho_espacio());
        }
        if (solicitud.getAlto_espacio() != null) {
            foundSolicitud.setAlto_espacio(solicitud.getAlto_espacio());
        }
        if (solicitud.getLargo_espacio() != null) {
            foundSolicitud.setLargo_espacio(solicitud.getLargo_espacio());
        }

        Solicitud updateSolicitud = solicitudService.saveSolicitud(foundSolicitud);
        return new ResponseEntity<>(updateSolicitud, HttpStatus.OK);
    }
    @DeleteMapping("/solicitudes/{id}")
    public ResponseEntity<?> deleteSolicitud(@PathVariable("id") Long id){
        solicitudService.deleteSolicitud(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
