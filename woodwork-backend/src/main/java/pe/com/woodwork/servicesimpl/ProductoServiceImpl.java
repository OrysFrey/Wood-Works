package pe.com.woodwork.servicesimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.com.woodwork.dtos.DTOProductoSummary;
import pe.com.woodwork.entities.Producto;
import pe.com.woodwork.entities.Solicitud;
import pe.com.woodwork.entities.User;
import pe.com.woodwork.repositories.ProductoRepository;
import pe.com.woodwork.repositories.UserRepository;
import pe.com.woodwork.services.ProductoService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    ProductoRepository productoRepository;

    @Autowired
    UserRepository userRepository;

    public List<Producto> listAll() {
        List<Producto> productos;
        productos = productoRepository.findAll();
        for (Producto p: productos) {
            //p.setId_customer(null);
        }
        return productos;
    }

    public Producto listById(Long id) {
        Producto producto;
        producto = productoRepository.findById(id).get();
        //producto.setId_customer(null);
        return producto;
    }

    @Transactional
    public Producto saveProducto(Producto producto) {
        User userFound = userRepository.findById(producto.getId_customer().getId()).get();
        producto.setId_customer(userFound);
        Producto savedProducto = productoRepository.save(producto);
        return savedProducto;
    }

    public List<DTOProductoSummary> listProductoSummary() {
        List<Producto> productoList = productoRepository.findAll();
        List<DTOProductoSummary> productoSummaryList = new ArrayList<>();

        for (Producto p: productoList) {

            Long id = p.getId();
            String carpintero = p.getId_customer().getNombre_usuario();
            String nombre_producto = p.getNombre_producto();
            Double precio_producto = p.getPrecio_producto();

            DTOProductoSummary dtoProductoSummary = new DTOProductoSummary(id, carpintero, nombre_producto, precio_producto);
            productoSummaryList.add(dtoProductoSummary);
        }

        return productoSummaryList;
    }

    @Override
    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }

}
