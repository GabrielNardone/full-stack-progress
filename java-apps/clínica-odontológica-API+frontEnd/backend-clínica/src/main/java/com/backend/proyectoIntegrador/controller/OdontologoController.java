package com.backend.proyectoIntegrador.controller;

import com.backend.proyectoIntegrador.dto.OdontologoDto;
import com.backend.proyectoIntegrador.entity.Odontologo;
import com.backend.proyectoIntegrador.exceptions.ResourceNotFoundException;
import com.backend.proyectoIntegrador.service.impl.OdontologoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
//Establecer aquí el puerto desde donde se hace la petición para darle el permiso
@RestController
@RequestMapping("/dentist")
public class OdontologoController {
    private OdontologoService odontologoService;

    @Autowired
    public OdontologoController(OdontologoService odontologoService) {
        this.odontologoService = odontologoService;
    }

    @GetMapping()
    public List<OdontologoDto> listarOdontologos() {
        return odontologoService.listarOdontologos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OdontologoDto> buscarOdontologoPorId(@PathVariable Long id) {
        return new ResponseEntity<>(odontologoService.buscarOdontologoPorId(id), null, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<OdontologoDto> registrarOdontologo(@Valid @RequestBody Odontologo odontologo) {
        return new ResponseEntity<>(odontologoService.registrarOdontologo(odontologo), null, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<OdontologoDto> actualizarOdontologo(@Valid @RequestBody Odontologo odontologo) {
        return new ResponseEntity<>(odontologoService.actualizarOdontologo(odontologo), null, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> eliminarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        odontologoService.eliminarOdontologo(id);
        return ResponseEntity.ok("Dentist deleted");
    }

}
