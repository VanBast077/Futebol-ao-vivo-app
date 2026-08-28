const API_KEY = "ft_futebol__8c281769d426a15f5be8068e4f75367b948c589d";
const BASE_URL = "https://api.kickoffapi.com/api/v1/fixtures";

async function buscarJogos() {
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  const hoje = new Date().toISOString().split('T')[0];

  try {
    // Tenta ao vivo
    const resp = await fetch(`${BASE_URL}?live=true`, {
      headers: { "X-API-Key": API_KEY }
    });
    const dados = await resp.json();

    if (dados && dados.length > 0) {
      divAoVivo.innerHTML = "";
      dados.forEach(j => {
        divAoVivo.innerHTML += `
          <div class="jogo">
            <div><div class="time">${j.teams?.home?.name}</div><div class="time">${j.teams?.away?.name}</div></div>
            <div><div class="placar">${j.goals?.home?? 0} - ${j.goals?.away?? 0}</div><div class="status">${j.fixture?.status?.elapsed || 0}' AO VIVO</div></div>
          </div>`;
      });
    } else {
      // Se não tem ao vivo, busca jogos de hoje
      const respHoje = await fetch(`${BASE_URL}?date=${hoje}`, {
        headers: { "X-API-Key": API_KEY }
      });
      const jogosHoje = await respHoje.json();
      divAoVivo.innerHTML = "";
      if(jogosHoje.length === 0){
        divAoVivo.innerHTML = "<p>Nenhum jogo ao vivo agora. Volte mais tarde!</p>";
      } else {
        jogosHoje.slice(0,8).forEach(j => {
          const hora = new Date(j.fixture?.date).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});
          divAoVivo.innerHTML += `
          <div class="jogo">
            <div><div class="time">${j.teams?.home?.name}</div><div class="time">${j.teams?.away?.name}</div></div>
            <div><div class="placar">${hora}</div><div class="status">${j.fixture?.status?.short || ''}</div></div>
          </div>`;
        });
      }
    }
    document.getElementById("proximos-jogos").innerHTML = "<p>Atualizado em tempo real via KickoffAPI</p>";

  } catch (e) {
    divAoVivo.innerHTML = `<p>Erro ao carregar: ${e.message}</p>`;
  }
}
buscarJogos();
