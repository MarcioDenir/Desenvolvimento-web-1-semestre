const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"loja" 
});

//insert

/*· Produto: Notebook;

· Quantidade: 2;

· Valor unitário: R$ 3.500,00.*/

const produto = "Notebook";
const quantidade = 2;
const valor_unitario = 3500.00;

const insert="INSERT INTO vendas(produto,quantidade,valor_unitario)VALUES(?,?,?)";

conexao.query(insert,[produto,quantidade,valor_unitario],function(erro){
    if(erro){
        console.log("Erro ao cadastrar venda!");
        console.log(erro);
    }else{
        console.log("Venda cadastrada com sucesso!");
    }
    conexao.end();
});