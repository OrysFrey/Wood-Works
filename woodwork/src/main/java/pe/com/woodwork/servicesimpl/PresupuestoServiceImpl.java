package pe.com.woodwork.servicesimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.woodwork.entities.Presupuesto;
import pe.com.woodwork.entities.Producto;
import pe.com.woodwork.entities.Solicitud;
import pe.com.woodwork.entities.User;
import pe.com.woodwork.repositories.PresupuestoRepository;
import pe.com.woodwork.repositories.SolicitudRepository;
import pe.com.woodwork.repositories.UserRepository;
import pe.com.woodwork.services.PresupuestoService;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class PresupuestoServiceImpl implements PresupuestoService {

    @Autowired
    PresupuestoRepository presupuestoRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SolicitudRepository solicitudRepository;

    public List<Presupuesto> listAll() {
        List<Presupuesto> presupuestos;
        presupuestos = presupuestoRepository.findAll();
        for (Presupuesto p: presupuestos) {
            //p.setId_carpenter(null);
            //p.setId_solicitud(null);
        }
        return presupuestos;
    }

    public Presupuesto listById(Long id) {
        Presupuesto presupuesto;
        presupuesto = presupuestoRepository.findById(id).get();
        //presupuesto.setId_carpenter(null);
        //presupuesto.setId_solicitud(null);
        return presupuesto;
    }
    @Transactional
    public Presupuesto savePresupuesto(Presupuesto presupuesto) {
        User userFound = userRepository.findById(presupuesto.getId_carpenter().getId()).get();
        Solicitud solicitudFound = solicitudRepository.findById(presupuesto.getId_solicitud().getId()).get();

        presupuesto.setId_carpenter(userFound);
        presupuesto.setId_solicitud(solicitudFound);

        Presupuesto savedPresupuesto = presupuestoRepository.save(presupuesto);
        return savedPresupuesto;
    }

    @Override
    public List<Presupuesto> listAllById_customer(Long id) {
        List<Presupuesto> presupuestos;
        presupuestos = presupuestoRepository.listAllById_customer(id);
        for (Presupuesto p: presupuestos) {
            //p.setId_carpenter(null);
            p.setId_solicitud(null);
        }
        return presupuestos;
    }

    @Override
    public List<Presupuesto> listAllById_carpenter(Long id) {
        List<Presupuesto> presupuestos;
        presupuestos = presupuestoRepository.listAllById_carpenter(id);
        for (Presupuesto p: presupuestos) {
            p.setId_carpenter(null);
            //p.setId_solicitud(null);
        }
        return presupuestos;
    }

    @Override
    public void deletePresupuesto(Long id) {
        presupuestoRepository.deleteById(id);
    }

    public List<Presupuesto> listAllByMonto_presupuesto(){
        return presupuestoRepository.listAllByMonto_presupuesto();
    }
    public List<Presupuesto> findByEstado(String estado){
        return presupuestoRepository.findByEstado(estado);
    }

}
