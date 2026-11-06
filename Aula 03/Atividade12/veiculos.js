const mysql  =  require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"localiza"
});
//inserir

function cadastrarVeiculo(){
const modelo = readline.question("informe o modelo do veiculo: ");
const placa = readline.question("informe a placa do veiculo:");

const inserir = "INSERT INTO veiculos(modelo,placa) VALUES (?,?)";

conexao.query(inserir,[modelo,placa],function(erro){
    if(erro){
        console.log("erro ao cadastrar Veiculo!",erro);
    }else{
        console.log("Veiculo cadastrado com sucesso!");
    }
    menu();
});
}

//deletar
function excluirVeiculo(){
const id = readline.questionInt("informe o id que deseja excluir");

const deletar = "DELETE FROM veiculos WHERE id=?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("Erro ao excluir Veiculo!",erro);
    }else if(resultado.affectedRows ===0){
        console.log("veiculo não encontrada!");
    }else{
        console.log("veiculo excluido com sucesso!");
    }
    menu();
});
}

//listar

function listarVeiculo(){
    const sql ="SELECT * FROM veiculos";

    conexao.query(sql,function(erro,veiculo){
        if(erro){
            console.log("Erro ao buscar veiculos!");

        }else{
            console.log("===== VEICULOS =====");
            veiculo.forEach(function(veiculo){
                console.log(veiculo.id + " = "+
                    veiculo.modelo  + " = "+
                    veiculo.placa
                );
            });
        }
        menu();
    });
}



function menu(){
    console.log("===== MENU =====");
    console.log("1 - Cadastrar Veiculo");
    console.log("2 - Excluir Veiculo");
    console.log("3 - Listar Veiculos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao == 1 ){
        cadastrarVeiculo();
    }else  if(opcao == 2){
        excluirVeiculo();
    }else  if(opcao == 3){
        listarVeiculo();
    }else  if(opcao == 0){
        console.log("programa encerrado!")
        conexao.end();
    }else{
        console.log("Opção Invalida!")

        menu();
    }

}

menu();
