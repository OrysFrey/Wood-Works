package pe.com.woodwork.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name="imagenes")
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column( name ="picture", nullable = false)
    private byte[] picture;
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    public Imagen(byte[] picture, Producto producto) {
        this.picture = picture;
        this.producto = producto;
    }
}
