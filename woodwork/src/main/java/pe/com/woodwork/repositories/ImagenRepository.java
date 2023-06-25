package pe.com.woodwork.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pe.com.woodwork.entities.Imagen;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagenRepository extends JpaRepository<Imagen, Long> {
    @Query(value = "SELECT DISTINCT ON (i.producto_id) * FROM imagenes i", nativeQuery = true)
    List<Imagen> listarImagenesPorProducto();
    List<Imagen> findAllByProducto_Id(Long id);
}
