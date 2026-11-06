function calcularDesconto(preco,valorDesconto){ 
    porcentagem=valorDesconto/100
    var precoFinal = preco-(preco*porcentagem)

    console.log("O preço final do produto é de: ",precoFinal)
}

var preco = 100
var valorDesconto = 10

calcularDesconto(preco,valorDesconto)