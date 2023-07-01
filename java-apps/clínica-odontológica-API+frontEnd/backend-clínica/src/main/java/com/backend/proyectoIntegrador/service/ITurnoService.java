package com.backend.proyectoIntegrador.service;

import com.backend.proyectoIntegrador.dto.TurnoDto;
import com.backend.proyectoIntegrador.entity.Turno;
import com.backend.proyectoIntegrador.exceptions.BadRequestException;
import com.backend.proyectoIntegrador.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ITurnoService {
    // Ahora el servicie toma el turnoDTO y no la entidad turno
    TurnoDto guardarTurno(Turno turno) throws BadRequestException;

    List<TurnoDto> listarTodos();

    TurnoDto buscarTurnoPorId(Long id);

    TurnoDto actualizarTurno(Turno turno);

    void eliminarTurno(Long id) throws ResourceNotFoundException;
}
