package com.backend.proyectoIntegrador;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class IntegradoraApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(IntegradoraApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(IntegradoraApplication.class, args);
        LOGGER.info("Final project is now RUNNING ...");
    }

}
