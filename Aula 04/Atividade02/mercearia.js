const mysql = require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"mercearia"
});

// cadastar produtos

function cadastrarProduto(){
    const nome = readline.question("Informe o nome do produto: ");
    const preco = readline.questionFloat("informe o preço do produto: ");
    const quantidade =readline.questionInt("Informe a quantidade do produto:");

    const inserir = "INSERT INTO produtos(nome,preco,quantidade) VALUES (?,?,?)";

    conexao.query(inserir,[nome,preco,quantidade],function(erro){
        if(erro){
            console.log("erro ao cadastrar produto",erro);
        }else{
            console.log("Produto cadastrado com sucesso!")
        }
        menu();
    });
}

function excluirProduto(){
    const id = readline.questionInt("informe o id do produto que deseja excluir: ");

    const deletar = "DELETE FROM produtos WHERE id = ?";

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

function listarProduto(){
    const sql = "SELECT*FROM produtos";

    conexao.query(sql,function(erro,produto){
        if(erro){
            console.log("Erro ao buscar produto");
        }else{
            console.log("===== Produtos =====");
            produto.forEach(function(produto){
            console.log("Id = "+produto.id +" - "+
                "Nome = "+produto.nome +" - "+
                "Preço = "+produto.preco +" - "+
                "Quantidade = "+produto.quantidade
            )});
        }
        menu();
    });
}

function atualizarProduto(){
    const nome=readline.question("Informe o nome do produto atualizado: ");
    const preco =readline.questionFloat("Informe o preço do produto atualizado");
    const quantidade=readline.question("Informe a quantidade do produto atualizada: ");

    const update = `UPDATE produtos
     SET nome = ?, preco = ?, quantidade = ? WHERE id = ?`;
    const id = readline.questionInt("Informe o id do produto que deseja atualizar: ");

    conexao.query(update,[nome,preco,quantidade,id],function(erro,resultado){
        if(erro){
            console.log("Erro ao atualizar produto!",erro);
        }else if(resultado.affectedRows === 0 ){
            console.log("Produto não encontrado!");
        }else {
            console.log("Produto atualizado com sucesso!");
        }
        menu();
    });
}

function menu(){
    console.log("===== MENU =====");
        console.log("1 - Cadastrar produto");
        console.log("2 - Excluir produto");
        console.log("3 - Listar produto");
        console.log("4 - Atualizar produto");
        console.log("0 - Sair");
    
        const opcao = readline.questionInt("Escolha uma opção: ");
    
        if(opcao == 1 ){
            cadastrarProduto();
        }else  if(opcao == 2){
            excluirProduto();
        }else  if(opcao == 3){
            listarProduto();
        }else  if(opcao == 4){
            atualizarProduto();
        
        }else  if(opcao == 0){
            console.log("programa encerrado!")
            conexao.end();
        }else{
            console.log("Opção Invalida!")
            menu();
        }
    
    }
    
menu();
