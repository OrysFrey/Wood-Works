package pe.com.woodwork.services;

import pe.com.woodwork.dtos.DTOProductoSummary;
import pe.com.woodwork.entities.Producto;
import pe.com.woodwork.entities.User;

import java.util.List;

public interface ProductoService {

    public List<Producto> listAll();
    public Producto listById(Long id);
    public Producto saveProducto(Producto producto);

    public List<DTOProductoSummary> listProductoSummary();

    public void deleteProducto(Long id);

}
