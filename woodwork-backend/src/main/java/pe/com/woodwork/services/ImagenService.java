package pe.com.woodwork.services;

import org.springframework.web.multipart.MultipartFile;
import pe.com.woodwork.entities.Imagen;

import java.io.IOException;
import java.util.List;

public interface ImagenService {
    public Imagen save(MultipartFile picture, Long productId) throws IOException;
    public List<Imagen> listarUnaImagenPorProducto();
    public List<Imagen> listarPorProducto(Long id);
    public void delete(Long id);
}
