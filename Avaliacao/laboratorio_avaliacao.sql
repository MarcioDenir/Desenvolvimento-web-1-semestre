CREATE DATABASE laboratorio_avaliacao;

USE laboratorio_avaliacao;

CREATE TABLE computadores(
    id INT AUTO_INCREMENT PRIMARY KEY,
    patrimonio VARCHAR(50) NOT NULL,
    localizacao VARCHAR(100) NOT NULL,
    responsavel VARCHAR(100),
    situacao VARCHAR(30) NOT NULL
);


SELECT*FROM computadores;