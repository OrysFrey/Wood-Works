package pe.com.woodwork.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.com.woodwork.entities.User;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTOSolicitudSummary {

    private Long id;
    private String customer;
    private String description;
    private LocalDate fecha_fin;

}
