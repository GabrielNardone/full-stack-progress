package com.backend.proyectoIntegrador.service.impl;


import com.backend.proyectoIntegrador.dto.OdontologoDto;
import com.backend.proyectoIntegrador.entity.Odontologo;
import com.backend.proyectoIntegrador.exceptions.ResourceNotFoundException;
import com.backend.proyectoIntegrador.repository.OdontologoRepository;
import com.backend.proyectoIntegrador.service.IOdontologoService;
import com.backend.proyectoIntegrador.utils.JsonPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OdontologoService implements IOdontologoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(OdontologoService.class);
    private final OdontologoRepository odontologoRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public OdontologoService(OdontologoRepository odontologoRepository, ObjectMapper objectMapper) {
        this.odontologoRepository = odontologoRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public OdontologoDto buscarOdontologoPorId(Long id) {
        Odontologo odontologoBuscado = odontologoRepository.findById(id).orElse(null);
        OdontologoDto odontologoDto = null;
        if (odontologoBuscado != null) {
            odontologoDto = objectMapper.convertValue(odontologoBuscado, OdontologoDto.class);
            LOGGER.info("Dentist found: {}", JsonPrinter.toString(odontologoDto));
        } else LOGGER.info("The dentist doesn´t exist");

        return odontologoDto;
    }

    @Override
    public List<OdontologoDto> listarOdontologos() {
        return odontologoRepository.findAll()
                .stream()
                .map(odontologo -> {
                    return new OdontologoDto(
                            odontologo.getId(),
                            odontologo.getMatricula(),
                            odontologo.getNombre(),
                            odontologo.getApellido());
                })
                .toList();
    }

    @Override
    public OdontologoDto registrarOdontologo(Odontologo odontologo) {
        Odontologo odontologoNuevo = odontologoRepository.save(odontologo);
        OdontologoDto odontologoDtoNuevo = objectMapper.convertValue(odontologoNuevo, OdontologoDto.class);
        LOGGER.info("Dentist saved: {}", odontologoDtoNuevo);

        return odontologoDtoNuevo;
    }

    @Override
    public OdontologoDto actualizarOdontologo(Odontologo odontologo) {
        Odontologo odontologoAActualizar = odontologoRepository.findById(odontologo.getId()).orElse(null);
        OdontologoDto odontologoDtoActualizado = null;
        if (odontologoAActualizar != null) {
            odontologoAActualizar = odontologo;
            odontologoRepository.save(odontologoAActualizar);
            odontologoDtoActualizado = objectMapper.convertValue(odontologoAActualizar, OdontologoDto.class);
            LOGGER.info("Dentist updated: {}", JsonPrinter.toString(odontologoDtoActualizado));
        } else {
            LOGGER.error("The dentist doesn´t exist");
        }
        return odontologoDtoActualizado;
    }

    @Override
    public void eliminarOdontologo(Long id) throws ResourceNotFoundException {
        if (buscarOdontologoPorId(id) != null) {
            odontologoRepository.deleteById(id);
            LOGGER.warn("Dentist with id {} deleted", id);
        } else {
            LOGGER.error("The dentist doesn´t exist");
            throw new ResourceNotFoundException("The dentist doesn´t exist");
        }
    }


}
