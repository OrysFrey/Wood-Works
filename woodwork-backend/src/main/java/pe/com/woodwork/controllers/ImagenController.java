package pe.com.woodwork.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pe.com.woodwork.entities.Imagen;
import pe.com.woodwork.entities.Producto;
import pe.com.woodwork.services.ImagenService;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class ImagenController {
    @Autowired
    private ImagenService imagenService;
    @PostMapping("/imagenes")
    public ResponseEntity<Imagen> addImagen(
            @RequestParam("picture") MultipartFile picture,
            @RequestParam("idProducto") Long idProducto) throws IOException {
        Imagen newImagen = imagenService.save(picture, idProducto);
        return new ResponseEntity<>(newImagen, HttpStatus.CREATED);
    }
    @GetMapping("/producto/{id}/imagenes")
    public ResponseEntity<List<Imagen>> listByProductoId(@PathVariable("id") Long id){
        List<Imagen> imagenes = imagenService.listarPorProducto(id);
        return new ResponseEntity<>(imagenes, HttpStatus.OK);
    }
    @GetMapping("/producto/imagenes")
    public ResponseEntity<List<Imagen>> listarUnaImagenPorProducto(){
        List<Imagen> imagenes = imagenService.listarUnaImagenPorProducto();
        return new ResponseEntity<>(imagenes, HttpStatus.OK);
    }
}
