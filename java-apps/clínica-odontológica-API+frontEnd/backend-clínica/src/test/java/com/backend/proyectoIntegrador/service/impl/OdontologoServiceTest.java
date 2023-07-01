package com.backend.proyectoIntegrador.service.impl;

import com.backend.proyectoIntegrador.dto.OdontologoDto;
import com.backend.proyectoIntegrador.entity.Odontologo;
import com.backend.proyectoIntegrador.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.validation.ConstraintViolationException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class OdontologoServiceTest {

    @Autowired
    private OdontologoService odontologoService;


    @Test
    @Order(1)
    void deberiaValidarElGuardadoDeUnOdontologo() {
        Odontologo crearUnOdontologo = new Odontologo("AD-165166", "Juan", "lopez");
        OdontologoDto odontologoDto = odontologoService.registrarOdontologo(crearUnOdontologo);

        Assertions.assertNotNull(odontologoDto);
        Assertions.assertNotNull(odontologoDto.getId());


    }

    @Test
    @Order(2)
    void cuandoNoSeCumplaFormatoDeMatricula_noInsertaOdontologo() {
        Odontologo odontologo = new Odontologo("561616", "patricia", "lopez");
        Assertions.assertThrows(ConstraintViolationException.class, () -> odontologoService.registrarOdontologo(odontologo));
    }

    @Test
    @Order(3)
    void deberiaListarUnSoloOdontologo() {
        List<OdontologoDto> odontologoDtos = odontologoService.listarOdontologos();
        assertEquals(1, odontologoDtos.size());
    }

    @Test
    @Order(4)
    void deberiaEliminarElOdontologo1() throws ResourceNotFoundException {
        odontologoService.eliminarOdontologo(1L);
        Assertions.assertThrows(ResourceNotFoundException.class, () -> odontologoService.eliminarOdontologo(1L));
    }

    @Test
    @Order(5)
    void deberiaRetornarUnaListaVacia() {
        List<OdontologoDto> odontologoDtos = odontologoService.listarOdontologos();
        Assertions.assertTrue(odontologoDtos.isEmpty());
    }


}