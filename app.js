const API_KEY = "ft_futebol__83c76791ddc35004cc288f8b07939214fce31059";
const BASE_URL = "https://api.kickoffapi.com/api/v1/fixtures";

let cache = null;

function pegarLista(r){ 
  if(Array.isArray(r)) return r; 
  if(r?.data) return r.data; 
  if(r?.fixtures) return r.fixtures; 
  if(r?.response) return r.response; 
  return []; 
}

function nomeTime(t){
  if(!t) return "Time";
  if(typeof t === 'string') return t;
  if(typeof t === 'object') return t.name || t.shortName || t.displayName || t.team?.name || "Time";
  return String(t);
}

function renderizar(lista){
  const div = document.getElementById("jogos-ao-vivo");
  const divProx = document.getElementById("proximos-jogos");

  const jogosReais = lista.filter(j => {
    const gols = (j.goals?.home || 0) + (j.goals?.away || 0);
    const minuto = j.fixture?.status?.elapsed || j.minute || 0;
    return gols > 0 || minuto > 0;
  });

  if(jogosReais.length === 0){
    div.innerHTML = "<p>⚽ Nenhum jogo ao vivo agora.<br>Volte às 16h para o Brasileirão!</p>";
    divProx.innerHTML = `<p>Atualizado • ${new Date().toLocaleTimeString('pt-BR')}</p>`;
    return;
  }

  div.innerHTML = "";
  jogosReais.slice(0,15).forEach(j=>{
    const casa = nomeTime(j.teams?.home || j.homeTeam || j.home);
    const fora = nomeTime(j.teams?.away || j.awayTeam || j.away);
    const golCasa = j.goals?.home ?? j.score?.home ?? 0;
    const golFora = j.goals?.away ?? j.score?.away ?? 0;
    const minuto = j.fixture?.status?.elapsed || j.minute || "";
    div.innerHTML += `
      <div class="jogo">
        <div><div class="time">${casa}</div><div class="time">${fora}</div></div>
        <div style="text-align:right"><div class="placar">${golCasa} - ${golFora}</div><div class="status">${minuto ? minuto + "'" : ""} AO VIVO</div></div>
      </div>`;
  });
  divProx.innerHTML = `<p>Atualizado • ${new Date().toLocaleTimeString('pt-BR')}</p>`;
}

async function buscarJogos(){
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  if(cache){
    renderizar(cache);
  } else {
    divAoVivo.innerHTML = "<p>⚽ Carregando...</p>";
  }

  try{
    const resp = await fetch(`${BASE_URL}?live=true`,{ headers:{ "X-API-Key": API_KEY }});
    const json = await resp.json();
    const lista = pegarLista(json);
    cache = lista;
    renderizar(lista);
  }catch(e){
    console.error(e);
    divAoVivo.innerHTML = `<p>Erro: ${e.message}<br>Verifique sua API Key</p>`;
  }
}

buscarJogos();
setInterval(buscarJogos, 45000);
