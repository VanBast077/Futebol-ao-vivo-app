function carregar() {
  const divAoVivo = document.getElementById("jogos-ao-vivo");
  const divProx = document.getElementById("proximos-jogos");

  divAoVivo.innerHTML = `
    <div style="background:#111; color:#fff; padding:12px; border-radius:12px; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between;">
        <div>
          <div style="font-weight:bold">Flamengo</div>
          <div style="font-weight:bold">Palmeiras</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:bold; font-size:18px;">2 - 1</div>
          <div style="color:#00ff88; font-size:12px;">72' AO VIVO 🔴</div>
        </div>
      </div>
      <a href="assistir.html?id=3nJN6ljCXHQ" style="background:#ff0000; color:white !important; padding:12px; border-radius:8px; text-decoration:none; display:block; text-align:center; font-weight:bold; margin-top:10px;">
         ▶️ ASSISTIR DENTRO DO APP
      </a>
    </div>

    <div style="background:#111; color:#fff; padding:12px; border-radius:12px; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between;">
        <div>
          <div style="font-weight:bold">Corinthians</div>
          <div style="font-weight:bold">São Paulo</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:bold; font-size:18px;">0 - 0</div>
          <div style="color:#00ff88; font-size:12px;">15' AO VIVO 🔴</div>
        </div>
      </div>
      <a href="assistir.html?id=3nJN6ljCXHQ" style="background:#ff0000; color:white !important; padding:12px; border-radius:8px; text-decoration:none; display:block; text-align:center; font-weight:bold; margin-top:10px;">
         ▶️ ASSISTIR DENTRO DO APP
      </a>
    </div>
  `;

  divProx.innerHTML = `<p>✅ App funcionando!<br><span style="color:#888; font-size:13px;">Atualizado: ${new Date().toLocaleTimeString('pt-BR')}</span></p>`;
}

carregar();
