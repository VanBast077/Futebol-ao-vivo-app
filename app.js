async function buscar() {
  const div = document.getElementById("jogos-ao-vivo");
  try {
    // adiciona ?v= pra nao pegar cache velho do GitHub
    const r = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard?limit=20&v=${Date.now()}`);
    const d = await r.json();
    const aoVivo = d.events.filter(e => e.status.type.state === 'in');

    if(aoVivo.length === 0){
      div.innerHTML = "<p>⚽ Nenhum jogo ao vivo agora</p>";
      return;
    }

    let html = "";
    const agora = new Date();

    aoVivo.forEach(ev => {
      const comp = ev.competitions[0];
      const casa = comp.competitors[0];
      const fora = comp.competitors[1];
      
      // CALCULA TEMPO REAL PELO HORARIO DE INICIO
      const inicioJogo = new Date(ev.date);
      let minutos = Math.floor((agora - inicioJogo) / 60000);
      if(minutos < 0) minutos = 0;
      if(minutos > 90) minutos = 90; // trava em 90

      html += `
      <div style="background:#111;color:#fff;padding:12px;border-radius:12px;margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between">
          <div><b>${casa.team.displayName}</b><br><b>${fora.team.displayName}</b></div>
          <div style="text-align:right"><div style="font-size:18px;font-weight:bold">${casa.score} - ${fora.score}</div><div style="color:#00ff88;font-size:13px">${minutos}' AO VIVO 🔴</div></div>
        </div>
        <a href="assistir.html?id=3nJN6ljCXHQ" style="background:#ff0000;color:#fff;padding:12px;border-radius:8px;display:block;text-align:center;font-weight:bold;margin-top:10px;text-decoration:none">▶️ ASSISTIR DENTRO DO APP</a>
      </div>`;
    });

    div.innerHTML = html;
    document.getElementById("proximos-jogos").innerHTML = `✅ Tempo real pelo relógio - ${agora.toLocaleTimeString('pt-BR')}`;

  } catch(e){
    document.getElementById("jogos-ao-vivo").innerHTML = "Erro: "+e.message;
  }
}

buscar();
setInterval(buscar, 10000); // atualiza a cada 10 segundos
          
