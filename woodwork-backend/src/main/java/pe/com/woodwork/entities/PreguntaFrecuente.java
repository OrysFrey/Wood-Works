package pe.com.woodwork.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name="preguntasFrecuentes")
public class PreguntaFrecuente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id_id")
    private User user_id;
    private String pregunta;
    private String respuesta;
    private LocalDate fechaPublicado;

    public PreguntaFrecuente (User user_id,String pregunta, String respuesta, LocalDate fechaPublicado){
        this.user_id =user_id;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
        this.fechaPublicado = fechaPublicado;
    }

}
