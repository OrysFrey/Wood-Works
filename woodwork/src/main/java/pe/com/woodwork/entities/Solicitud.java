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
@Table(name="solicitudes")
public class Solicitud {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_customer_id")
    private User id_customer;
    private String description;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private Double ancho_producto;
    private Double  alto_producto;
    private Double largo_producto;
    private Double ancho_espacio;
    private Double  alto_espacio;
    private Double largo_espacio;
    /*img_espacio: string;*/
    @JsonIgnore
    @OneToMany(mappedBy = "id_carpenter")
    private List<Presupuesto> presupuesto;
    public Solicitud (User id_customer, String description, LocalDate fecha_inicio, LocalDate fecha_fin,Double ancho_producto,
                      Double  alto_producto, Double largo_producto, Double ancho_espacio, Double  alto_espacio, Double largo_espacio){
        this.id_customer = id_customer;
        this.description = description;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.ancho_producto =ancho_producto;
        this.alto_producto = alto_producto;
        this.largo_producto = largo_producto;
        this.ancho_espacio = ancho_espacio;
        this.alto_espacio = alto_espacio;
        this.largo_espacio = largo_espacio;
    }
}
