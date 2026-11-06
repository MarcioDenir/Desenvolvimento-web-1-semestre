const mysql = require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"livraria"
});

// cadastar livros

function cadastrarLivro(){
    const titulo = readline.question("Informe o nome do livro: ");
    const autor = readline.question("informe o autor do livro: ");
    

    const inserir = "INSERT INTO livros(titulo,autor) VALUES (?,?)";

    conexao.query(inserir,[titulo,autor],function(erro){
        if(erro){
            console.log("erro ao cadastrar Livro",erro);
        }else{
            console.log("Livro cadastrado com sucesso!")
        }
        menu();
    });
}

function excluirLivro(){
    const id = readline.questionInt("informe o id do livro que deseja excluir: ");

    const deletar = "DELETE FROM livros WHERE id = ?";

    conexao.query(deletar,[id],function(erro,resultado){
        if(erro){
            console.log("Erro ao excluir produto",erro);
        }else if(resultado.affectedRows === 0){
            console.log("Produto nao encontrado!")
        }else{
            console.log("Produto excluido com sucesso!");
        }
        menu();
    })
}



function listarLivro(){
        const sql = "SELECT*FROM livros";

        conexao.query(sql,function(erro,livro){
            if(erro){
                console.log("erro ao buscar livro",erro);

            }else{
                console.log("===== LIVROS =====");
                livro.forEach(function(livro){
                    console.log("Id: "+livro.id+" - "+
                        "Titulo: "+livro.titulo+" - "+
                        "Autor: "+livro.autor
                    )

                })
            }
        menu();
        });
       
}

function atualizarLivro(){
    const titulo = readline.question("Informe o titulo do livro atualizado: ");
    const autor =readline.question("informe o nome do autor atualizado: ");

    const update = `UPDATE livros SET titulo = ?, autor = ? WHERE id = ?`;

    const id = readline.questionInt("Informe o id do livro que deseja atualizar: ");

    conexao.query(update,[titulo,autor,id],function(erro,resultado){
        if(erro){
            console.log("Erro ao atualizar livro",erro);
        }else if(resultado.affectedRows === 0){
            console.log("Livro não encontrado");
        }else{
            console.log("Livro atualizado com sucesso!");
        }
        menu();
    });
}

function menu(){
    console.log("===== MENU =====");
        console.log("1 - Cadastrar livro");
        console.log("2 - Excluir livro");
        console.log("3 - Listar livro");
        console.log("4 - Atualizar livro");
        console.log("0 - Sair");
    
        const opcao = readline.questionInt("Escolha uma opção: ");
    
        if(opcao == 1 ){
            cadastrarLivro();
        }else  if(opcao == 2){
            excluirLivro();
        }else  if(opcao == 3){
            listarLivro();
        }else  if(opcao == 4){
            atualizarLivro();
        }else  if(opcao == 0){
            console.log("programa encerrado!")
            conexao.end();
        }else{
            console.log("Opção Invalida!")
            menu();
        }
    
    }
    
menu();
