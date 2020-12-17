const URL_dati_utente =
	"http://localhost:63342/banca/sito/profilo/dati_utente.php";
fetch(URL_dati_utente + "?user=" + utente)
	.then((r) => r.json())
	.then((utente) => {
		console.log(utente);
		utente = utente[0];
		document.getElementById("nome_utente").innerText = utente.username;

		const testo = document.getElementById("testo_utente");
		testo.innerHTML =
			"<b>nominativo: </b>" +
			utente.cognome +
			" " +
			utente.nome +
			"</br><b>e-mail: </b>" +
			utente.mail +
			"</br><b>saldo: </b>" +
			utente.saldo +
			" €</br>";
	});
