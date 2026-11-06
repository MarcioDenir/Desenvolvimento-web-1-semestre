const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"loja" 
});

//select

const selecionar = "SELECT*FROM vendas;"

conexao.query(selecionar,function(erro,resultados){
    if(erro){
        console.log("erro ao consultar!");
        console.log(erro);

    }else{
        console.log(resultados)
    }
    conexao.end();
});