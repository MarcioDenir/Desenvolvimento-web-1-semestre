const mysql  =  require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"exemplo"
});
//inserir

function cadastrarAluno(){
const nome = readline.question("informe o nome do aluno: ");
const email = readline.question("informe o email do aluno:");

const inserir = "INSERT INTO alunos(nome,email) VALUES (?,?)";

conexao.query(inserir,[nome,email],function(erro){
    if(erro){
        console.log("erro ao cadastrar aluno!",erro);
    }else{
        console.log("Aluno cadastrado com sucesso!");
    }
    menu();
});
}

//deletar
function excluirAluno(){
const id = readline.questionInt("informe o id que deseja excluir");

const deletar = "DELETE FROM aluno WHERE id=?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("Erro ao excluir Aluno!",erro);
    }else if(resultado.affectedRows ===0){
        console.log("Aluno não encontrado!");
    }else{
        console.log("Aluno excluido com sucesso!");
    }
    menu();
});
}

//listar

function listarAluno(){
    const sql = "SELECT * FROM alunos";

    conexao.query(sql,function(erro,aluno){
        if(erro){
            console.log("Erro ao buscar Aluno!",erro);
        }else{
           console.log("===== Aluno =====")
        aluno.forEach(function(aluno){
            console.log("id "+aluno.id +" = "+
            "nome "+ aluno.nome +" = "+
            "email "+ aluno.email 
            );
        });
        }
        menu();
    });
}

function atualizarAluno(){
// Novos dados
const nome = readline.question("informe o nome atualizado: ");
const email = readline.question("informe o email atualizado: ");

 
// ID do aluno que será atualizado
const id = readline.questionInt("informe o id do aluno que será atualizado");
 
const update = `
    UPDATE alunos
    SET nome = ?, email = ?
    WHERE id = ?
`;
conexao.query(update, [nome, email,id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao atualizar o aluno.");
        console.log(erro);
    } else if (resultado.affectedRows === 0) {
        console.log("Aluno não encontrado.");
    } else {
        console.log("Aluno atualizado com sucesso!");
    }
 
    menu();
});
}

function menu(){
    console.log("===== MENU =====");
    console.log("1 - Cadastrar aluno");
    console.log("2 - Excluir aluno");
    console.log("3 - Listar aluno");
    console.log("4 - Atualizar Dados do aluno");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao == 1 ){
        cadastrarAluno();
    }else  if(opcao == 2){
        excluirAluno();
    }else  if(opcao == 3){
        listarAluno();
    }else  if(opcao == 4){
        atualizarAluno();
    }else  if(opcao == 0){
        console.log("programa encerrado!")
        conexao.end();
    }else{
        console.log("Opção Invalida!")

        menu();
    }

}

menu();