package com.backend.proyectoIntegrador.service.impl;

import com.backend.proyectoIntegrador.dto.OdontologoDto;
import com.backend.proyectoIntegrador.dto.PacienteDto;
import com.backend.proyectoIntegrador.dto.TurnoDto;
import com.backend.proyectoIntegrador.entity.Turno;
import com.backend.proyectoIntegrador.exceptions.BadRequestException;
import com.backend.proyectoIntegrador.exceptions.ResourceNotFoundException;
import com.backend.proyectoIntegrador.repository.TurnoRepository;
import com.backend.proyectoIntegrador.service.ITurnoService;
import com.backend.proyectoIntegrador.utils.JsonPrinter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurnoService implements ITurnoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TurnoService.class);
    private final TurnoRepository turnoRepository;
    private final PacienteService pacienteService;
    private final OdontologoService odontologoService;

    @Autowired
    public TurnoService(TurnoRepository turnoRepository, PacienteService pacienteService, OdontologoService odontologoService) {
        this.turnoRepository = turnoRepository;
        this.pacienteService = pacienteService;
        this.odontologoService = odontologoService;
    }

    @Override
    public TurnoDto guardarTurno(Turno turno) throws BadRequestException {
        TurnoDto turnoDto = null;
        PacienteDto paciente = pacienteService.buscarPacientePorId(turno.getPaciente().getId());
        OdontologoDto odontologo = odontologoService.buscarOdontologoPorId(turno.getOdontologo().getId());

        if (paciente == null || odontologo == null) {
            if (paciente == null && odontologo == null) {
                LOGGER.error("The patient and dentist doesn´t exist in the data base");
                throw new BadRequestException("The patient and dentist doesn´t exist in the data base");
            } else if (paciente == null) {
                LOGGER.error("The patient doesn´t exist in the data base");
                throw new BadRequestException("The patient doesn´t exist in the data base");
            } else {
                LOGGER.error("The dentist doesn´t exist in the data base");
                throw new BadRequestException("The dentist doesn´t exist in the data base");
            }

        } else {
            turnoDto = TurnoDto.fromTurno(turnoRepository.save(turno));
            LOGGER.info("New date saved: {}", JsonPrinter.toString(turnoDto));
        }
        return turnoDto;
    }

    @Override
    public List<TurnoDto> listarTodos() {
        List<Turno> turnos = turnoRepository.findAll();
        List<TurnoDto> turnoDtoList = turnos.stream()
                .map(TurnoDto::fromTurno)
                .toList();

        LOGGER.info("Dates list: {}", JsonPrinter.toString(turnoDtoList));
        return turnoDtoList;
    }

    @Override
    public TurnoDto buscarTurnoPorId(Long id) {
        Turno turnoBuscado = turnoRepository.findById(id).orElse(null);
        TurnoDto turnoDto = null;

        if (turnoBuscado != null) {
            turnoDto = TurnoDto.fromTurno(turnoBuscado);
            LOGGER.info("Date founded: {}", JsonPrinter.toString(turnoDto));
        } else LOGGER.info("The date doesn´t exist");

        return turnoDto;
    }

    @Override
    public TurnoDto actualizarTurno(Turno turno) {
        Turno turnoAActualizar = turnoRepository.findById(turno.getId()).orElse(null);
        TurnoDto turnoDtoActualizado = null;

        if (turnoAActualizar != null) {
            turnoAActualizar = turno;
            turnoRepository.save(turnoAActualizar);
            turnoDtoActualizado = TurnoDto.fromTurno(turnoAActualizar);
            LOGGER.warn("Date updated: {}", JsonPrinter.toString(turnoDtoActualizado));
        } else LOGGER.error("The date doesn´t exist");

        return turnoDtoActualizado;
    }

    @Override
    public void eliminarTurno(Long id) throws ResourceNotFoundException {
        if (buscarTurnoPorId(id) != null) {
            turnoRepository.deleteById(id);
            LOGGER.warn("Se ha eliminado el turno con id {}", id);
        } else {
            LOGGER.error("No se ha encontrado el turno con id {}", id);
            throw new ResourceNotFoundException("No se ha encontrado el turno con id " + id);
        }
    }


}
