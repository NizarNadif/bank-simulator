const URL_titolo = "http://localhost:63342/banca/sito/profilo/dati_titolo.php";
let grafico_titoli;
let utente = sessionStorage.getItem("utente");
let titoli, labels, colori, valori;

fetch(URL_titolo + "?user=" + utente)
	.then((r) => r.json())
	.then((data) => {
		titoli = data;

		labels = titoli.map(
			(titolo) => titolo.societa + " - " + titolo.quantita
		);

		valori = titoli.map((titolo) => titolo.prezzo);

		colori = new Array();
		titoli.forEach((titolo) => {
			colori[colori.length] =
				"#" +
				Math.floor(Math.random() * parseInt("ffffff", 16)).toString(16);
		});
		createChartTitoli();
	});

function createChartTitoli() {
	var ctx = document.getElementById("grafico-titoli");
	grafico_titoli = new Chart(ctx, {
		type: "horizontalBar",
		data: {
			labels: labels,
			datasets: [
				{
					label: "valore (€)",
					backgroundColor: colori,
					data: valori,
				},
			],
		},
		options: {
			legend: { display: false },
			scales: {
				xAxes: [
					{
						ticks: {
							beginAtZero: true,
						},
					},
				],
			},
		},
	});
}
