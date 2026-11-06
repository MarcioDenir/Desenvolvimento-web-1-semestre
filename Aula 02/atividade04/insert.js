const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"instituicao"  
});


const nome ="Relações Humanas";
const carga_horaria= 400;
/*const nome ="Desenvolvimento de Sistemas";
const carga_horaria= 1200;*/
/*const nome="Informática";
const carga_horaria= 1000;*/
/*const nome="Administração"
const carga_horaria= 800;*/


const inserir ="INSERT INTO cursos(nome,carga_horaria) VALUES(?,?)";

conexao.query(inserir,[nome,carga_horaria],function(erro){
    if(erro){
        console.log("erro ao cadastrar curso!");
        console.log(erro);
    }else{
        console.log("Curso cadastrado com sucesso!");
    }
    conexao.end();
});