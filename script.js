const form = document.getElementById("form");
const resultado = document.getElementById("resultado");

// 🔑 COLOCA SUA API KEY AQUI
const API_KEY = "SUA_API_KEY_AQUI";

// ================= GEO CODE =================
async function getCoords(local) {
  const res = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${local}`);
  const data = await res.json();

  if (!data.features.length) throw new Error("Local não encontrado");

  return data.features[0].geometry.coordinates;
}

// ================= ROTA =================
async function getRoute(origem, destino) {
  const res = await fetch("https://api.openrouteservice.org/v2/directions/driving-car", {
    method: "POST",
    headers: {
      "Authorization": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      coordinates: [origem, destino]
    })
  });

  const data = await res.json();

  const summary = data.routes[0].summary;

  return {
    distancia: summary.distance / 1000, // km
    tempo: summary.duration / 60 // minutos
  };
}

// ================= PREÇO =================
function calcularPreco(distancia, tempo, demanda) {
  const base = 4;
  const porKm = 1.5;
  const porMin = 0.3;

  return (base + distancia * porKm + tempo * porMin) * demanda;
}

// ================= FORM =================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const origemText = document.getElementById("origem").value;
  const destinoText = document.getElementById("destino").value;
  const demanda = parseFloat(document.getElementById("demanda").value);

  resultado.innerHTML = "Calculando...";

  try {
    const origem = await getCoords(origemText);
    const destino = await getCoords(destinoText);

    const { distancia, tempo } = await getRoute(origem, destino);

    const preco = calcularPreco(distancia, tempo, demanda);

    resultado.innerHTML = `
      <div class="result-box">
        <h3>Resultado</h3>
        <p>📍 Distância: ${distancia.toFixed(2)} km</p>
        <p>⏱ Tempo: ${tempo.toFixed(0)} min</p>
        <p>💰 Preço estimado: R$ ${preco.toFixed(2)}</p>
      </div>
    `;
  } catch (error) {
    resultado.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
  }
});
