const mysql= require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"steam"
});

//cadastar jogo

function cadastrarJogo(){
    const nome=readline.question("informe o nome do jogo que deseja cadastrar: ");
    const genero = readline.question("informe o genero do jogo: ");

    const inserir = "INSERT INTO jogos(nome,genero) VALUES(?,?)";

    conexao.query(inserir,[nome,genero],function(erro){
        if(erro){
            console.log("Erro ao cadastrar jogo ",erro);
        }else{
            console.log("Jogo cadastrado com sucesso!");
        }
        menu();
    });

}

//excluir jogo

function excluirJogo(){
    const id = readline.questionInt("informe o id do usuario que deseja excluir:");

    const deletar = "DELETE FROM jogos WHERE id = ?";

    conexao.query(deletar,[id],function(erro,resultado){
        if(erro){
            console.log("Erro ao excluir jogo!",erro);

        }else if(resultado.affectedRows === 0){
            console.log("Jogo não encontrado!");
        }else{
            console.log("Jogo excluido com sucesso!");
        }
        menu();
    });

}

// listar jogos

function listarJogos(){

    const sql = "SELECT*FROM jogos";

    conexao.query(sql,function(erro,jogo){
        if(erro){
            console.log("Erro ao buscar jogo!");
        }else{
            console.log("===== JOGOS =====");
            jogo.forEach(function(jogo){
                console.log("Id:"+jogo.id +" - "+
                    "Nome:"+jogo.nome +" - "+
                    "Genero:"+jogo.genero
                )
            });
       
        }
        menu();
    });

}
function atualizarJogo(){
    const nome = readline.question("Informe o nome do jogo que deseja atualizar:");
    const genero=readline.question("Informe o genero do jogo que sera atualzido: ");

    const update = `UPDATE jogos SET nome = ?, genero = ? WHERE id = ?`;

    const id = readline.question("Informe o id do jogo que deseja atualizar: ");

    conexao.query(update,[nome,genero,id],function(erro,resultado){
        if(erro){
            console.log("Erro ao atualizar jogo!",erro)
        }else if(resultado.affectedRows === 0){
            console.log("Jogo não encontrado!")
        }else{
            console.log("Jogo atualizado com sucesso!")
        }
        menu();
    });
}


function menu(){

 console.log("===== MENU =====");
        console.log("1 - Cadastrar jogo");
        console.log("2 - Excluir jogo");
        console.log("3 - Listar jogos");
        console.log("4 - Atualizar jogo")
        console.log("0 - Sair");
    
        const opcao = readline.questionInt("Escolha uma opção: ");
    
        if(opcao == 1 ){
            cadastrarJogo();
        }else  if(opcao == 2){
            excluirJogo();
        }else  if(opcao == 3){
            listarJogos();
        }else  if(opcao == 4){
            atualizarJogo();
        }else  if(opcao == 0){
            console.log("programa encerrado!")
            conexao.end();
        }else{
            console.log("Opção Invalida!")
            menu();
        }
    
    }
    
menu();

