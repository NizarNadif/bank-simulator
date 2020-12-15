const URL_azioni = "http://localhost:63342/banca/sito/azioni/cronologiaAll.php";

async function acquireData() {
	//let azioni = await getDati("temp/valoreAzioni.json")
	let azioni = await getDati(URL_azioni);
	let nomi_azioni = Object.keys(azioni);
	azioni = Object.values(azioni);
	sessionStorage.setItem("azioni", JSON.stringify(azioni));
	sessionStorage.setItem("nomi_azioni", JSON.stringify(nomi_azioni));
}

async function getDati(url, parameters) {
	if (parameters != undefined && parameters != null) {
		url += "?";
		parameters.forEach((parameter) => {
			url += parameter.key + "=" + parameter.value + "&";
		});
	}
	let result = await fetch(url).then((r) => r.json());
	return result;
}
acquireData();
