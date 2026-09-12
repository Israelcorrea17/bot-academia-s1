const express = require('express');
const app = express();

app.use(express.json());

// banco de dados temporario na memoria
let produtos = [
    {id: 10, nome: "Teclado", preço: 150},
    {id: 20, nome: "Mouse", preço: 80},
    {id: 30, nome: "Monitor", preço: 900},
];

//rota delete
app.delete('/produtos/:id', (req, res) => {
   const idRecebido = req.params.id;
   const posiçao = produtos.findIndex(p => p.id === Number(idRecebido));
   if(posiçao === -1) {
    return res.status(404).json({ erro: "produto não encontrado"});
    produtos.splice(posiçao, 1);
    return res.json({ mensagem: `Produto com ID ${idRecebido} foi deletado!`});
   }
})

// rota put
app.put('/produtos/:id', (req, res) => {
    const idRecebido = req.params.id;
    const { nome, preco } = req.body; // <-- OBRIGATÓRIO: pega os dados do Thunder Client

    const posicao = produtos.findIndex(p => p.id === Number(idRecebido));

    if (posicao === -1) {
        return res.status(404).json({ erro: "produto não encontrado" });
    }

    produtos[posicao].nome = nome;
    produtos[posicao].preco = preco;

    // OBRIGATÓRIO: devolve a resposta para destravar o Thunder Client
    return res.json({
        mensagem: "Produto atualizado com sucesso!",
        produto: produtos[posicao]
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});