const mysql= require("mysql2");

const readline = require("readline-sync");

const conexao=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"weg"
});

//cadastrar funcionario

function cadastrarFuncionario(){
    const nome = readline.question("Informe o nome do funcionario: ");
    const cargo = readline.question("Informe o cargo do funcionario: ");

    const inserir ="INSERT INTO funcionarios(nome,cargo) VALUES(?,?)";

    conexao.query(inserir,[nome,cargo],function(erro){
        if(erro){
            console.log("Erro ao cadastrar filme",erro);
            }else{
                console.log("Funcionario cadastrado com sucesso!");
            }
            menu();
    });

}

//excluir Funcionario();

function excluirFuncionario(){
    const id = readline.questionInt("Informe o id do usuario que deseja excluir: ");

    const deletar="DELETE FROM funcionarios WHERE id = ?";

    conexao.query(deletar,[id],function(erro,resultado){
        if(erro){
            console.log("Erro ao excluir funcionario",erro);
        }else if(resultado.affectedRows === 0){
            console.log("Funcionario nao encontrado");
        }else{
            console.log("Funcionario excluido com sucesso!");
        }
        menu();
    });
}

//listar Funcionario

function listarFuncionario(){
    const sql ="SELECT * FROM funcionarios";

    conexao.query(sql,function(erro,funcionario){
        console.log("===== FUNCIONARIOS =====")
        funcionario.forEach(function(funcionario){
            console.log(funcionario.id +" = "+
                funcionario.nome +" = "+
                funcionario.cargo
            );
        });
        menu();
    });

}

function menu(){
    console.log("===== MENU =====");
    console.log("1 - Cadastrar funcionario");
    console.log("2 - Excluir funcionario");
    console.log("3 - Listar funcionario");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao == 1 ){
        cadastrarFuncionario();
    }else  if(opcao == 2){
        excluirFuncionario();
    }else  if(opcao == 3){
        listarFuncionario();
    }else  if(opcao == 0){
        console.log("programa encerrado!")
        conexao.end();
    }else{
        console.log("Opção Invalida!")

        menu();
    }

}

menu();
