CREATE DATABASE instituicao2;

USE ex;

CREATE TABLE alunos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargaHoraria INT NOT NULL
);

SELECT *FROM alunos;