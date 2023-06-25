package pe.com.woodwork.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name="productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_customer_id")
    private User id_customer;
    private String nombre_producto;
    private Double ancho_producto;
    private Double alto_producto;
    private Double largo_producto;
    private Double precio_producto;
    private LocalDate fecha_registro;
    /*img_producto: string;*/
    @JsonIgnore
    @OneToMany(mappedBy = "producto")
    private List<Imagen> imagenes;

    public Producto (User id_customer,String nombre_producto,Double ancho_producto,
                     Double alto_producto,Double largo_producto,Double precio_producto,LocalDate fecha_registro){
        this.id_customer = id_customer;
        this.nombre_producto = nombre_producto;
        this.ancho_producto = ancho_producto;
        this.alto_producto = alto_producto;
        this.largo_producto = largo_producto;
        this.precio_producto = precio_producto;
        this.fecha_registro = fecha_registro;

    }
}
