CREATE DATABASE loja;

USE loja;

CREATE TABLE vendas(
    id INT AUTO_INCREMENT PRIMARY key,
    produto VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL
);

SELECT*FROM vendas;
