package com.backend.proyectoIntegrador.dto;

import com.backend.proyectoIntegrador.entity.Turno;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDate;
import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TurnoDto {
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime fechaAsistencia;
    private String pacienteDto;
    private String odontologoDto;

    public TurnoDto(Long id, LocalDateTime fechaAsistencia, String pacienteDto, String odontologoDto) {
        this.id = id;
        this.fechaAsistencia = fechaAsistencia;
        this.pacienteDto = pacienteDto;
        this.odontologoDto = odontologoDto;
    }

    public TurnoDto(Long id, LocalDate fechaAsistencia, String paciente, String odontologo) {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFechaAsistencia() {
        return fechaAsistencia;
    }

    public void setFechaAsistencia(LocalDateTime fechaAsistencia) {
        this.fechaAsistencia = fechaAsistencia;
    }

    public String getPacienteDto() {
        return pacienteDto;
    }

    public void setPacienteDto(String pacienteDto) {
        this.pacienteDto = pacienteDto;
    }

    public String getOdontologoDto() {
        return odontologoDto;
    }

    public void setOdontologoDto(String odontologoDto) {
        this.odontologoDto = odontologoDto;
    }

    public static TurnoDto fromTurno(Turno turno) {
        String paciente = turno.getPaciente().getNombre() + " " + turno.getPaciente().getApellido();
        String odontologo = turno.getOdontologo().getNombre() + " " + turno.getOdontologo().getApellido();
        return new TurnoDto(turno.getId(), turno.getFechaAsistencia(), paciente, odontologo);
    }
}
