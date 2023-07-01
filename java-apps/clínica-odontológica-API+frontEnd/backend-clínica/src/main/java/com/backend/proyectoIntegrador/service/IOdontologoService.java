package com.backend.proyectoIntegrador.service;

import com.backend.proyectoIntegrador.dto.OdontologoDto;
import com.backend.proyectoIntegrador.entity.Odontologo;
import com.backend.proyectoIntegrador.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IOdontologoService {

    OdontologoDto buscarOdontologoPorId(Long id);

    List<OdontologoDto> listarOdontologos();

    OdontologoDto registrarOdontologo(Odontologo odontologo);

    OdontologoDto actualizarOdontologo(Odontologo odontologo);

    void eliminarOdontologo(Long id) throws ResourceNotFoundException;
}
