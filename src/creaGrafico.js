let grafico;
let azioni = JSON.parse(sessionStorage.getItem("azioni"));
let giornate = azioni[0].cronologia.map((g) => g.data);

createLineChart({ labels: giornate, datasets: [] });

function getLineDataset(azione) {
	/*let prezzi = azione.cronologia.map((giornata) => ({
		x: giornata.data,
		y: giornata.prezzo,
	}));*/
	let prezzi = azione.cronologia.map((giornata) => giornata.prezzo);

	let colore =
		"#" + Math.floor(Math.random() * parseInt("ffffff", 16)).toString(16);
	const dataset = {
		data: prezzi,
		label: azione.nome,
		fill: false,
		borderColor: colore,
	};
	return dataset;
}

function getLineDatasetByName(nome) {
	const azione = azioni.filter((azione) => azione.nome == nome)[0];
	return getLineDataset(azione);
}

function addLineByName(nome) {
	const dataset = this.getLineDatasetByName(nome);
	grafico.data.datasets.push(dataset);
	grafico.update();
}

function createLineChart(data) {
	var ctx = document.getElementById("grafico");
	grafico = new Chart(ctx, {
		type: "line",
		data: data,
		options: {
			title: {
				display: true,
				text: "Andamento delle azioni nel tempo (€)",
			},
			responsive: true,
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: false,
						},
						scaleLabel: {
							display: true,
							labelString: "prezzo (euro)",
						},
					},
				],
				xAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: "data",
						},
					},
				],
			},
		},
	});
}
