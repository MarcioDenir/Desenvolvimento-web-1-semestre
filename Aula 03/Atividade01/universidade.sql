CREATE DATABASE universidade;

USE universidade;

CREATE TABLE alunos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    endereco VARCHAR(100) NOT NULL,
    matricula VARCHAR(100) NOT NULL,
    curso VARCHAR(100) NOT NULL,
    serie VARCHAR(100) NOT NULL
);

SELECT*FROM alunos