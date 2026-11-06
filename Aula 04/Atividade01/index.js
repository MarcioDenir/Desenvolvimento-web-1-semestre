const mysql = require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
host:"localhost",
user:"root",
password:"root",
database:"universidade"
});

function cadastrarAluno(){
    const nome = readline.question("Informe o nome do aluno: ");
    const email= readline.question("Informe o email do aluno: ");
    const endereco = readline.question("Informe o endereço do aluno: ");
    const matricula = readline.question("Informe a matricula do aluno: ");
    const curso = readline.question("Informe o curso do aluno: ");
    const serie =  readline.question("Informe a serie do aluno; ");

    const inserir = "INSERT INTO alunos(nome,email,endereco,matricula,curso,serie) VALUES(?,?,?,?,?,?)";

    conexao.query(inserir,[nome,email,endereco,matricula,curso,serie],function(erro){
        if(erro){
            console.log("Erro ao cadastrar");
            console.log(erro);
        }else{
            console.log("Aluno cadastrado com sucesso!");
        }
        
        menu();
    });
}


function excluirAluno(){
    const id = readline.questionInt("Informe o id do aluno que deseja excluir: ");

    const deletar= ("DELETE FROM alunos WHERE id = ? ");

    conexao.query(deletar,[id],function(erro,resultado){
        if(erro){
            console.log("Erro ao excluir aluno!");
            console.log(erro);
        }else if(resultado.affectedRows === 0){
            console.log("Aluno não encontrado!");
        }else{
            console.log("Aluno excluido com sucesso!");
        }
        menu();
    }); 
}

function listarAluno(){
    const sql = "SELECT*FROM alunos";

    conexao.query(sql,function(erro,aluno){
        if(erro){
            console.log("Erro ao buscar aluno!");
            }else{
                console.log("\n --- ALUNOS ---");
                aluno.forEach(function(aluno){
                     console.log(
                    "Id: "+aluno.id +" - "+
                    "Nome: "+aluno.nome +" - "+
                    "Email: "+ aluno.email +" - "+
                    "Endereço: "+aluno.endereco +" - "+
                    "Matricula: "+aluno.matricula +" - "+
                    "Curso: "+ aluno.curso +" - "+
                    "Serie: "+ aluno.serie
                )});
            }
            menu();
    });
}

function atualizarAluno(){
// Novos dados
const nome = readline.question("informe o nome atualizado: ");
const email = readline.question("informe o email atualizado: ");
const endereco =readline.question("informe o endereço atualizado do aluno: ");
const matricula = readline.question("informe a matricula atualizada: ");
const curso = readline.question("informe o curso atualizado: ");
const serie = readline.question("informe a serie atualizada");
 
// ID do aluno que será atualizado
const id = readline.questionInt("informe o id do aluno que será atualizado");
 
const update = `
    UPDATE alunos
    SET nome = ?, email = ?,
    endereco = ?, matricula = ?,
    curso = ?, serie = ?
    WHERE id = ?
`;
conexao.query(update, [nome, email, endereco, matricula, curso, serie,  id], function (erro, resultado) {
 
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