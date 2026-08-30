async function atualizarPlacar() {
  const div = document.getElementById("jogos-ao-vivo");

  try {
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard?${Date.now()}`);
    const data = await res.json();

    let html = "";

    data.events.forEach(jogo => {
      if (jogo.status.type.state !== 'in') return;

      const casa = jogo.competitions[0].competitors[0];
      const fora = jogo.competitions[0].competitors[1];
      const periodo = jogo.status.period;
      const tempo = jogo.status.type.detail;

      let tempoTexto = tempo;
      if (periodo === 1) tempoTexto = `${tempo} - 1ºT`;
      if (periodo === 2) tempoTexto = `${tempo} - 2ºT`;

      html += `
        <div style="background:#121212; border:1px solid #333; color:#fff; padding:14px; border-radius:12px; margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-weight:bold;">${casa.team.displayName} <span style="color:#aaa">${casa.score}</span></div>
              <div style="font-weight:bold;">${fora.team.displayName} <span style="color:#aaa">${fora.score}</span></div>
            </div>
            <div style="text-align:right;">
              <div style="color:#00ff88; font-weight:bold;">${tempoTexto}</div>
              <div style="color:#ff3b3b; font-size:11px;">● AO VIVO</div>
            </div>
          </div>
          <a href="assistir.html?jogo=${jogo.id}" style="background:#E10600; color:#fff; display:block; text-align:center; padding:12px; border-radius:8px; text-decoration:none; font-weight:bold; margin-top:12px;">
            ▶️ ASSISTIR DENTRO DO APP
          </a>
        </div>`;
    });

    div.innerHTML = html || "<p style='color:#888'>Nenhum jogo ao vivo no momento</p>";
    document.getElementById("proximos-jogos").innerHTML = `<p style="color:#666; font-size:12px;">Atualizado: ${new Date().toLocaleTimeString('pt-BR')}</p>`;

  } catch (e) {}
}

atualizarPlacar();
setInterval(atualizarPlacar, 10000);
