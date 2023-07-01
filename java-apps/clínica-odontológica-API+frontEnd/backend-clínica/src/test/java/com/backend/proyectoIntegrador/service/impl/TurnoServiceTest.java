package com.backend.proyectoIntegrador.service.impl;


import com.backend.proyectoIntegrador.dto.OdontologoDto;
import com.backend.proyectoIntegrador.dto.PacienteDto;
import com.backend.proyectoIntegrador.dto.TurnoDto;
import com.backend.proyectoIntegrador.entity.Domicilio;
import com.backend.proyectoIntegrador.entity.Odontologo;
import com.backend.proyectoIntegrador.entity.Paciente;
import com.backend.proyectoIntegrador.entity.Turno;
import com.backend.proyectoIntegrador.exceptions.BadRequestException;
import com.backend.proyectoIntegrador.exceptions.ResourceNotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;


@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TurnoServiceTest {
    @Autowired
    private TurnoService turnoService;
    @Autowired
    private OdontologoService odontologoService;
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @Order(1)
    void deberiaGuardarUnTurno() throws BadRequestException {
        OdontologoDto odontologoDto = odontologoService.registrarOdontologo(new Odontologo("LD-561616", "patricia", "lopez"));
        PacienteDto pacienteDto = pacienteService.guardarPaciente(new Paciente("Juan", "Perez", "33546853", LocalDate.now(), new Domicilio("calle falsa", 123, "Yerba buena", "tucuman")));

        Odontologo odontologo = objectMapper.convertValue(odontologoDto, Odontologo.class);
        Paciente paciente = objectMapper.convertValue(pacienteDto, Paciente.class);

        Turno crearUnTurno = new Turno(LocalDateTime.of(LocalDate.of(2023, 10, 1), LocalTime.of(12, 0)), paciente, odontologo);
        TurnoDto turnoDto = turnoService.guardarTurno(crearUnTurno);

        Assertions.assertNotNull(turnoDto);
        Assertions.assertNotNull(turnoDto.getId());

    }

    @Test
    @Order(2)
    void deberiaEliminarElTurno() throws ResourceNotFoundException {
        turnoService.eliminarTurno(1L);
        Assertions.assertThrows(ResourceNotFoundException.class, () -> turnoService.eliminarTurno(1L));
    }

    @Test
    @Order(3)
    void deberiaRetornarLaListaVacia() {
        List<TurnoDto> turnoDtos = turnoService.listarTodos();
        Assertions.assertTrue(turnoDtos.isEmpty());
    }

}