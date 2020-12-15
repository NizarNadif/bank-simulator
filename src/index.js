function riempiMenu() {
	const menu = document.getElementById("menu");
	menu.innerHTML = "";
	let header = document.createElement("h6");
	header.innerText = "Azioni:";
	header.className = "dropdown-header";
	menu.appendChild(header);
	let nomi_azioni = JSON.parse(sessionStorage.getItem("nomi_azioni"));
	nomi_azioni.forEach((nome) => {
		const azione = document.createElement("a");
		azione.className = "dropdown-item";
		azione.innerText = nome;
		azione.role = "button";
		azione.onclick = () => addLineByName(nome);
		menu.appendChild(azione);
	});
}
