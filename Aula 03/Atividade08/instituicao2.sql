CREATE DATABASE instituicao2;

USE instituicao2;

CREATE TABLE cursos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargaHoraria INT NOT NULL
);

SELECT *FROM cursos;