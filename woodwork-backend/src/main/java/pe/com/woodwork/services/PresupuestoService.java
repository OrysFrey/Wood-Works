package pe.com.woodwork.services;

import pe.com.woodwork.entities.Presupuesto;
import pe.com.woodwork.entities.User;

import java.util.List;

public interface PresupuestoService {

    public List<Presupuesto> listAll();
    public Presupuesto listById(Long id);
    public Presupuesto savePresupuesto(Presupuesto presupuesto);
    List<Presupuesto> listAllById_customer(Long id);
    List<Presupuesto> listAllById_carpenter(Long id);

    public void deletePresupuesto(Long id);
    public List<Presupuesto> listAllByMonto_presupuesto();
    public List<Presupuesto> findByEstado(String estado);
}
