const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"locadora"
});

//inserir

//const titulo = "Interestelar";
//const ano = 2014;

//const titulo = "Avatar";
//const ano = 2009;

//const titulo = "Toy Story";
//const ano = 1995;

const titulo = "Lagoa Azul";
const ano = 1980;

const inserir = "INSERT INTO filmes(titulo,ano) VALUES (?,?)";

conexao.query(inserir,[titulo,ano],function(erro){
    if(erro){
        console.log("erro ao cadastar Filme!");
        console.log(erro);
    }else{
        console.log("Filme cadastrado com sucesso!");
    }
    conexao.end();
});
/*
//delete

const id = 2;

const deletar = "DELETE FROM filmes WHERE id = ?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("erro ao excluir filme!");
        console.log(erro);
    }else if(resultado.affectedRows === 0){
        console.log("Filme não encontrado!");
    }else{
        console.log("filme deletado com sucesso!")
    }
        conexao.end();
});*/