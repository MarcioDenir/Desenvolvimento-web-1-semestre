const mysql = require("mysql2");

const conexao = mysql.createConnection({
host:"localhost",
user:"root",
password:"root",
database:"empresaf"
});

//insert
//const nome = "João" 
//const cargo="Vendedor" 
//const salario = 2500.00;

//const nome="Mariana" ;
//const cargo = "Gerente";
//const salario = 4500.00;

//const nome ="Lucas"; 
//const cargo = "Atendente";
//const salario = 2200.00;

const nome ="Cris"; 
const cargo = "Chefa";
const salario = 4000.00;

const inserir = "INSERT INTO funcionarios(nome,cargo,salario) VALUES(?,?,?)";

conexao.query(inserir,[nome,cargo,salario],function(erro){
    if(erro){
        console.log("Erro ao cadastrar funcionario!");
        console.log(erro);
    }else{
        console.log("funcionario cadastrado com sucesso!");
    }
    conexao.end();
});
/*
//delete

const id = 3 ;

const id = 50;

const deletar ="DELETE FROM funcionarios WHERE id =?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("erro ao excluir funcionario!");
        console.log(erro);
        }else if(resultado.affectedRows === 0){
            console.log("funcionario não encontrado!");
            }else{
             console.log("Funcionario excluido com sucesso!");
            }
        conexao.end();
});*/