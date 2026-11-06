CREATE DATABASE mercearia;

USE mercearia;

CREATE TABLE produtos(

id INT AUTO_INCREMENT PRIMARY KEY,

nome VARCHAR(100) NOT NUll,

preco DECIMAL(10,2) NOT NUll,

quantidade INT NOT NUll

);

SELECT*FROM produtos;