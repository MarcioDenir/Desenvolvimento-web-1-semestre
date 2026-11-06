const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_alunos'
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));

app.listen(8083, function(){
    console.log
    ("Servidor rodando na url http://localhost:8083");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/home.html")
});

app.get("/cadAlunos", function (req,res){
    res.sendFile(__dirname+"/cadAlunos.html")
});

app.get("/pesquisaCod", function (req,res){
    res.sendFile(__dirname+"/pesquisaCod.html")
});

app.post("/adicionar", function(req, res){
    const nome = req.body.nome;
    const turma = req.body.turma;
    const idade = req.body.idade;
    const email = req.body.email;

    const values = [nome, turma, idade , email];
    const insert = 
        "INSERT INTO alunos (nome, turma, idade , email) VALUES(?, ?, ?, ?)";

    connection.query(insert, values, function(err,result){
        if (err){
            console.error("Dados não inseridos", err);
            res.send("Erro");
        } else {
            console.log("Dados inseridos com sucesso!");
            res.redirect("/listar");
        }
    });
});

app.get("/listar", function(req, res){
    const selectAll = "SELECT * FROM alunos";

    connection.query(selectAll, function(err, rows){
            if(!err){
                res.send(`<html>
                    <head>
                        <title> Lista de Alunos </title>
                    </head>
                    <body>
                        <h1> Lista de Alunos</h1>
                        <table>
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Turma</th>
                            <th>Idade</th>
                            <th>Email</th>
                        </tr>
                        ${rows.map(row=>`
                        <tr>
                            <td>${row.id}</td>
                            <td>${row.nome}</td>
                            <td>${row.turma}</td>
                            <td>${row.idade} </td>
                            <td>${row.email} </td>
                            <td><a href="/deletar/${row.id}"><button>Deletar</button></a></td>
                            <td><a href="/atualizar-form/${row.id}"><button>Alterar</button></a></td>
    

                            </tr>`).join('')}
                    </table>
                    <br><br>
                         <a href="/"><button>Cadastrar novo Aluno</button></a>
                    </body>

                </html>`);
            }else{
                console.error("Erro ao listar os Alunos", err);
                res.status(500).send("Erro ao listar os dados")
            }
        });
});

app.get("/deletar/:id", function(req,res){
    const idDoAluno = req.params.id;
    const deleteAluno = "DELETE FROM alunos WHERE id=?"

    connection.query(deleteAluno,[idDoAluno],(err,rows) =>{
        if(!err){
          console.log("Aluno excluído com sucesso!");
          res.redirect("/listar");
        }else{
            console.error("Erro ao excluir produto",err);
            res.status(500).send("Erro ao excluir produto!");
        }
   });
});

app.post("/atualizar/:id", (req,res) => {

    const update = "UPDATE alunos SET nome = ?, turma = ?, idade=?, email=? WHERE id =?";
    const nome = req.body.nome;
    const turma = req.body.turma;
    const idade = req.body.idade;
    const email = req.body.email;
    const id = req.params.id;
    
    connection.query(update, [nome, turma,idade,email, id], 
        function(err, result){
            if(!err){
                console.log("Dados Atualizados com Sucesso!");
                res.send(`<html>
                    <p>"Dados Atualizados"</p>
                    <a href="/listar"><button>Listar Alunos</button></a>
                    <a href="/"><button>Inicio</button></a>`
            
                );
            } else {
                console.log("Erro ao atualizar ", err);
                res.status(500).send("Erro ao atualizar!");
            
            }
        });
});

app.get("/atualizar-form/:id", function(req,res){
    const id = req.params.id;
    const selectAluno= ("SELECT * FROM alunos WHERE id=?")

    connection.query(selectAluno, [id], function(err, result){
        if(!err && result.length >0){
            const Aluno = result[0];

            res.send(`
                <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atualizar Cadastro de Alunos</title>
</head>
<body>
    <h1>Atualizar Cadastro de Alunos</h1>

    <form action="/atualizar/${id}" method="POST">
        <label for="nome"> Nome do Aluno</label> <br>
        <input type="text" id="nome" name="nome" required value=${Aluno.nome} > <br>
        <br>
         <label for="turma"> Turma </label> <br>
        <input type="text" id="turma" name="turma" required value=${Aluno.turma}> <br>
        <br>
         <label for="idade"> Idade</label> <br>
        <input type="number" id="idade" name="idade" required value=${Aluno.idade} > <br>
        <label for="email"> Email</label> <br>
        <br>
        <input type="text" id="email" name="email"  required value=${Aluno.email}> <br>
        <br>
        <input type="submit">
        <br>
        <a href="/listar"><button>Listar Alunos</button></a>

    </form>
</body>
</html>`)
        } else {
            console.log("Erro ao obter dados do Aluno", err);
            res.status(500).send("Erro ao obter dados do Aluno")
        }
    });
});
//nessa parte preciso que o programa abra uma html que pesquise o aluno atravez do id
app.get("/pesquisar", function(req, res) {
    const id = req.query.id;

    if (!id) {
        return res.send(`
            <h1>Pesquisar aluno</h1>
            <form action="/pesquisar" method="GET">
                <label for="id">ID do aluno:</label>
                <input type="number" id="id" name="id" min="1" required>
                <button type="submit">Pesquisar</button>
            </form>
            <br>
            <a href="/listar"><button>Listar alunos</button></a>
        `);
    }

    const selectAluno = "SELECT * FROM alunos WHERE id = ?";

    connection.query(selectAluno, [id], function(err, rows) {
        if (err) {
            console.error("Erro ao pesquisar aluno:", err);
            return res.status(500).send("Erro ao pesquisar aluno.");
        }

        if (rows.length === 0) {
            return res.status(404).send(`
                <h1>Aluno não encontrado</h1>
                <a href="/pesquisar"><button>Tentar novamente</button></a>
            `);
        }

        const aluno = rows[0];

        res.send(`
            <h1>Aluno encontrado</h1>
            <p><strong>ID:</strong> ${aluno.id}</p>
            <p><strong>Nome:</strong> ${aluno.nome}</p>
            <p><strong>Turma:</strong> ${aluno.turma}</p>
            <p><strong>Idade:</strong> ${aluno.idade}</p>
            <p><strong>Email:</strong> ${aluno.email}</p>
            <a href="/pesquisar"><button>Pesquisar outro aluno</button></a><br>
            <a href="/listar"><button>Listar alunos</button></a>
        `);
    });
});