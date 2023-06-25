package pe.com.woodwork.servicesimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pe.com.woodwork.entities.Imagen;
import pe.com.woodwork.entities.Producto;
import pe.com.woodwork.exceptions.ResourceNotFoundException;
import pe.com.woodwork.repositories.ImagenRepository;
import pe.com.woodwork.repositories.ProductoRepository;
import pe.com.woodwork.services.ImagenService;
import pe.com.woodwork.util.Util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImagenServiceImpl implements ImagenService {
    @Autowired
    ImagenRepository imagenRepository;
    @Autowired
    ProductoRepository productoRepository;
    @Override
    public List<Imagen> listarUnaImagenPorProducto() {
        List<Imagen> imagenes = imagenRepository.listarImagenesPorProducto();
        List<Imagen> imagenDeco = new ArrayList<>();
        System.out.println(imagenes);
        imagenes.stream().forEach((imagen) -> {
            byte[] imageDescompressed = Util.decompressZLib(imagen.getPicture());
            imagen.setPicture(imageDescompressed);
            imagenDeco.add(imagen);
        });
        System.out.println(imagenDeco);
        return imagenDeco;
    }

    @Override
    public List<Imagen> listarPorProducto(Long id) {
        List<Imagen> imagenes = imagenRepository.findAllByProducto_Id(id);
        List<Imagen> imagenDeco = new ArrayList<>();
        imagenes.stream().forEach(imagen -> {
            imagen.setPicture(Util.decompressZLib(imagen.getPicture()));
            imagenDeco.add(imagen);
        });
        return imagenDeco;
    }
    @Override
    public Imagen save(MultipartFile picture, Long productId)
            throws IOException {
        Imagen imagen = null;
        Producto producto = productoRepository.findById(productId).orElseThrow(()-> new ResourceNotFoundException("Not found coach with id="+productId));
        if(producto != null) {
            imagen = new Imagen(
                    Util.compressZLib(picture.getBytes()),
                    producto
            );
            imagen = imagenRepository.save(imagen);
        }
        return imagen;
    }

    @Override
    public void delete(Long id) {
        imagenRepository.deleteById(id);
    }
}
