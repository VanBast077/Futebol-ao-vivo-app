const API_KEY = "ft_futebol__8c281769d426a15f5be8068e4f75367b948c589d";
const API_URL = "https://api.kickoffapi.com/api/v1/fixtures?live=true";

async function buscarJogosAoVivo() {
  try {
    const resposta = await fetch(API_URL, {
      headers: {
        "X-API-Key": API_KEY
      }
    });
    
    const dados = await resposta.json();
    console.log(dados); // para ver no console

    const container = document.getElementById("jogos");
    if (!container) return;

    if (!dados || dados.length === 0) {
      container.innerHTML = "<p>Nenhum jogo ao vivo no momento.</p>";
      return;
    }

    container.innerHTML = "";
    dados.forEach(jogo => {
      const card = `
        <div style="background:#1a1a1a; color:white; padding:15px; margin:10px; border-radius:10px;">
          <h3>${jogo.teams?.home?.name || 'Casa'} ${jogo.goals?.home ?? 0} x ${jogo.goals?.away ?? 0} ${jogo.teams?.away?.name || 'Fora'}</h3>
          <p>⏱️ ${jogo.fixture?.status?.elapsed || 0}' - ${jogo.fixture?.status?.long || 'Ao Vivo'}</p>
          <p>🏆 ${jogo.league?.name || ''}</p>
        </div>
      `;
      container.innerHTML += card;
    });

  } catch (erro) {
    console.error("Erro ao buscar jogos:", erro);
  }
}

buscarJogosAoVivo();
