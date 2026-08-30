let jogos = [];

async function buscar() {
  try {
    const r = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard?limit=20");
    const d = await r.json();

    // Pega só ao vivo
    const aoVivo = d.events.filter(e => e.status.type.state === 'in');

    // Atualiza lista mantendo o relogio
    aoVivo.forEach(ev => {
      const comp = ev.competitions[0];
      const casa = comp.competitors[0];
      const fora = comp.competitors[1];

      // A ESPN manda o tempo assim: "2'" ou "0'" - vamos pegar o numero
      let min = 0;
      const txt = ev.status.type.detail || ev.status.displayClock || "0'";
      const m = txt.match(/(\d+)/);
      if(m) min = parseInt(m[0]);

      let existente = jogos.find(j => j.id === ev.id);
      if(existente){
        existente.placar = `${casa.score} - ${fora.score}`;
        existente.casa = casa.team.displayName;
        existente.fora = fora.team.displayName;
        // Se o minuto da API aumentou, atualiza
        if(min > existente.minBase) {
          existente.minBase = min;
          existente.inicio = Date.now();
        }
      } else {
        jogos.push({
          id: ev.id,
          casa: casa.team.displayName,
          fora: fora.team.displayName,
          placar: `${casa.score} - ${fora.score}`,
          minBase: min,
          inicio: Date.now()
        });
      }
    });

    // Remove jogos que acabaram
    jogos = jogos.filter(j => aoVivo.some(a => a.id === j.id));

    desenhar();
  } catch(e){
    console.log(e);
  }
}

function desenhar(){
  const div = document.getElementById("jogos-ao-vivo");
  const div2 = document.getElementById("proximos-jogos");

  if(jogos.length === 0){
    div.innerHTML = "<p>⚽ Nenhum ao vivo agora</p>";
    return;
  }

  let html = "";
  jogos.forEach(j => {
    const passou = Math.floor((Date.now() - j.inicio)/60000);
    const atual = j.minBase + passou;

    html += `
    <div style="background:#111;color:#fff;padding:12px;border-radius:12px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between">
        <div><b>${j.casa}</b><br><b>${j.fora}</b></div>
        <div style="text-align:right"><div style="font-size:18px;font-weight:bold">${j.placar}</div><div style="color:#00ff88;font-size:13px">${atual}' AO VIVO 🔴</div></div>
      </div>
      <a href="assistir.html?id=3nJN6ljCXHQ" style="background:#ff0000;color:#fff;padding:12px;border-radius:8px;display:block;text-align:center;font-weight:bold;margin-top:10px;text-decoration:none">▶️ ASSISTIR DENTRO DO APP</a>
    </div>`;
  });

  div.innerHTML = html;
  div2.innerHTML = `✅ Atualizado: ${new Date().toLocaleTimeString('pt-BR')} - relogio correndo`;
}

buscar();
setInterval(buscar, 15000); // busca placar novo a cada 15s
setInterval(desenhar, 1000); // faz o contador andar a cada 1s
