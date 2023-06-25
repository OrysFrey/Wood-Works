package pe.com.woodwork.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.woodwork.dtos.DTOProductoSummary;
import pe.com.woodwork.entities.Producto;
import pe.com.woodwork.entities.User;
import pe.com.woodwork.services.ProductoService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ProductoController {

    @Autowired
    ProductoService productoService;

    @GetMapping("/productos")
    public ResponseEntity<List<Producto>> getAllProducto() {
        List<Producto> productos = productoService.listAll();
        return new ResponseEntity<List<Producto>>(productos, HttpStatus.OK);
    }
    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> getProducto(@PathVariable("id") Long id){
        Producto producto = productoService.listById(id);
        return new ResponseEntity<Producto>(producto, HttpStatus.OK);
    }
    /*@GetMapping("/productos/summary")
    public ResponseEntity<List<DTOProductoSummary>> getProductoSummary() {
        List<DTOProductoSummary> dtoProductoSummaries = productoService.listProductoSummary();
        return new ResponseEntity<List<DTOProductoSummary>>(dtoProductoSummaries, HttpStatus.OK);
    }*/
    @PostMapping("/productos")
    public ResponseEntity<Producto> addProducto(@RequestBody Producto producto){
        Producto newProducto = productoService.saveProducto(producto);
        return new ResponseEntity<Producto>(newProducto, HttpStatus.CREATED);
    }
    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> updateProducto(@RequestBody Producto producto, @PathVariable("id") Long id){
        Producto foundProducto = productoService.listById(id);

        if (producto.getId_customer() != null) {
            foundProducto.setId_customer(producto.getId_customer());
        }
        if (producto.getNombre_producto() != null) {
            foundProducto.setNombre_producto(producto.getNombre_producto());
        }
        if (producto.getAncho_producto() != null) {
            foundProducto.setAncho_producto(producto.getAncho_producto());
        }
        if (producto.getAlto_producto() != null) {
            foundProducto.setAlto_producto(producto.getAlto_producto());
        }
        if (producto.getLargo_producto() != null) {
            foundProducto.setLargo_producto(producto.getLargo_producto());
        }
        if (producto.getPrecio_producto() != null) {
            foundProducto.setPrecio_producto(producto.getPrecio_producto());
        }
        if (producto.getFecha_registro() != null) {
            foundProducto.setFecha_registro(producto.getFecha_registro());
        }

        Producto updateProducto = productoService.saveProducto(foundProducto);
        return new ResponseEntity<>(updateProducto, HttpStatus.OK);
    }
/*
    @DeleteMapping("/productos/{id}")
    public ResponseEntity<HttpStatus> deleteProducto(@PathVariable("id") Long id){
        productoService.deleteProducto(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }*/


}
