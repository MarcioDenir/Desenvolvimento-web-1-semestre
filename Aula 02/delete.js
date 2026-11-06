const mysql = require ("mysql2");

//conexao com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola"
});

//id do aluno que sera exluido
const id = 14;

const deletar = "DELETE FROM alunos WHERE id = ?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("Erro ao excluir o aluno.");
        console.log(erro);
    }else if(resultado.affectedRows === 0){
        console.log("Aluno não encontrado.");
        }else{
            console.log("Aluno excluido com sucesso!");
          }
    conexao.end();
})