const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"biblioteca"
});

//dados que seram cadastrados

const titulo = "A Arte da Guerra";
const autor = "Sun Tzu";

// inserir dados

const insert ="INSERT INTO LIVROS(titulo,autor) VALUES(?,?)";

conexao.query(insert,[titulo,autor],function(erro){
    if(erro){
        console.log("erro ao cadastrar!")
        console.log(erro)
        
    }else{
        console.log("livro cadastrado com sucesso!")
    }
    conexao.end()
});