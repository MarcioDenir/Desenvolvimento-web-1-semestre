
const mysql  =  require("mysql2");
const { escape } = require("node:querystring");


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
localizarComputado()
const opcao = readline.question("Deseja excluir? (S/N):")
if(opcao.toUpperCase()== "S"){
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
    }else if(opcao.toUpperCase()=== "N"){
        console.log("Exclusão cancelada!")
        menu();
    }
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

//atualizar

function AtualizarComputador(){
    const patrimonio = readline.question("informe o patrimonio do computador Atualizado: ");
    const localizacao = readline.question("informe a localização do computador atualizada: ");

    const update = `UPDATE computadores SET patrimonio =?, localizacao = ? WHERE id =?`;

    const id = readline.questionInt("informe o id do computador que deseja atualziar: ");

    conexao.query(update,[patrimonio,localizacao,id],function(erro,resultado){
        if(erro){
            console.log("Erro ao atualizar computador!");
        }else if(resultado.affectedRows === 0) {
            console.log("Computador não encontrado!");
        }else{
            console.log("Computador atualizado com sucesso!");
        }
        menu();
    })
}

function localizarComputador(){
    const computadorId= readline.question("informe o id do computador:")
    const sql ="SELECT * FROM Computadores WHERE id = ?";

    conexao.query(sql,[computadorId],function(erro,computadores){
         if (erro) {
      console.log("Erro ao buscar computador:", erro);
      return;
    }

    if (computadores.length === 0) {
      console.log("Computador não encontrado!");
      menu();
      return;
    }

    const computador = computadores[0];

    console.log("\nComputador encontrado!");
    console.log("Patrimônio:", computador.patrimonio);
    console.log("Localização:", computador.localizacao);

    const opcao = readline
      .question("\nDeseja excluir? (S/N): ")
      .toUpperCase();

    if (opcao === "S") {
      const deletar = "DELETE FROM Computadores WHERE id = ?";

      conexao.query(
        deletar,
        [computadorId],
        function (erro, resultado) {
          if (erro) {
            console.log("Erro ao excluir computador:", erro);
            return;
          }

          if (resultado.affectedRows === 0) {
            console.log("Computador não encontrado!");
          } else {
            console.log("Computador excluído com sucesso!");
          }

          menu();
        }
      );
    } else if (opcao === "N") {
      console.log("Exclusão cancelada!");
      menu();
    } else {
      console.log("Opção inválida!");
      menu();
    }
  });
}
        




function menu(){
    console.log("===== MENU =====");
    console.log("1 - Cadastrar Computadores");
    console.log("2 - Excluir Computadores");
    console.log("3 - Listar Computadores");
    console.log("4 - Atualizar Computadores");
    console.log("5 - Excluir Computador id");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao == 1 ){
        cadastrarComputadores();
    }else  if(opcao == 2){
        excluirComputadores();
    }else  if(opcao == 3){
        listarComputadores();
    }else  if(opcao == 4){
        AtualizarComputador();
    }else  if(opcao == 5){
        localizarComputador();
    }else  if(opcao == 0){
        console.log("programa encerrado!")
        conexao.end();
    }else{
        console.log("Opção Invalida!")

        menu();
    }

}

menu();
