const mysql  =  require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"instituicao2"
});
//inserir

function cadastrarCusro(){
const nome = readline.question("informe o nome do Curso: ");
const cargaHoraria = readline.questionInt("informe a carga horaria do curso:");

const inserir = "INSERT INTO cursos(nome,cargaHoraria) VALUES (?,?)";

conexao.query(inserir,[nome,cargaHoraria],function(erro){
    if(erro){
        console.log("erro ao cadastrar curso!",erro);
    }else{
        console.log("Curso cadastrado com sucesso!");
    }
    menu();
});
}

//deletar
function excluirCurso(){
const id = readline.questionInt("informe o id que deseja excluir");

const deletar = "DELETE FROM cursos WHERE id=?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("Erro ao excluir curso!",erro);
    }else if(resultado.affectedRows ===0){
        console.log("Curso não encontrado!");
    }else{
        console.log("Curso excluido com sucesso!");
    }
    menu();
});
}

//listar

function listarCurso(){
    const sql = "SELECT * FROM cursos";

    conexao.query(sql,function(erro,curso){
        if(erro){
            console.log("Erro ao buscar Cursos!",erro);
        }else{
           console.log("===== curso =====")
        curso.forEach(function(curso){
            console.log(curso.id +" = "+
                curso.nome +" = "+
                curso.cargaHoraria+" horas"
            );
        });
        }
        menu();
    });
}

//Atualizar

function atualizarCurso(){
    const nome = readline.question("Informe o nome do curso Atualizado!:");
    const cargaHoraria = readline.questionInt("Informe a carga horaria Atualizada: ");

    const update =`UPDATE cursos SET nome = ?, cargaHoraria = ? WHERE id =?`;

    const id = readline.questionInt("informe o id do curso para realizar a atualização:");

    conexao.query(update,[nome,cargaHoraria,id],function(erro,resultado){
        if(erro){
            console.log("Erro ao atualizar curso:");
        }else if(resultado.affectedRows===0){
            console.log("Curno nao encontrado para atualizar");
        }else{
            console.log("Curso atualizado com sucesso!");
        }
        menu();
    })
}


function menu(){
    console.log("===== MENU =====");
    console.log("1 - Cadastrar Curso");
    console.log("2 - Excluir Curso");
    console.log("3 - Listar Curso");
    console.log("4 - Atualizar Curso");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao == 1 ){
        cadastrarCusro();
    }else  if(opcao == 2){
        excluirCurso();
    }else  if(opcao == 3){
        listarCurso();
    }else  if(opcao == 4){
        atualizarCurso();
    }else  if(opcao == 0){
        console.log("programa encerrado!")
        conexao.end();
    }else{
        console.log("Opção Invalida!")

        menu();
    }

}

menu();
