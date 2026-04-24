document.getElementById("calcular").addEventListener("click", () => {

    const km = parseFloat(document.getElementById("km").value);
    const corridas = parseFloat(document.getElementById("corridas").value);
    const horas = parseFloat(document.getElementById("horas").value);
    const custoKm = parseFloat(document.getElementById("custo").value);

    if (!km || !corridas || !horas || !custoKm) {
        alert("Preencha todos os campos");
        return;
    }

    // Receita média por corrida
    const mediaCorrida = 12;

    const receita = corridas * mediaCorrida;
    const custo = km * custoKm;
    const lucro = receita - custo;

    const mensal = lucro * 30;

    let feedback = "";

    if (lucro < 50) {
        feedback = "⚠️ Ganho baixo. Talvez não esteja compensando.";
    } else if (lucro < 150) {
        feedback = "💡 Resultado razoável. Dá pra otimizar horários.";
    } else {
        feedback = "🔥 Excelente! Estratégia muito boa.";
    }

    document.getElementById("resultado").innerHTML = `
        <div class="result-box">
            <p><strong>Receita diária:</strong> R$ ${receita.toFixed(2)}</p>
            <p><strong>Custo diário:</strong> R$ ${custo.toFixed(2)}</p>
            <p class="highlight"><strong>Lucro diário:</strong> R$ ${lucro.toFixed(2)}</p>
            <p><strong>Estimativa mensal:</strong> R$ ${mensal.toFixed(2)}</p>
            <p>${feedback}</p>
        </div>
    `;
});
