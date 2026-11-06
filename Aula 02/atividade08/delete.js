const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"escola_disciplina"
});

const id = 5;

const deletar = "DELETE FROM disciplinas WHERE id = ?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("Erro ao deletar Disciplina");
    }else if(resultado.affectedRows === 0){
            console.log("Disciplina não encontrada!");
    }else{
        console.log("Disciplina deletada com sucesso!");
    }
    conexao.end();
});