package pe.com.woodwork.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.woodwork.entities.PreguntaFrecuente;
import pe.com.woodwork.entities.Producto;
import pe.com.woodwork.services.PreguntaFrecuenteService;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class PreguntaFrecuenteController {
    @Autowired
    private PreguntaFrecuenteService preguntaFrecuenteService;

    @GetMapping("/preguntaFrecuente")
    public ResponseEntity<List<PreguntaFrecuente>> getAllPregunta(){
        List<PreguntaFrecuente> pregunta =preguntaFrecuenteService.listAll();
        return new ResponseEntity<List<PreguntaFrecuente>>(pregunta, HttpStatus.OK);
    }
    @GetMapping("/preguntaFrecuente/{id}")
    public ResponseEntity<PreguntaFrecuente> getPregunta(@PathVariable("id") Long id){
        PreguntaFrecuente pregunta =preguntaFrecuenteService.listById(id);
        return new ResponseEntity<PreguntaFrecuente>(pregunta, HttpStatus.OK);
    }
    /*@PostMapping("/preguntaFrecuente")
    public ResponseEntity<PreguntaFrecuente> createPregunta(@RequestBody PreguntaFrecuente preguntaFrecuente){
        PreguntaFrecuente newPreguntaFrecuente = preguntaFrecuenteService.savePreguntaFrecuente(preguntaFrecuente);
        return new ResponseEntity<PreguntaFrecuente>(newPreguntaFrecuente, HttpStatus.CREATED);
    }
    @PutMapping("/preguntaFrecuente/{id}")
    public ResponseEntity<PreguntaFrecuente> updatePregunta(@PathVariable("id") Long id, @RequestBody PreguntaFrecuente preguntaFrecuente){
        PreguntaFrecuente preguntaFrecuenteFound = preguntaFrecuenteService.listById(id);

        if (preguntaFrecuente.getUser_id() != null) {
            preguntaFrecuenteFound.setUser_id(preguntaFrecuente.getUser_id());
        }
        if (preguntaFrecuente.getPregunta() != null) {
            preguntaFrecuenteFound.setPregunta(preguntaFrecuente.getPregunta());
        }
        if (preguntaFrecuente.getRespuesta() != null) {
            preguntaFrecuenteFound.setRespuesta(preguntaFrecuente.getRespuesta());
        }
        if (preguntaFrecuente.getFechaPublicado() != null) {
            preguntaFrecuenteFound.setFechaPublicado(preguntaFrecuente.getFechaPublicado());
        }

        PreguntaFrecuente newPreguntaFrecuente = preguntaFrecuenteService.savePreguntaFrecuente(preguntaFrecuenteFound);

        return new ResponseEntity<PreguntaFrecuente>(newPreguntaFrecuente, HttpStatus.OK);
    }

    @DeleteMapping("/preguntaFrecuente/{id}")
    public ResponseEntity<HttpStatus> deletePregunta(@PathVariable("id") Long id){
        preguntaFrecuenteService.deletePreguntaFrecuente(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/preguntaFrecuente/fechaPublicado/{fechaPublicado}")
    public ResponseEntity<List<PreguntaFrecuente> > findByFechaPublicado(@PathVariable("fechaPublicado") LocalDate fechaPublicado){
        List<PreguntaFrecuente>  preguntasFrecuentes = preguntaFrecuenteService.findByFechaPublicado(fechaPublicado);
        return new ResponseEntity<>(preguntasFrecuentes, HttpStatus.OK);
    }
    @GetMapping("/preguntaFrecuente/countByRespuestaIsNull")
    public ResponseEntity<Long> countByRespuestaIsNull(){
        Long count = preguntaFrecuenteService.countByRespuestaIsNull();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }*/
}
