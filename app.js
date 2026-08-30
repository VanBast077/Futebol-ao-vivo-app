async function atualizarPlacar() {
  const div = document.getElementById("jogos-ao-vivo");
  try {
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard?${Date.now()}`);
    const data = await res.json();
    let html = "";
    data.events.forEach(jogo => {
      if (jogo.status.type.state !== 'in') return;
      const comp = jogo.competitions[0];
      const casa = comp.competitors[0];
      const fora = comp.competitors[1];
      const detail = jogo.status.type.detail || "";
      const sDetail = jogo.status.type.shortDetail || "";
      
      let tempoTexto = detail;
      if (sDetail.toUpperCase().includes("HT") || detail.toUpperCase().includes("HALF")) {
        tempoTexto = "INTERVALO";
      } else if (jogo.status.period === 1) {
        tempoTexto = `${detail} - 1ºT`;
      } else if (jogo.status.period === 2) {
        tempoTexto = detail.includes("90") ? `90+` : `${detail} - 2ºT`;
      }

      html += `<div style="background:#121212;border:1px solid #333;color:#fff;padding:14px;border-radius:12px;margin-bottom:12px;"><div style="display:flex;justify-content:space-between;"><div><div><b>${casa.team.displayName} ${casa.score}</b></div><div><b>${fora.team.displayName} ${fora.score}</b></div></div><div style="text-align:right;"><div style="color:#00ff88;font-weight:bold;">${tempoTexto}</div><div style="color:#ff3b3b;font-size:11px;">● AO VIVO</div></div></div><a href="assistir.html?jogo=${jogo.id}" style="background:#E10600;color:#fff;display:block;text-align:center;padding:12px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:12px;">▶️ ASSISTIR DENTRO DO APP</a></div>`;
    });
    div.innerHTML = html || "<p>Nenhum jogo ao vivo</p>";
  } catch(e){}
}
atualizarPlacar();
setInterval(atualizarPlacar, 10000);
