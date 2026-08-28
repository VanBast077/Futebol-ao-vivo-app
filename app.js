const API_KEY = "ft_futebol__8c281769d426a15f5be8068e4f75367b948c589d";
const BASE_URL = "https://api.kickoffapi.com/api/v1/fixtures";

async function buscarJogos() {
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  const divProximos = document.getElementById("proximos-jogos");
  try {
    console.log("Buscando com chave:", API_KEY.substring(0,10) + "...");
    
    const resp = await fetch(`${BASE_URL}?date=2025-05-13`, {
      headers: { "X-API-Key": API_KEY }
    });
    
    if (!resp.ok) throw new Error("Erro API: " + resp.status);
    
    const dados = await resp.json();
    console.log(dados);

    // Mostra o que veio, mesmo que não seja ao vivo
    if (dados && dados.length > 0) {
      divAoVivo.innerHTML = "";
      dados.slice(0, 5).forEach(j => {
        divAoVivo.innerHTML += `
          <div class="jogo">
            <div><div class="time">${j.teams?.home?.name}</div><div class="time">${j.teams?.away?.name}</div></div>
            <div><div class="placar">${j.goals?.home ?? 0} - ${j.goals?.away ?? 0}</div><div class="status">AO VIVO</div></div>
          </div>`;
      });
      divProximos.innerHTML = "<p>Jogos de teste carregados com sucesso!</p>";
    } else {
      divAoVivo.innerHTML = "<p>Nenhum jogo encontrado para teste. API conectada!</p>";
      divProximos.innerHTML = "<p>API conectada, mas sem jogos hoje.</p>";
    }

  } catch (e) {
    console.error(e);
    divAoVivo.innerHTML = `<p>Erro: ${e.message}. Verifique a API Key no app.js</p>`;
  }
}
buscarJogos();
