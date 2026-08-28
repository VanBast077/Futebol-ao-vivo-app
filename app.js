const API_KEY = "ft_futebol__8c281769d426a15f5be8068e4f75367b948c589d";
const BASE_URL = "https://api.kickoffapi.com/api/v1/fixtures";

function pegarLista(r){ if(Array.isArray(r)) return r; if(r?.data) return r.data; if(r?.fixtures) return r.fixtures; if(r?.response) return r.response; return []; }
function nomeTime(t){
  if(!t) return "Time";
  if(typeof t === 'string') return t;
  if(typeof t === 'object') return t.name || t.shortName || t.displayName || t.team?.name || "Time";
  return String(t);
}

async function buscarJogos(){
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  const divProximos = document.getElementById("proximos-jogos");
  try{
    const resp = await fetch(`${BASE_URL}?live=true`,{ headers:{ "X-API-Key": API_KEY }});
    const json = await resp.json();
    console.log("API:", json);
    let lista = pegarLista(json);
    
    if(lista.length === 0){
      divAoVivo.innerHTML = "<p>Nenhum jogo ao vivo agora. Volte mais tarde!</p>";
      divProximos.innerHTML = "<p>Sem jogos ao vivo no momento.</p>";
      return;
    }
    
    divAoVivo.innerHTML = "";
    lista.slice(0,15).forEach(j=>{
      const casa = nomeTime(j.teams?.home || j.homeTeam || j.home);
      const fora = nomeTime(j.teams?.away || j.awayTeam || j.away);
      const golCasa = j.goals?.home ?? j.score?.home ?? j.goals?.homeTeam ?? 0;
      const golFora = j.goals?.away ?? j.score?.away ?? j.goals?.awayTeam ?? 0;
      const minuto = j.fixture?.status?.elapsed || j.minute || j.status || "AO VIVO";
      
      divAoVivo.innerHTML += `
        <div class="jogo">
          <div>
            <div class="time">${casa}</div>
            <div class="time">${fora}</div>
          </div>
          <div style="text-align:right">
            <div class="placar">${golCasa} - ${golFora}</div>
            <div class="status">${minuto}' AO VIVO</div>
          </div>
        </div>`;
    });
    divProximos.innerHTML = "<p>Atualizado agora • " + new Date().toLocaleTimeString('pt-BR') + "</p>";
  }catch(e){
    console.error(e);
    divAoVivo.innerHTML = `<p>Erro: ${e.message}</p>`;
  }
}
buscarJogos();
setInterval(buscarJogos, 30000); // atualiza a cada 30s
