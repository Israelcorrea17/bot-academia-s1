const express = require('express');
const app = express();

// Middleware para o servidor conseguir entender mensagens enviadas em formato JSON
app.use(express.json());

// === DIA 4: BANCO DE DADOS SIMULADO ===
const bancoDadosAcademia = {
    "musculacao": { nome: "Musculação Livre", valor: 110, horarios: "06h às 22h" },
    "spinning": { nome: "Spinning / Bike", valor: 140, horarios: "Ter e Qui - 19h" },
    "crossfit": { nome: "Cross Training", valor: 180, horarios: "Seg, Qua e Sex - 07h e 18h" }
};

async function consultarPlanoAcademia(nomeDoPlano) {
    try {
        const chave = nomeDoPlano.toLowerCase().trim();
        if (bancoDadosAcademia[chave]) {
            const p = bancoDadosAcademia[chave];
            return `🏋️ Plano: ${p.nome} | 💰 Valor: R$ ${p.valor}/mês | ⏰ Horários: ${p.horarios}`;
        }
        throw new Error();
    } catch {
        return "❌ Opção inválida. Nossos planos são: Musculacao, Spinning e Crossfit.";
    }
}

// === DIA 5: ROTEADOR DE MENSAGENS ===
async function processarMensagemWhatsApp(mensagemCliente) {
    const textoLimpo = mensagemCliente.toLowerCase().trim();

    if (
        textoLimpo.includes("oi") || 
        textoLimpo.includes("ola") || 
        textoLimpo.includes("olá") || 
        textoLimpo.includes("bom dia")
    ) {
        return "👋 Olá! Bem-vindo à Academia. Digite o nome do plano (Musculacao, Spinning, Crossfit) para ver valores.";
    } 
    else if (
        textoLimpo.includes("musculacao") || 
        textoLimpo.includes("musculação") || 
        textoLimpo.includes("spinning") || 
        textoLimpo.includes("crossfit")
    ) {
        let planoEncontrado = "";
        if (textoLimpo.includes("musculacao") || textoLimpo.includes("musculação")) planoEncontrado = "musculacao";
        if (textoLimpo.includes("spinning")) planoEncontrado = "spinning";
        if (textoLimpo.includes("crossfit")) planoEncontrado = "crossfit";

        return await consultarPlanoAcademia(planoEncontrado);
    } 
    else {
        return "🤖 Não entendi. Digite 'oi' para ver o menu de opções.";
    }
}

// =========================================================
// 🚀 DIA 6: SERVIDO WEB & ROTA DE WEBHOOK (EXPRESS)
// =========================================================

// Esta é a rota que o WhatsApp vai chamar quando alguém mandar uma mensagem!
app.post('/webhook', async (req, res) => {
    // 1. Pega a mensagem recebida no corpo da requisição (req.body)
    const mensagemRecebida = req.body.mensagem;

    if (!mensagemRecebida) {
        return res.status(400).json({ erro: "Campo 'mensagem' é obrigatório no JSON." });
    }

    console.log(`📩 Mensagem recebida no Servidor: "${mensagemRecebida}"`);

    // 2. Chama o roteador assíncrono para processar a resposta
    const respostaBot = await processarMensagemWhatsApp(mensagemRecebida);

    // 3. Devolve a resposta em formato JSON para quem enviou
    return res.json({ resposta: respostaBot });
});

// Inicializa o servidor rodando na porta 3000
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`🤖 Servidor do Bot rodando com sucesso na porta ${PORTA}!`);
    console.log(`📍 Endpoint pronto para receber requisições em: http://localhost:${PORTA}/webhook`);
});