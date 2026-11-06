const mysql = require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"havan"
});

function cadastrarCliente(){
    const nome =readline.question("Informe o nome do cliente: ");
    const telefone = readline.question("Informe o telefone do cliente: ");

    const inserir ="INSERT INTO clientes(nome,telefone) VALUES (?,?)";

    conexao.query(inserir,[nome,telefone],function(erro){
        if(erro){
            console.log("Erro ao cadastrar cliente",erro);
        }else{
            console.log("Cliente cadastrado com sucesso!");
        }
        menu();
    });

}

function excluirCliente(){

    const id = readline.questionInt("Infome o id do cliente que deseja excluir");

    const deletar ="DELETE FROM clientes WHERE id = ?";


    conexao.query(deletar,[id],function(erro,resultado){
        if(erro){
            console.log("Erro ao excluir cliente",erro)
        }else if(resultado.affectedRows === 0){
            console.log("Cliente não encontrado")
        }else{
            console.log("Cliente excluido com sucesso")
        }
        menu();
    });


}


function listarCliente(){
    const sql = "SELECT*FROM clientes";

    conexao.query(sql,function(erro,cliente){
        if(erro){
            console.log("Erro ao buscar cliente");

        }else{
            console.log("===== CLIENTES =====");
            cliente.forEach(function(cliente){
                console.log(cliente.id +" - "+
                    cliente.nome +" - "+
                    cliente.telefone
                );
            });

        }
        menu();
    })
}
function atualiarCliente(){
    const nome=readline.question("Informe o nome do cliente atualizado: ");
    const telefone=readline.question("Informe o telefone do cliente atualizado:");

    const update = `UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?`;

    const id = readline.questionInt("informe o id do cliente que deseja atualizar: ");

    conexao.query(update,[nome,telefone,id],function(erro,resultado){
        if(erro){
            console.log("Erro ao atualizar cliente!",erro)
        }else if(resultado.affectedRows === 0){
            console.log("Cliente não encontrado!")
        }else{
            console.log("Cliente atualizado com sucesso!")
        }
        menu();
    });
}

function menu(){
    console.log("===== MENU =====");
        console.log("1 - Cadastrar cliente");
        console.log("2 - Excluir cliente");
        console.log("3 - Listar Cliente");
        console.log("4 - Atualizar Cliente");
        console.log("0 - Sair");
    
        const opcao = readline.questionInt("Escolha uma opção: ");
    
        if(opcao == 1 ){
            cadastrarCliente();
        }else  if(opcao == 2){
            excluirCliente();
        }else  if(opcao == 3){
            listarCliente();
        }else  if(opcao == 4){
            atualiarCliente();
        }else  if(opcao == 0){
            console.log("programa encerrado!")
            conexao.end();
        }else{
            console.log("Opção Invalida!")
            menu();
        }
    
    }
    
menu();
