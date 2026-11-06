const mysql  =  require("mysql2");

const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"shows"
});
//inserir

function cadastrarEventos(){
const nome = readline.question("informe o nome do evento: ");
const data_evento = readline.question("informe a data do evento em formato americado(ano-mes-dia):");

const inserir = "INSERT INTO eventos(nome,data_evento) VALUES (?,?)";

conexao.query(inserir,[nome,data_evento],function(erro){
    if(erro){
        console.log("erro ao cadastrar evento!",erro);
    }else{
        console.log("Evento cadastrado com sucesso!");
    }
    menu();
});
}

//deletar
function excluirEventos(){
const id = readline.questionInt("informe o id que deseja excluir");

const deletar = "DELETE FROM eventos WHERE id=?";

conexao.query(deletar,[id],function(erro,resultado){
    if(erro){
        console.log("Erro ao excluir evento!",erro);
    }else if(resultado.affectedRows ===0){
        console.log("Evento não encontrada!");
    }else{
        console.log("Evento excluido com sucesso!");
    }
    menu();
});
}

//listar

function listarEventos(){
    const sql ="SELECT * FROM eventos ORDER BY data_evento";

    conexao.query(sql,function(erro,evento){
        if(erro){
            console.log("Erro ao buscar tarefas!",erro);

        }else{
            console.log("===== EVENTOS =====");
            evento.forEach(function(evento){
                console.log(evento.id + " = "+
                    evento.nome  + " = "+
                    evento.data_evento
                );
            });
        }
        menu();
    });
}

function atualizarEventos(){
    const nome = readline.question("informe o nome do evento a ser Atualizado: ");
    const data_evento = readline.question("informe a data do evento atualizado: ");

    const update = `UPDATE eventos SET nome =?, data_evento = ? WHERE id =?`;

    const id = readline.questionInt("informe o id do evento que deseja atualziar: ");

    conexao.query(update,[nome,data_evento,id],function(erro,resultado){
        if(erro){
            console.log("Erro ao atualizar show!");
        }else if(resultado.affectedRows === 0) {
            console.log("Show não encontrado!");
        }else{
            console.log("Show atualizado com sucesso!");
        }
        menu();
    })
}


function menu(){
    console.log("===== MENU =====");
    console.log("1 - Cadastrar Eventos");
    console.log("2 - Excluir Eventos");
    console.log("3 - Listar Eventos");
    console.log("4 - Atualizar Eventos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if(opcao == 1 ){
        cadastrarEventos();
    }else  if(opcao == 2){
        excluirEventos();
    }else  if(opcao == 3){
        listarEventos();
    }else  if(opcao == 4){
        atualizarEventos();
    }else  if(opcao == 0){
        console.log("programa encerrado!")
        conexao.end();
    }else{
        console.log("Opção Invalida!")

        menu();
    }

}

menu();
