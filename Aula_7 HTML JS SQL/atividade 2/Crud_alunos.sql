CREATE DATABASE Crud_alunos;

USE Crud_alunos;

CREATE TABLE alunos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    turma VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    email VARCHAR(100) NOT NULL
);

DESCRIBE alunos;

INSERT INTO alunos (nome, turma, idade, email) VALUES
('Ana Silva', '1A', 15, 'ana.silva@email.com'),
('Bruno Costa', '2B', 16, 'bruno.costa@email.com'),
('Carla Souza', '3C', 17, 'carla.souza@email.com');

SELECT * FROM alunos;