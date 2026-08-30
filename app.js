async function carregar() {
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  const divProx = document.getElementById("proximos-jogos");

  const criarCard = (casa, fora, placar, status, idYoutube = "3nJN6ljCXHQ") => `
    <div style="background:#111; color:#fff; padding:12px; border-radius:12px; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between;">
        <div><div style="font-weight:bold">${casa}</div><div style="font-weight:bold">${fora}</div></div>
        <div style="text-align:right"><div style="font-weight:bold; font-size:18px;">${placar}</div><div style="color:${status.includes('AO VIVO')?'#00ff88':'#aaa'}; font-size:12px;">${status}</div></div>
      </div>
      ${status.includes('AO VIVO')? `<a href="assistir.html?id=${idYoutube}" style="background:#ff0000; color:white; padding:12px; border-radius:8px; text-decoration:none; display:block; text-align:center; font-weight:bold; margin-top:10px;">▶️ ASSISTIR DENTRO DO APP</a>` : ''}
    </div>
  `;

  try {
    // API REAL DO BRASILEIRÃO
    const hoje = new Date().toISOString().split('T')[0].replace(/-/g,'');
    const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard`;
    const resp = await fetch(url);
    const dados = await resp.json();

    const eventos = dados.events || [];

    if(eventos.length === 0){
      divAoVivo.innerHTML = "<p>⚽ Nenhum jogo hoje. Próxima rodada amanhã!</p>";
      divProx.innerHTML = `<p>Atualizado: ${new Date().toLocaleTimeString('pt-BR')}</p>`;
      return;
    }

    let htmlAoVivo = "";
    let htmlProximos = "";

    eventos.forEach(j => {
      const comp = j.competitions[0];
      const casa = comp.competitors.find(c => c.homeAway === 'home');
      const fora = comp.competitors.find(c => c.homeAway === 'away');
      const status = j.status.type.state;
      const placar = `${casa.score} - ${fora.score}`;
      const detalhe = j.status.type.detail; // ex: "FT", "72'", "19:30"

      if(status === 'in'){
        htmlAoVivo += criarCard(casa.team.displayName, fora.team.displayName, placar, `${detalhe} AO VIVO 🔴`);
      } else if(status === 'pre'){
        htmlProximos += criarCard(casa.team.displayName, fora.team.displayName, detalhe, "EM BREVE");
      } else {
        htmlProximos += criarCard(casa.team.displayName, fora.team.displayName, placar, "FINALIZADO");
      }
    });

    divAoVivo.innerHTML = htmlAoVivo || "<p>⚽ Nenhum jogo ao vivo agora.<br>Volte mais tarde!</p>";
    divProx.innerHTML = htmlProximos || `<p>Nenhum próximo jogo hoje</p><p style="color:#888; font-size:12px;">Atualizado: ${new Date().toLocaleTimeString('pt-BR')}</p>`;

  } catch(e){
    divAoVivo.innerHTML = `<p>Erro ao carregar jogos reais: ${e.message}</p>`;
  }
}

carregar();
setInterval(carregar, 60000);
