package com.backend.proyectoIntegrador.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "TURNOS")
public class Turno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @FutureOrPresent(message = "La fecha no puede ser anterior al día de hoy")
    @NotNull(message = "Debe especificarse la fecha y hora del turno")
    private LocalDateTime fechaAsistencia;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "paciente_id", nullable = false)
    @NotNull(message = "El paciente no puede ser nulo")
    private Paciente paciente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "odontologo_id", nullable = false)
    @NotNull(message = "El odontologo no puede ser nulo")
    private Odontologo odontologo;

    public Turno() {
    }

    public Turno(LocalDateTime fechaAsistencia, Paciente paciente, Odontologo odontologo) {
        this.fechaAsistencia = fechaAsistencia;
        this.paciente = paciente;
        this.odontologo = odontologo;
    }

    public Long getId() {
        return id;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Odontologo getOdontologo() {
        return odontologo;
    }

    public void setOdontologo(Odontologo odontologo) {
        this.odontologo = odontologo;
    }

    public LocalDateTime getFechaAsistencia() {
        return fechaAsistencia;
    }

    public void setFechaAsistencia(LocalDateTime fechaAsistencia) {
        this.fechaAsistencia = fechaAsistencia;
    }
}
