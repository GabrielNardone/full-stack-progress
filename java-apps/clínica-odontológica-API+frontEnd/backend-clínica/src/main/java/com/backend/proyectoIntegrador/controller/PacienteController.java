package com.backend.proyectoIntegrador.controller;

import com.backend.proyectoIntegrador.dto.PacienteDto;
import com.backend.proyectoIntegrador.entity.Paciente;
import com.backend.proyectoIntegrador.exceptions.ResourceNotFoundException;
import com.backend.proyectoIntegrador.service.IPacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/patients")
public class PacienteController {
    private IPacienteService pacienteService;

    @Autowired
    public PacienteController(IPacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @PostMapping("/register")
    public ResponseEntity<PacienteDto> registrarPaciente(@Valid @RequestBody Paciente paciente) {
        return new ResponseEntity<>(pacienteService.guardarPaciente(paciente), null, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<PacienteDto> actualizarPaciente(@Valid @RequestBody Paciente paciente) {
        return new ResponseEntity<>(pacienteService.actualizarPaciente(paciente), null, HttpStatus.OK);
    }

    @GetMapping()
    public List<PacienteDto> listarTodos() {
        return pacienteService.listarPacientes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PacienteDto> buscarPacientePorId(@PathVariable Long id) {
        return new ResponseEntity<>(pacienteService.buscarPacientePorId(id), null, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> eliminarPaciente(@PathVariable Long id) throws ResourceNotFoundException {
        pacienteService.eliminarPaciente(id);
        return ResponseEntity.ok("Patient deleted");
    }
}
