package pe.com.woodwork.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre_usuario;
    private String type_usuario;
    private String telefono;
    private String correo_usuario;
    private String password_usuario;

    /*@OneToMany(mappedBy = "usuario")
   private List<PreguntaFrecuente> preguntasFrecuentes;
   */
    @JsonIgnore
    @OneToMany(mappedBy = "id_customer")
    private List<Solicitud> solicitudes;
    @JsonIgnore
    @OneToMany(mappedBy = "id_customer")
    private List<Producto> productos;
    @JsonIgnore
    @OneToMany(mappedBy = "id_carpenter")
    private List<Presupuesto> presupuestos;
    public User(String nombre_usuario, String type_usuario, String telefono, String correo_usuario, String password_usuario) {
        this.nombre_usuario = nombre_usuario;
        this.type_usuario = type_usuario;
        this.telefono = telefono;
        this.correo_usuario = correo_usuario;
        this.password_usuario = password_usuario;
    }
}
