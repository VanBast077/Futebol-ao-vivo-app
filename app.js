function carregar() {
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  const divProx = document.getElementById("proximos-jogos");

  // ISSO VAI APARECER COM CERTEZA, SEM DEPENDER DE API
  divAoVivo.innerHTML = `
    <div class="jogo">
      <div style="display:flex; justify-content:space-between; width:100%;">
        <div>
          <div style="font-weight:bold">Flamengo</div>
          <div style="font-weight:bold">Palmeiras</div>
        </div>
        <div style="text-align:right">
          <div class="placar">2 - 1</div>
          <div class="status">72' AO VIVO 🔴</div>
        </div>
      </div>
      <a href="assistir.html?id=3nJN6ljCXHQ" class="btn">▶️ ASSISTIR DENTRO DO APP</a>
    </div>

    <div class="jogo">
      <div style="display:flex; justify-content:space-between; width:100%;">
        <div>
          <div style="font-weight:bold">Corinthians</div>
          <div style="font-weight:bold">São Paulo</div>
        </div>
        <div style="text-align:right">
          <div class="placar">0 - 0</div>
          <div class="status">15' AO VIVO 🔴</div>
        </div>
      </div>
      <a href="assistir.html?id=3nJN6ljCXHQ" class="btn">▶️ ASSISTIR DENTRO DO APP</a>
    </div>
  `;

  divProx.innerHTML = `
    <p>✅ App funcionando!</p>
    <p style="color:#888; font-size:13px;">Atualizado: ${new Date().toLocaleTimeString('pt-BR')}</p>
  `;
}

carregar();
