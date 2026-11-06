const mysql  =  require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"atividades"
});
//inserir

function cadastrarTarefa(){
const descricao = readline.question("informe a descrição da tarefa: ");
const responsavel = readline.question("informe o nome do responsavel:");

const inserir = "INSERT INTO tarefas(descricao,responsavel) VALUES (?,?)";

conexao.query(inserir,[descricao,responsavel],function(erro){
    if(erro){
        console.log("erro ao cadastrar Tarefa!",erro);
    }else{
        console.log("Tarefa cadastrado com sucesso!");
    }
    menu();
});
}

//deletar
function excluirTarefa(){
const id = readline.questionInt("informe o id que deseja excluir");

const deletar = "DELETE FROM tarefas WHERE id=?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("Erro ao excluir Tarefa!",erro);
    }else if(resultado.affectedRows ===0){
        console.log("Tarefa não encontrada!");
    }else{
        console.log("Tarefa excluido com sucesso!");
    }
    menu();
});
}

//listar

function listarTarefa(){
    const sql ="SELECT * FROM tarefas";

    conexao.query(sql,function(erro,tarefa){
        if(erro){
            console.log("Erro ao buscar tarefas!");

        }else{
            console.log("===== TAREFAS =====");
            tarefa.forEach(function(tarefa){
                console.log(tarefa.id + " = "+
                    tarefa.descricao  + " = "+
                    tarefa.responsavel
                );
            });
        }
        menu();
    });
}



function menu(){
    console.log("===== MENU =====");
    console.log("1 - Cadastrar Tarefa");
    console.log("2 - Excluir Tarefa");
    console.log("3 - Listar Tarefa");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao == 1 ){
        cadastrarTarefa();
    }else  if(opcao == 2){
        excluirTarefa();
    }else  if(opcao == 3){
        listarTarefa();
    }else  if(opcao == 0){
        console.log("programa encerrado!")
        conexao.end();
    }else{
        console.log("Opção Invalida!")

        menu();
    }

}

menu();
