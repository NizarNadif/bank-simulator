const URL_azioni = "http://localhost:63342/banca/sito/azioni/cronologiaAll.php";
const URL_datiFondi = "http://localhost:63342/banca/sito/azioni/fondi.php";
const URL_datiAzione =
	"http://localhost:63342/banca/sito/azioni/datiAzione.php";
let fondi;

async function acquireData() {
	/* azioni */
	let azioni = await fetch(URL_azioni).then((r) => r.json());
	let nomi_azioni = Object.keys(azioni);
	azioni = Object.values(azioni);
	sessionStorage.setItem("azioni", JSON.stringify(azioni));
	sessionStorage.setItem("nomi_azioni", JSON.stringify(nomi_azioni));

	/* fondi */
	fondi = await fetch(URL_datiFondi).then((r) => r.json());
	console.log(fondi);
	let nomi_fondi = Object.keys(fondi);
	const titoli = document.getElementById("tabella-fondi-titoli");
	nomi_fondi.forEach((nome) => {
		const headerColonna = document.createElement("th");
		headerColonna.scope = "col";
		headerColonna.innerText = nome;
		titoli.appendChild(headerColonna);
	});

	const tabella_fondi = document.getElementById("tabella-fondi");
	nomi_azioni.forEach((nome) => {
		const riga_tabella = document.createElement("tr");
		const riga = document.createElement("th");
		riga.scope = "row";
		riga.innerText = nome;
		riga_tabella.appendChild(riga);
		tabella_fondi.appendChild(riga_tabella);

		Object.values(fondi).forEach((fondo) => {
			const cell = document.createElement("td");
			cell.innerText = "-";
			fondo.forEach((azione) => {
				if (azione.societa == nome) {
					cell.innerText = azione.percentuale + "%";
				}
			});
			riga_tabella.appendChild(cell);
		});
	});
}

acquireData();

function riempiMenu() {
	const menu = document.getElementById("menu");
	menu.innerHTML = "";
	let header = document.createElement("h6");
	header.innerText = "Azioni:";
	header.className = "dropdown-header";
	menu.appendChild(header);
	let nomi_azioni = JSON.parse(sessionStorage.getItem("nomi_azioni"));
	nomi_azioni.forEach(async (nome) => {
		const azione = document.createElement("a");
		azione.className = "dropdown-item";
		azione.innerText = nome;
		azione.role = "button";
		azione.onclick = () => {
			updateTable(nome);
			addLineByName(nome);
		};
		menu.appendChild(azione);
	});
}

async function updateTable(nome) {
	let dati = await fetch(URL_datiAzione + "?societa=" + nome).then((r) =>
		r.json()
	);
	dati = [
		["massimo", dati.massimo.data, dati.massimo.prezzo],
		["minimo", dati.minimo.data, dati.minimo.prezzo],
		["media", null, dati.media],
	];
	document.getElementById("titolo").innerText = nome;
	riempiTabella("tabella", dati, 3);
	document.getElementById("card-tabella").style.display = "block";
}

function riempiTabella(idTabella, dati, nColonne) {
	const tabella = document.getElementById(idTabella);
	tabella.innerHTML = "";
	dati.forEach((dato) => {
		const row = document.createElement("tr");
		for (let i = 0; i < nColonne; i++) {
			const riga = document.createElement("td");
			if (dato[i] == null || dato[i] == undefined) dato[i] = "";
			riga.innerText = dato[i];
			row.appendChild(riga);
		}
		tabella.appendChild(row);
	});
}
