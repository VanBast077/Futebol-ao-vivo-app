const API_KEY = "ft_futebol__8c281769d426a15f5be8068e4f75367b948c589d";
const BASE_URL = "https://api.kickoffapi.com/api/v1/fixtures";

function pegarLista(resposta) {
  if (Array.isArray(resposta)) return resposta;
  if (resposta.data) return resposta.data;
  if (resposta.fixtures) return resposta.fixtures;
  if (resposta.response) return resposta.response;
  return [];
}

async function buscarJogos() {
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  const divProximos = document.getElementById("proximos-jogos");
  const hoje = new Date().toISOString().split('T')[0];

  try {
    const respLive = await fetch(`${BASE_URL}?live=true`, {
      headers: { "X-API-Key": API_KEY }
    });
    const jsonLive = await respLive.json();
    let listaLive = pegarLista(jsonLive);

    if (listaLive.length > 0) {
      divAoVivo.innerHTML = "";
      listaLive.slice(0,10).forEach(j => {
        divAoVivo.innerHTML += `
          <div class="jogo">
            <div><div class="time">${j.teams?.home?.name || j.homeTeam || 'Casa'}</div><div class="time">${j.teams?.away?.name || j.awayTeam || 'Fora'}</div></div>
            <div><div class="placar">${j.goals?.home?? j.score?.home?? 0} - ${j.goals?.away?? j.score?.away?? 0}</div><div class="status">AO VIVO</div></div>
          </div>`;
      });
      divProximos.innerHTML = "<p>Jogos ao vivo atualizados agora!</p>";
      return;
    }

    // Se não tem ao vivo, busca de hoje
    const respHoje = await fetch(`${BASE_URL}?date=${hoje}`, {
      headers: { "X-API-Key": API_KEY }
    });
    const jsonHoje = await respHoje.json();
    let listaHoje = pegarLista(jsonHoje);

    divAoVivo.innerHTML = "";
    if (listaHoje.length === 0) {
      divAoVivo.innerHTML = "<p>Nenhum jogo ao vivo agora. Volte mais tarde!</p>";
    } else {
      listaHoje.slice(0,10).forEach(j => {
        const hora = j.fixture?.date? new Date(j.fixture.date).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}) : (j.time || '');
        divAoVivo.innerHTML += `
          <div class="jogo">
            <div><div class="time">${j.teams?.home?.name || j.homeTeam}</div><div class="time">${j.teams?.away?.name || j.awayTeam}</div></div>
            <div><div class="placar">${hora}</div><div class="status">Hoje</div></div>
          </div>`;
      });
    }
    divProximos.innerHTML = "<p>Jogos de hoje carregados!</p>";

  } catch (e) {
    console.error(e);
    divAoVivo.innerHTML = `<p>Erro: ${e.message}</p>`;
  }
}
buscarJogos();
