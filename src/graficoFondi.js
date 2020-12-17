const URL_fondo = "http://localhost:63342/banca/sito/profilo/dati_fondi.php";
let grafico_fondi;
let fondi, labels_fondi, colori_fondi, valori_fondi;

fetch(URL_fondo + "?user=" + utente)
	.then((r) => r.json())
	.then((data) => {
		fondi = data;

		labels_fondi = Object.keys(fondi);

		fondi = Object.values(fondi);

		valori_fondi = fondi.map((fondo) => fondo.valore);

		colori_fondi = new Array();
		fondi.forEach((fondo) => {
			colori_fondi[colori_fondi.length] =
				"#" +
				Math.floor(Math.random() * parseInt("ffffff", 16)).toString(16);
		});
		createChartFondi();
	});

function createChartFondi() {
	var ctx = document.getElementById("grafico-fondi");
	grafico_fondi = new Chart(ctx, {
		type: "horizontalBar",
		data: {
			labels: labels_fondi,
			datasets: [
				{
					label: "valore (€)",
					backgroundColor: colori_fondi,
					data: valori_fondi,
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
