CREATE DATABASE shows;

USE shows;

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL, 
    data_evento DATE NOT NULL
);

SELECT * FROM eventos;