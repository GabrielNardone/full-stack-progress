package com.backend.proyectoIntegrador.service.impl;

import com.backend.proyectoIntegrador.dto.PacienteDto;
import com.backend.proyectoIntegrador.entity.Domicilio;
import com.backend.proyectoIntegrador.entity.Paciente;
import com.backend.proyectoIntegrador.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class PacienteServiceTest {

    @Autowired
    private PacienteService pacienteService;

    @Test
    @Order(1)
    void deberiaValidarElGuardarUnPaciente() {
        Paciente guardarUnPaciente = new Paciente("Juan", "Perez", "33546853", LocalDate.now(), new Domicilio("calle falsa", 123, "Yerba buena", "tucuman"));
        PacienteDto pacienteDto = pacienteService.guardarPaciente(guardarUnPaciente);

        Assertions.assertNotNull(pacienteDto);
        Assertions.assertNotNull(pacienteDto.getId());

    }

    @Test
    @Order(2)
    void deberiaListarAlPaciente() {
        List<PacienteDto> pacienteDtos = pacienteService.listarPacientes();
        assertEquals(1, pacienteDtos.size());
    }

    @Test
    @Order(3)
    void deberiaEliminarAlPacienteCreado() throws ResourceNotFoundException {
        pacienteService.eliminarPaciente(1L);
        Assertions.assertThrows(ResourceNotFoundException.class, () -> pacienteService.eliminarPaciente(1L));
    }

    @Test
    @Order(4)
    void deberiaRetornarLaListaVacia() {
        List<PacienteDto> pacienteDtos = pacienteService.listarPacientes();
        Assertions.assertTrue(pacienteDtos.isEmpty());
    }
}