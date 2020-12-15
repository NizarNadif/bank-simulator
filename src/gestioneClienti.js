const URL_verifica = "http://localhost:63342/banca/sito/verificaUtente.php?";

async function accedi(form) {
	let URL = "http://localhost:63342/banca/sito/verificaUtente.php?";
	URL += "user=" + form.user.value + "&password=" + form.pass.value;
	let access = await fetch(URL).then((r) => r.json());
	if (access) login();
}
