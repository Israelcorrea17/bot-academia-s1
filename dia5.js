// API DO DIA 4 (Banco de dados e consulta assíncrona)
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

// =========================================================
// 🚀 DIA 5: ROTEADOR DE MENSAGENS DO BOT
// =========================================================

async function processarMensagemWhatsApp(mensagemCliente) {
    const textoLimpo = mensagemCliente.toLowerCase().trim();

    // 1. Tratamento de saudações (tolerante a acentos e pontuações)
    if (
        textoLimpo.includes("oi") || 
        textoLimpo.includes("ola") || 
        textoLimpo.includes("olá") || 
        textoLimpo.includes("bom dia")
    ) {
        return "👋 Olá! Bem-vindo à Academia. Digite o nome do plano (Musculacao, Spinning, Crossfit) para ver valores.";
    } 
    // 2. Consulta dos planos de treino
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

        const respostaPlano = await consultarPlanoAcademia(planoEncontrado);
        return respostaPlano;
    } 
    // 3. Resposta padrão para comandos não reconhecidos
    else {
        return "🤖 Não entendi. Digite 'oi' para ver o menu de opções.";
    }
}

// === BATERIA DE TESTES ===
async function rodarBot() {
    console.log(await processarMensagemWhatsApp("Olá!")); 
    console.log(await processarMensagemWhatsApp("Quero saber sobre Musculação")); 
    console.log(await processarMensagemWhatsApp("Quero saber sobre natação")); 
}

rodarBot();''