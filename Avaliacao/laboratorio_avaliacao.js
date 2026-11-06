const { read } = require("fs");
const mysql = require("mysql2");

const readline = require("readline-sync");


const conexao = mysql.createConnection({
host:"localhost",
user:"root",
password:"root",
database:"laboratorio_avaliacao"
});

//insert
function cadastrarComputador(){
const patrimonio = readline.question("Informe o nome do patrimonio: ");
const localizacao =readline.question("Informe a localizacao do computador: ");
const responsavel = readline.question("Informe o nome do responsavel pelo computador:");
const situacao = readline.question("Informe a situação do computador:");

const inserir ="INSERT INTO computadores "+
"(patrimonio,localizacao,responsavel,situacao) VALUES (?,?,?,?)";

conexao.query(inserir,[patrimonio,localizacao,responsavel,situacao],function(erro){
    if(erro){
        console.log("Erro ao cadastrar computador!",erro);
    }else{
        console.log("Computador cadastrado com sucesso!");
    }
    menu();
});
}

//delete

function excluirComputador(){
    const computadorId= readline.question("informe o id do computador:")
        const sql ="SELECT * FROM Computadores WHERE id = ?";
    
        conexao.query(sql,[computadorId],function(erro,computadores){
             if (erro) {
                console.log("Erro ao buscar computador:", erro);
            }else if (computadores.length === 0) {
                console.log("Computador não encontrado!");
                menu();
            }else{
    
                const computador = computadores[0];
    
                 console.log("\nComputador encontrado!");
                 console.log("Patrimônio:", computador.patrimonio);
                 console.log("Localização:", computador.localizacao);
                 console.log("Responsavel:", computador.responsavel);
                 console.log("Situação:", computador.situacao);
            }
    
        const opcao = readline.question("\nDeseja excluir? (S/N): ").toUpperCase();
    
        if (opcao === "S") {
          const deletar = "DELETE FROM Computadores WHERE id = ?";
    
          conexao.query(deletar,[computadorId],function (erro, resultado) {
              if (erro) {
                console.log("Erro ao excluir computador:", erro);
                return;
              }else if (resultado.affectedRows === 0) {
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

function listarComputadores(){

const sql = "SELECT * FROM  computadores";

conexao.query(sql,function(erro,computador){
    if(erro){
        console.log("Erro ao listar computadores",erro);
    }else if(computador.length === 0 ){
        console.log("Nem um computador cadastrado");
    }else{
        console.log("===== COMPUTADORES CADASTRADOS=====");
        computador.forEach(function(computador){
        console.log(computador.id+" - "+
            computador.patrimonio +" - "+
            computador.localizacao+" - "+
            computador.responsavel+" - "+
            computador.situacao
            );
        });
    }
    menu();
});

}

//update

function atualizarComputador(){

    const computadorId= readline.question("informe o id do computador:")
        const sql ="SELECT * FROM Computadores WHERE id = ?";
    
        conexao.query(sql,[computadorId],function(erro,computadores){
             if (erro) {
                console.log("Erro ao buscar computador:", erro);
                menu();
            }else if (computadores.length === 0) {
                console.log("Computador não encontrado!");
                menu();
            }else{
                const computador = computadores[0];
    
                console.log("\nComputador encontrado!");
                console.log("Patrimônio:", computador.patrimonio);
                console.log("Localização:", computador.localizacao);
                console.log("Responsavel:", computador.responsavel);
                console.log("Situação:", computador.situacao);
            }
    
    

        const localizacao =readline.question("Informe a nova localizacao do computador: ");
        const responsavel = readline.question("Informe o nome do novo responsavel pelo computador:");
        const situacao = readline.question("Informe a nova situação do computador:");

        const update =`UPDATE computadores SET  localizacao=?,
        responsavel = ?,situacao =? WHERE id =?`;

        const id = computadorId

        conexao.query(update,[localizacao,responsavel,situacao,id],function(erro,resultado){
        if(erro){
            console.log("Erro ao atualizar dados do computador!",erro);
        }else if(resultado.affectedRows === 0 ){
            console.log("Computador não encontrado!");
        }else{
            console.log("Computador atualizado com sucesso!");
        }
        menu();
        });
    });
}
    


function menu(){

    console.log("===== CONTROLE DO LABORATORIO =====");
    console.log("1 - Cadastrar computador");
    console.log("2 - Excluir computador");
    console.log("3 - Listar computadores");
    console.log("4 - Atualizar computador");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção:");

    if(opcao === 1 ){
        cadastrarComputador();
    }else if(opcao === 2){
        excluirComputador();
    }else if(opcao === 3){
        listarComputadores();
    }else if(opcao === 4){
        atualizarComputador();
    }else if(opcao === 0){
        console.log("programa encerrado!");
        conexao.end();
    }else{
        console.log("Opção digitada invalida");
        menu();
    }
   
}
 menu();