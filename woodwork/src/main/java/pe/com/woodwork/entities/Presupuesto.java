package pe.com.woodwork.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name="presupuestos")
public class Presupuesto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_carpenter_id")
    private User id_carpenter;
    @ManyToOne
    @JoinColumn(name = "id_solicitud_id")
    private Solicitud id_solicitud;
    private Double mano_obra;
    private Double material;
    private Double monto;
    private String estado;
    private LocalDate fecha_registro;
    /*img_boceto: string;*/

    public Presupuesto (User id_carpenter,Solicitud id_solicitud,Double mano_obra,Double material,Double monto,String estado,LocalDate fecha_registro){
        this.id_carpenter = id_carpenter;
        this.id_solicitud = id_solicitud;
        this.mano_obra = mano_obra;
        this.material = material;
        this.monto =monto;
        this.estado = estado;
        this.fecha_registro = fecha_registro;
    }

}
