const mysql = require("mysql2");

const conexao = mysql.createConnection({
host:"localhost",
user:"root",
password:"root",
database:"instituicao"
});

const id = 3 ;

const deletar = "DELETE FROM cursos WHERE id = ?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("erro ao escluir curso!")
        console.log(erro);
    }else if(resultado.affectedRows === 0 ){
        console.log("Curso não encontrado!");
    }else{
        console.log("Curso excluido com sucesso!");
    }
    conexao.end();
});