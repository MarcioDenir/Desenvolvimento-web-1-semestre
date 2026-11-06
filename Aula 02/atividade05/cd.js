const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"empresa"  
});

//insert
const nome = "Ana Souza";
const telefone = "47999990000";

//const nome = "Pedro Lima";
//const telefone ="47988880000";

//const nome = "Juliana Costa";
//const telefone = "47977770000";

const inserir = "INSERT INTO cliente(nome,telefone) VALUES (?,?)";

conexao.query(inserir,[nome,telefone],function(erro){
    if(erro){
        console.log("Erro ao cadastrar cliente!");
        console.log(erro);
    }else{
        console.log("Cliente cadastrado com sucesso!");
    }
    conexao.end();
});

/*
//delete

const id = 2;
const deletar = "DELETE FROM cliente WHERE id = ?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("Erro ao excluir cliente");
        console.log(erro);
    }else if(resultado.affectedRows === 0){
        console.log("Cliente não encontrado");
    }else{
        console.log("cliente excluido com sucesso");
    }
    conexao.end();

});*/
