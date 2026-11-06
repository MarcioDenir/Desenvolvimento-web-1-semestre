CREATE DATABASE laboratorio;

USE laboratorio;

CREATE TABLE computadores ( 
id INT AUTO_INCREMENT PRIMARY KEY,
patrimonio VARCHAR(50) NOT NULL,
localizacao VARCHAR(100)NOT NULL
);

SELECT * FROM computadores;