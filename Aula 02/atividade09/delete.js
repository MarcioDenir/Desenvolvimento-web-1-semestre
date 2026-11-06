const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"loja" 
});

const id = 1;

const deletar = "DELETE FROM vendas WHERE id = ?"

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("Erro ao excluir venda!");
        console.log(erro);
    }else if(resultado.affectedRows === 0){
        console.log("Venda nao encontrada!");
    }else{
        console.log("Venda excluida com sucesso!");
    }
    conexao.end();
});
