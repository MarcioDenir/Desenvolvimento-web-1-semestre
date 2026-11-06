create database ecommerce;

use ecommerce;

create table produtos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL (10,2));

SELECT*FROM produtos;

