package pe.com.woodwork.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.woodwork.entities.Presupuesto;
import pe.com.woodwork.entities.Producto;
import pe.com.woodwork.services.PresupuestoService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class PresupuestoController {

    @Autowired
    PresupuestoService presupuestoService;

    @GetMapping("/presupuestos")
    public ResponseEntity<List<Presupuesto>> getAllPresupuesto() {
        List<Presupuesto> presupuestos = presupuestoService.listAll();
        return new ResponseEntity<List<Presupuesto>>(presupuestos, HttpStatus.OK);
    }
    @GetMapping("/carpenter/{id}/presupuestos")
    public ResponseEntity<List<Presupuesto>> getAllPresupuestoByCarpenter(@PathVariable("id") Long id) {
        List<Presupuesto> presupuestos = presupuestoService.listAllById_carpenter(id);
        return new ResponseEntity<List<Presupuesto>>(presupuestos, HttpStatus.OK);
    }
    @GetMapping("/customer/{id}/presupuestos")
    public ResponseEntity<List<Presupuesto>> getAllPresupuestoByCustomer(@PathVariable("id") Long id) {
        List<Presupuesto> presupuestos = presupuestoService.listAllById_customer(id);
        return new ResponseEntity<List<Presupuesto>>(presupuestos, HttpStatus.OK);
    }

    @GetMapping("/presupuestos/{id}")
    public ResponseEntity<Presupuesto> getPresupuesto(@PathVariable("id") Long id){
        Presupuesto presupuesto = presupuestoService.listById(id);
        return new ResponseEntity<Presupuesto>(presupuesto, HttpStatus.OK);
    }
    @PostMapping("/presupuestos")
    public ResponseEntity<Presupuesto> addPresupuesto(@RequestBody Presupuesto presupuesto){
        Presupuesto newPresupuesto = presupuestoService.savePresupuesto(presupuesto);
        return new ResponseEntity<>(newPresupuesto, HttpStatus.CREATED);
    }
    @PutMapping("/presupuestos/{id}")
    public ResponseEntity<Presupuesto> updatePresupuesto(@RequestBody Presupuesto presupuesto, @PathVariable("id") Long id){
        Presupuesto foundPresupuesto = presupuestoService.listById(id);

        if (presupuesto.getId_carpenter() != null) {
            foundPresupuesto.setId_carpenter(presupuesto.getId_carpenter());
        }
        if (presupuesto.getId_solicitud() != null) {
            foundPresupuesto.setId_solicitud(presupuesto.getId_solicitud());
        }
        if (presupuesto.getMano_obra() != null) {
            foundPresupuesto.setMano_obra(presupuesto.getMano_obra());
        }
        if (presupuesto.getMaterial() != null) {
            foundPresupuesto.setMaterial(presupuesto.getMaterial());
        }
        if (presupuesto.getMonto() != null) {
            foundPresupuesto.setMonto(presupuesto.getMonto());
        }
        if (presupuesto.getEstado() != null) {
            foundPresupuesto.setEstado(presupuesto.getEstado());
        }
        if (presupuesto.getFecha_registro() != null) {
            foundPresupuesto.setFecha_registro(presupuesto.getFecha_registro());
        }

        Presupuesto updatePresupuesto = presupuestoService.savePresupuesto(foundPresupuesto);
        return new ResponseEntity<Presupuesto>(updatePresupuesto, HttpStatus.OK);
    }

    @DeleteMapping("/presupuestos/{id}")
    public ResponseEntity<HttpStatus> deletePresupuesto(@PathVariable("id") Long id){
        presupuestoService.deletePresupuesto(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/presupuestos/mayor1000")
    public ResponseEntity<List<Presupuesto>> getAllPresupuestoByMonto1000() {
        List<Presupuesto> presupuestos = presupuestoService.listAllByMonto_presupuesto();
        return new ResponseEntity<List<Presupuesto>>(presupuestos, HttpStatus.OK);
    }
    @GetMapping("/presupuestos/estado/{estado}")
    public ResponseEntity<List<Presupuesto>> getAllPresupuestoByEstado(@PathVariable("estado") String estado) {
        List<Presupuesto> presupuestos = presupuestoService.findByEstado(estado);
        return new ResponseEntity<List<Presupuesto>>(presupuestos, HttpStatus.OK);
    }
}
