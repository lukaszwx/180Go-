const form = document.getElementById('simulador-form');
const resultado = document.getElementById('resultado');
const botaoResetar = document.getElementById('resetar');
const toggleBtn = document.getElementById('modo-escuro-toggle')

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const distancia = parseFloat(document.getElementById('distancia').value);
  const tempo = parseFloat(document.getElementById('tempo').value);
  const demanda = parseFloat(document.getElementById('demanda').value);
  const clima = parseFloat(document.getElementById('clima').value);
  const transito = parseFloat(document.getElementById('transito').value);

  if (isNaN(distancia) || distancia < 0) {
    alert('Por favor, insira uma distância válida (0 ou mais).');
    return;
  }

  if (isNaN(tempo) || tempo < 1) {
    alert('Por favor, insira um tempo válido (1 minuto ou mais).');
    return;
  }

  const precoBase = 1 + (0.6 * distancia) + (0.3 * tempo);
  const precoFinal = precoBase * demanda * clima * transito;

  resultado.innerHTML = `
    <p><strong>Preço Estimado 180 Go:</strong> R$ ${precoFinal.toFixed(2)}</p>
    <p><strong>Comparativo 99:</strong> R$ 70,90</p>
    <p><strong>Economia:</strong> R$ ${(70.90 - precoFinal).toFixed(2)}</p>
  `;

  botaoResetar.style.display = 'block';
});

botaoResetar.addEventListener('click', () => {
  form.reset();
  resultado.innerHTML = '';
  botaoResetar.style.display = 'none';
  document.getElementById('distancia').focus();
});

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleBtn.textContent = document.body.classList.contains('dark-mode')
    ? 'Light Mode'
    : 'Dark Mode';
});
