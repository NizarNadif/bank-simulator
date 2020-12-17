const URLs = {
	es1: "http://localhost:63342/banca/esercizi/lista_clienti.php",
	es2: "http://localhost:63342/banca/esercizi/azioni_acquistate.php",
	es3: "http://localhost:63342/banca/esercizi/possiedono_azione.php",
	es4: "http://localhost:63342/banca/esercizi/azione_costosa.php",
	es5: "http://localhost:63342/banca/esercizi/azioni_piu_fondi.php",
	es6: "http://localhost:63342/banca/esercizi/valore_portafoglio.php",
};
const lista_clienti = document.getElementById("es1");
let nomiClienti = new Array(),
	portafogli;

async function getData() {
	let clienti = await fetch(URLs.es1).then((r) => r.json());
	nomiClienti = clienti.map((cliente) => cliente.username);

	clienti = clienti.map((cliente) => ({
		prima: cliente.username,
		seconda: cliente.password,
	}));
	riempiTabella("tabella-1", clienti);

	/* esercizio 3 */
	let possiedono_azione = await doFetch(URLs.es3, "");
	possiedono_azione = possiedono_azione.map(
		(cliente) => cliente.nominativo + " (@" + cliente.username + ")"
	);
	riempiLista(document.getElementById("es3"), possiedono_azione);

	/* esercizio 4 */
	let nome = await doFetch(URLs.es4, "");
	nome = nome[0].societa + " (" + nome[0].prezzo + "€)";
	document.getElementById("es4").innerText = nome;

	/* esercizio 5 */
	let azioni = await doFetch(URLs.es5, "");
	azioni = azioni.map((el) => ({ prima: el.nome, seconda: el.numero }));
	riempiTabella("tabella-5", azioni);

	/* esercizio 6 */
	portafogli = await doFetch(URLs.es6, "");
	let valori = new Array();
	for (const [key, value] of Object.entries(portafogli)) {
		valori[valori.length] = { prima: key, seconda: value.valore };
	}
	riempiTabella("tabella-6", valori);
}
getData();
function riempiLista(lista, dati) {
	lista.innerHTML = "";
	dati.forEach((dato) => {
		let elemento = document.createElement("li");
		elemento.className = "list-group-item";
		elemento.innerText = dato;
		lista.append(elemento);
	});
}

async function riempiMenu() {
	const menu = document.getElementById("menu");
	menu.innerHTML = "";
	nomiClienti.forEach(async (nome) => {
		const azione = document.createElement("a");
		azione.className = "dropdown-item";
		azione.innerText = nome;
		azione.role = "button";
		let azioni_acquistate = await doFetch(URLs.es2, "?user=" + nome);
		azioni_acquistate = azioni_acquistate.map((azione) => azione.societa);
		azione.onclick = () => {
			riempiLista(document.getElementById("es2"), azioni_acquistate);
		};

		menu.appendChild(azione);
	});
}

async function doFetch(url, parameters) {
	url += parameters;
	let result = await fetch(url).then((r) => r.json());
	return result;
}

function riempiTabella(idTabella, dati) {
	const tabella = document.getElementById(idTabella);
	dati.forEach((dato) => {
		const row = document.createElement("tr");
		const prima = document.createElement("td");
		const seconda = document.createElement("td");
		prima.innerText = dato.prima;
		seconda.innerText = dato.seconda;
		tabella.appendChild(row);
		row.appendChild(prima);
		row.appendChild(seconda);
	});
}
