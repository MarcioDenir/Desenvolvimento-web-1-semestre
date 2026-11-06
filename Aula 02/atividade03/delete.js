const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"escola"
});

const id = 20;

const deletar = "DELETE FROM professores WHERE id = ?"

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("Erro ao excluir o professor!");
        console.log(erro);

    }else if(resultado.affectedRows === 0){
        console.log("Professor não encontrado!");
    }else{
        console.log("Professor excluido com sucesso!");
    }
    conexao.end();
});