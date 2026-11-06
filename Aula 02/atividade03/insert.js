const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"escola"
});

const nome = "Wellington";
const disciplina = "Banco de Dados SQL";

const inserir ="INSERT INTO professores(nome,disciplina) VALUES(?,?)";

conexao.query(inserir,[nome,disciplina],function(erro){
    if(erro){
        console.log("erro ao cadastrar professor!");
        console.log(erro);
    }else{
        console.log("Professor cadastrado com sucesso!");
        }
    conexao.end();
})