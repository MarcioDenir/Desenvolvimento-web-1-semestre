const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"escola_disciplina"
});

// select

const selecionar = "SELECT*FROM disciplinas";

conexao.query(selecionar, function(erro, resultados){
  if (erro) {
    console.error("Erro no SELECT:", erro);
    return;
  }else{
  console.log(resultados); // lista de linhas
  }
  conexao.end();
});