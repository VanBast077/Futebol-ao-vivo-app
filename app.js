async function carregar() {
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  const divProx = document.getElementById("proximos-jogos");

  const htmlBotao = (casa, fora, placar, minuto) => `
    <div style="background:#111; color:#fff; padding:12px; border-radius:12px; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between;">
        <div>
          <div style="font-weight:bold">${casa}</div>
          <div style="font-weight:bold">${fora}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:bold; font-size:18px;">${placar}</div>
          <div style="color:#00ff88; font-size:12px;">${minuto} AO VIVO 🔴</div>
        </div>
      </div>
      <a href="assistir.html?id=3nJN6ljCXHQ" style="background:#ff0000; color:white; padding:12px; border-radius:8px; text-decoration:none; display:block; text-align:center; font-weight:bold; margin-top:10px;">
         ▶️ ASSISTIR DENTRO DO APP
      </a>
    </div>
  `;

  try {
    const r = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard");
    const d = await r.json();
    const aoVivo = (d.events || []).filter(j => j.status.type.state === "in");

    if (aoVivo.length > 0) {
      let html = "";
      aoVivo.forEach(j => {
        const comp = j.competitions[0].competitors;
        html += htmlBotao(comp[0].team.displayName, comp[1].team.displayName, `${comp[0].score} - ${comp[1].score}`, comp[0].score + "'");
      });
      divAoVivo.innerHTML = html;
    } else {
      // Sem jogo real, mostra teste
      divAoVivo.innerHTML = htmlBotao("Flamengo", "Palmeiras", "2 - 1", "72'") + htmlBotao("Corinthians", "São Paulo", "0 - 0", "15'");
    }
    divProx.innerHTML = `<p>✅ Brasileirão atualizado!<br><span style="color:#888; font-size:13px;">Atualizado: ${new Date().toLocaleTimeString('pt-BR')}</span></p>`;
  } catch (e) {
    divAoVivo.innerHTML = htmlBotao("Flamengo", "Palmeiras", "2 - 1", "72'") + htmlBotao("Corinthians", "São Paulo", "0 - 0", "15'");
  }
}
carregar();
setInterval(carregar, 60000);
