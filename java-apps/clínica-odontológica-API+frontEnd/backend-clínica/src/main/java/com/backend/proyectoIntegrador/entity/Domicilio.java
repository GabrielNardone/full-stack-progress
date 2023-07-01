package com.backend.proyectoIntegrador.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table(name = "DOMICILIOS")
public class Domicilio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String calle;
    private int numero;

    @Size(max = 30, message = "La localidad debe tener hasta 30 caracteres")
    @NotNull(message = "La localidad no puede ser nulo")
    @NotBlank(message = "Debe especificarse el nombre de la localidad")
    private String localidad;

    @Size(max = 30, message = "La localidad debe tener hasta 30 caracteres")
    @NotNull(message = "La provincia no puede ser nulo")
    @NotBlank(message = "Debe especificarse el nombre de la provincia")
    private String provincia;

    public Domicilio() {
    }


    public Domicilio(String calle, int numero, String localidad, String provincia) {
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.provincia = provincia;
    }

    public Long getId() {
        return id;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }


}
