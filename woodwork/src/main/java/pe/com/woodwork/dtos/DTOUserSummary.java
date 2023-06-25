package pe.com.woodwork.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTOUserSummary {
    private Long id;
    private String nombre_usuario;
    private String type_usuario;
    private String telefono;
    private String correo_usuario;
}
