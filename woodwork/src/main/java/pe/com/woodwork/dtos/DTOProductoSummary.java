package pe.com.woodwork.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTOProductoSummary {

    private Long id;
    private String carpintero;
    private String nombre_producto;
    private Double precio_producto;

}
