package com.backend.proyectoIntegrador.controller;

import com.backend.proyectoIntegrador.dto.TurnoDto;
import com.backend.proyectoIntegrador.entity.Turno;
import com.backend.proyectoIntegrador.exceptions.BadRequestException;
import com.backend.proyectoIntegrador.exceptions.ResourceNotFoundException;
import com.backend.proyectoIntegrador.service.ITurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/dates")
public class TurnoController {
    private final ITurnoService turnoService;

    @Autowired
    public TurnoController(ITurnoService turnoService) {
        this.turnoService = turnoService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TurnoDto> buscarTurnoPorId(@PathVariable Long id) {
        return new ResponseEntity<>(turnoService.buscarTurnoPorId(id), null, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<TurnoDto> guardarTurno(@Valid @RequestBody Turno turno) throws BadRequestException {
        return new ResponseEntity<>(turnoService.guardarTurno(turno), null, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> eliminarTurno(@PathVariable Long id) throws ResourceNotFoundException {
        turnoService.eliminarTurno(id);
        return ResponseEntity.ok("Date deleted");
    }

    @PutMapping("/update")
    public ResponseEntity<TurnoDto> actualizarTurno(@RequestBody Turno turno) {
        return new ResponseEntity<>(turnoService.actualizarTurno(turno), null, HttpStatus.OK);
    }

}
