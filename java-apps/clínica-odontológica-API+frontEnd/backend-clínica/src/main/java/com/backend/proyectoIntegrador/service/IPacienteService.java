package com.backend.proyectoIntegrador.service;


import com.backend.proyectoIntegrador.dto.PacienteDto;
import com.backend.proyectoIntegrador.entity.Paciente;
import com.backend.proyectoIntegrador.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IPacienteService {
    List<PacienteDto> listarPacientes();

    PacienteDto buscarPacientePorId(Long id);

    PacienteDto guardarPaciente(Paciente paciente);

    PacienteDto actualizarPaciente(Paciente paciente);

    void eliminarPaciente(Long id) throws ResourceNotFoundException;

}
