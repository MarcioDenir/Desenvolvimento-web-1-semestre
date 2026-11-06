CREATE DATABASE escola_disciplina;

USE escola_disciplina;

CREATE TABLE disciplinas(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
professor VARCHAR(100) NOT NULL,
aulas_semanais INT NOT NULL
);  

SELECT*FROM disciplinas;