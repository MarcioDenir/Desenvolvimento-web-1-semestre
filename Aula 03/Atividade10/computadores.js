const mysql  =  require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"laboratorio"
});
//inserir

function cadastrarComputadores(){
const patrimonio = readline.question("informe o patrimonio do computador: ");
const localizacao = readline.question("informe a localizacão do computador:");

const inserir = "INSERT INTO computadores(patrimonio,localizacao) VALUES (?,?)";

conexao.query(inserir,[patrimonio,localizacao],function(erro){
    if(erro){
        console.log("erro ao cadastrar Computador!",erro);
    }else{
        console.log("Computador cadastrado com sucesso!");
    }
    menu();
});
}

//deletar
function excluirComputadores(){
const id = readline.questionInt("informe o id que deseja excluir");

const deletar = "DELETE FROM Computadores WHERE id=?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("Erro ao excluir Computador!",erro);
    }else if(resultado.affectedRows ===0){
        console.log("Computador não encontrado!");
    }else{
        console.log("Computador excluido com sucesso!");
    }
    menu();
});
}

//listar

function listarComputadores(){
    const sql ="SELECT * FROM Computadores";

    conexao.query(sql,function(erro,computador){
        if(erro){
            console.log("Erro ao buscar computador!");

        }else{
            console.log("===== COMPUTADORES =====");
            computador.forEach(function(computador){
                console.log(computador.id + " = "+
                    computador.patrimonio  + " = "+
                    computador.localizacao
                );
            });
        }
        menu();
    });
}



function menu(){
    console.log("===== MENU =====");
    console.log("1 - Cadastrar Computadores");
    console.log("2 - Excluir Computadores");
    console.log("3 - Listar Computadores");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao == 1 ){
        cadastrarComputadores();
    }else  if(opcao == 2){
        excluirComputadores();
    }else  if(opcao == 3){
        listarComputadores();
    }else  if(opcao == 0){
        console.log("programa encerrado!")
        conexao.end();
    }else{
        console.log("Opção Invalida!")

        menu();
    }

}

menu();
