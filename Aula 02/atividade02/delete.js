const mysql = require ("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"biblioteca"
});

// id a ser deletada

const id = 2

//comando para deletar

const deletar ="DELETE FROM livros WHERE id = ?";

conexao.query(deletar,[id],function(erro,resultado)
{if(erro){
    console.log("erro ao excluir o livro!");
    console.log(erro);

}else if(resultado.affectedRows===0){
    console.log("livro não encontrado!")

}else{
    console.log("livro excluido com sucesso!")
}
    conexao.end();
});