const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"escola_disciplina"
});

//insert

/*Banco de Dados — Carlos — 4 aulas semanais;

· Programação — Fernanda — 5 aulas semanais;

· Análise de Dados — Maria — 3 aulas semanais.*/

const nome= "Banco de Dados";
const professor = "Carlos";
const aulas_semanais = 4;

/*const nome= "Programação";
const professor = "Fernanda";
const aulas_semanais = 5;

const nome= "Análise de Dados";
const professor = "Maria";
const aulas_semanais = 3;

const nome= "Programação Orientada a Objetos";
const professor = "Juliano";
const aulas_semanais = 5;*/ 


const inserir = "INSERT INTO disciplinas(nome,professor,aulas_semanais) VALUES(?,?,?)";

conexao.query(inserir,[nome,professor,aulas_semanais],function(erro){
    if(erro){
        console.log("Erro ao cadastrar disciplina");
        console.log(erro);

    }else{
        console.log("Disciplina cadastrada com sucesso!")

    }
    conexao.end();
});

