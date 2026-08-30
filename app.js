let jogosCache = [];

async function carregar() {
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  const divProx = document.getElementById("proximos-jogos");

  try {
    const resp = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard");
    const dados = await resp.json();
    const eventos = dados.events || [];

    jogosCache = eventos.filter(j => j.status.type.state === 'in').map(j => {
      const comp = j.competitions[0];
      const casa = comp.competitors.find(c => c.homeAway === 'home');
      const fora = comp.competitors.find(c => c.homeAway === 'away');
      // Pega o minuto real
      const minutoBase = parseInt(j.status.displayClock?.split(':')[0]) || parseInt(j.status.type.detail) || 0;
      return {
        id: j.id,
        casa: casa.team.displayName,
        fora: fora.team.displayName,
        placar: `${casa.score} - ${fora.score}`,
        minuto: minutoBase,
        inicio: Date.now()
      };
    });

    renderizar();

  } catch(e){
    divAoVivo.innerHTML = `<p>Erro: ${e.message}</p>`;
  }
}

function renderizar(){
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  const divProx = document.getElementById("proximos-jogos");

  if(jogosCache.length === 0){
    divAoVivo.innerHTML = "<p>⚽ Nenhum jogo ao vivo agora.</p>";
    divProx.innerHTML = `<p>✅ Brasileirão atualizado!<br><span style="color:#888;font-size:12px">Atualizado: ${new Date().toLocaleTimeString('pt-BR')}</span></p>`;
    return;
  }

  let html = "";
  jogosCache.forEach(j => {
    // Calcula minuto atual (adiciona tempo desde que carregou)
    const minutosPassados = Math.floor((Date.now() - j.inicio) / 60000);
    const minutoAtual = j.minuto + minutosPassados;

    html += `
    <div style="background:#111; color:#fff; padding:12px; border-radius:12px; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between;">
        <div><div style="font-weight:bold">${j.casa}</div><div style="font-weight:bold">${j.fora}</div></div>
        <div style="text-align:right"><div style="font-weight:bold; font-size:18px;">${j.placar}</div><div style="color:#00ff88; font-size:12px;">${minutoAtual}' AO VIVO 🔴</div></div>
      </div>
      <a href="assistir.html?id=3nJN6ljCXHQ" style="background:#ff0000; color:white; padding:12px; border-radius:8px; text-decoration:none; display:block; text-align:center; font-weight:bold; margin-top:10px;">▶️ ASSISTIR DENTRO DO APP</a>
    </div>`;
  });

  divAoVivo.innerHTML = html;
  divProx.innerHTML = `<p>✅ Ao vivo - Atualização a cada 30s<br><span style="color:#888;font-size:12px">Atualizado: ${new Date().toLocaleTimeString('pt-BR')}</span></p>`;
}

carregar();
setInterval(carregar, 30000); // busca placar novo a cada 30s
setInterval(renderizar, 1000); // atualiza o relógio a cada 1s
  
