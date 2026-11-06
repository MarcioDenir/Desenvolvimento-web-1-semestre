const mysql = require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
host:"localhost",
user:"root",
password:"root",
database:"universidade"
});

function cadastrarAluno(){
    const nome = readline.question("Informe o nome do aluno: ");
    const email= readline.question("Informe o email do aluno: ");
    const endereco = readline.question("Informe o endereço do aluno: ");
    const matricula = readline.question("Informe a matricula do aluno: ");
    const curso = readline.question("Informe o curso do aluno: ");
    const serie =  readline.question("Informe a serie do aluno; ");

    const inserir = "INSERT INTO alunos(nome,email,endereco,matricula,curso,serie) VALUES(?,?,?,?,?,?)";

    conexao.query(inserir,[nome,email,endereco,matricula,curso,serie],function(erro){
        if(erro){
            console.log("Erro ao cadastrar");
            console.log(erro);
        }else{
            console.log("Aluno cadastrado com sucesso!");
        }
        
        menu();
    });
}


function excluirAluno(){
    const id = readline.questionInt("Informe o id do aluno que deseja excluir: ");

    const deletar= ("DELETE FROM alunos WHERE id = ? ");

    conexao.query(deletar,[id],function(erro,resultado){
        if(erro){
            console.log("Erro ao excluir aluno!");
            console.log(erro);
        }else if(resultado.affectedRows === 0){
            console.log("Aluno não encontrado!");
        }else{
            console.log("Aluno excluido com sucesso!");
        }
        menu();
    }); 
}

function listarAluno(){
    const sql = "SELECT*FROM alunos";

    conexao.query(sql,function(erro,aluno){
        if(erro){
            console.log("Erro ao buscar aluno!");
            }else{
                console.log("\n --- ALUNOS ---");
                aluno.forEach(function(aluno){
                     console.log(
                    aluno.id +"-"+
                    aluno.nome +"-"+
                    aluno.email
                )});
            }
            menu();
    });
}

function menu(){
    console.log("===== MENU =====");
        console.log("1 - Cadastrar aluno");
        console.log("2 - Excluir aluno");
        console.log("3 - Listar aluno");
        console.log("0 - Sair");
    
        const opcao = readline.questionInt("Escolha uma opção: ");
    
        if(opcao == 1 ){
            cadastrarAluno();
        }else  if(opcao == 2){
            excluirAluno();
        }else  if(opcao == 3){
            listarAluno();
        }else  if(opcao == 0){
            console.log("programa encerrado!")
            conexao.end();
        }else{
            console.log("Opção Invalida!")
            menu();
        }
    
    }
    
menu();
    
