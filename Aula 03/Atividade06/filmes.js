const mysql = require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"locadora" 
});

//cadastrar filme

function cadastrarFilme(){
    const titulo = readline.question("Informe o titulo do filme: ");
    const ano = readline.questionInt("Informe o ano do filme: ");

    const inserir = "INSERT INTO filmes(titulo,ano) VALUES(?,?)";

    conexao.query(inserir,[titulo,ano],function(erro){
        if(erro){
            console.log("Erro ao cadastrar filme:",erro);
        }else{
            console.log("Filme cadastrado com sucesso!");
        }
        menu();
    });

}

//excluir filme

function excluirFilme(){
    const id = readline.questionInt("Informe o id do filme que deseja excluir!");

    const deletar ="DELETE FROM filmes WHERE id = ?";

    conexao.query(deletar,[id],function(erro,resultado){
        if(erro){
            console.log("Erro ao excluir filme",erro);
        }else if(resultado.affectedRows === 0){
            console.log("Filme não encontrado");
        }else{
            console.log("Filme excluido com sucesso!");
        }
        menu();
    });

}

function listarFilmes(){

    const sql = "SELECT * FROM filmes";

    conexao.query(sql,function(erro,filme){
        if(erro){
            console.log("Erro ao buscar filme");
        }else{
            console.log("===== FILMES =====");
            filme.forEach(function(filme){
                console.log(filme.id +" = "+
                    filme.titulo +" = "+
                    filme.ano
                );
            });
        }
        menu();
    });

}

function menu(){
    console.log("==== MENU ====")
   
    console.log("1 - Cadastra Filme");
    console.log("2 - Excluir Filme");
    console.log("3 - listar Filmes");
    console.log("0 - Sair")
    const opcao =readline.questionInt("Selecione uma opção: "); 

    if(opcao === 1){
        cadastrarFilme();
    }else if(opcao == 2){
        excluirFilme();
    }else if(opcao == 3){
        listarFilmes();
    }else if(opcao == 0){
        console.log("Programa encerrado!");
        conexao.end();
    }else{
        console.log("Opção invalida!");
        menu();
    }

}

menu();