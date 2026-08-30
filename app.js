async function buscarJogos(){
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  const divProx = document.getElementById("proximos-jogos");

  try{
    // API da ESPN que funciona sem key no GitHub
    const resp = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard");
    const dados = await resp.json();
    const jogos = dados.events || [];

    // Filtra só jogos ao vivo
    const aoVivo = jogos.filter(j => j.status.type.state === "in");

    if(aoVivo.length === 0){
      divAoVivo.innerHTML = `
        <p>⚽ Nenhum jogo ao vivo agora no Brasileirão.</p>
        <div style="background:#111; padding:12px; border-radius:10px; margin-top:10px; border:1px solid #333;">
          <p style="margin:0 0 8px 0; color:white; font-weight:bold;">🔴 LIVE - Flamengo x Palmeiras</p>
          <p style="margin:0 0 8px 0; color:#aaa; font-size:13px;">Transmissão CazéTV</p>
          <a href="assistir.html?id=3nJN6ljCXHQ"
             style="background:#ff0000; color:white; padding:10px; border-radius:8px; text-decoration:none; display:block; text-align:center; font-weight:bold;">
             ▶️ ASSISTIR DENTRO DO APP
          </a>
        </div>
        <p style="font-size:12px; color:#888; margin-top:8px;">Atualizado: ${new Date().toLocaleTimeString('pt-BR')}</p>
      `;
      divProx.innerHTML = `<p>Próximos jogos carregados • ${jogos.length} jogos encontrados hoje</p>`;
      return;
    }

    divAoVivo.innerHTML = "";
    aoVivo.forEach(j=>{
      const casa = j.competitions[0].competitors[0].team.displayName;
      const fora = j.competitions[0].competitors[1].team.displayName;
      const golCasa = j.competitions[0].competitors[0].score;
      const golFora = j.competitions[0].competitors[1].score;
      const minuto = j.status.displayClock || j.status.type.detail;

      divAoVivo.innerHTML += `
        <div class="jogo" style="flex-direction:column; align-items:stretch; background:#111; padding:12px; border-radius:10px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; width:100%;">
            <div><div class="time">${casa}</div><div class="time">${fora}</div></div>
            <div style="text-align:right"><div class="placar">${golCasa} - ${golFora}</div><div class="status">${minuto} AO VIVO 🔴</div></div>
          </div>
          <a href="assistir.html?id=3nJN6ljCXHQ"
             style="background:#ff0000; color:white; padding:10px; border-radius:8px; text-decoration:none; display:block; text-align:center; font-weight:bold; margin-top:10px;">
             ▶️ ASSISTIR DENTRO DO APP
          </a>
        </div>`;
    });

  }catch(e){
    divAoVivo.innerHTML = `
      <p>⚽ Nenhum jogo ao vivo agora.</p>
      <div style="background:#111; padding:12px; border-radius:10px; margin-top:10px;">
        <p style="color:white; font-weight:bold;">🔴 AO VIVO - Teste</p>
        <a href="assistir.html?id=3nJN6ljCXHQ" style="background:#ff0000; color:white; padding:10px; border-radius:8px; text-decoration:none; display:block; text-align:center; font-weight:bold; margin-top:10px;">▶️ ASSISTIR DENTRO DO APP</a>
      </div>
      <p style="color:red; font-size:12px;">Erro: ${e.message}</p>`;
  }
}

buscarJogos();
setInterval(buscarJogos, 30000);
