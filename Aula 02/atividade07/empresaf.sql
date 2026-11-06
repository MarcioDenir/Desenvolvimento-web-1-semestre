CREATE DATABASE empresaf;

USE empresaf;

CREATE TABLE funcionarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    salario DECIMAL (10,2) NOT NULL
);

SELECT*FROM funcionarios;
