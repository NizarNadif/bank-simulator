const URL_verifica =
	"http://localhost:63342/banca/sito/profilo/verificaUtente.php?";

async function accedi(form) {
	let URL = URL_verifica;
	URL += "user=" + form.user.value + "&password=" + form.pass.value;
	let access = await fetch(URL).then((r) => r.json());
	if (access) {
		sessionStorage.setItem("utente", form.user.value);

		login();
	}
}

function visualizzaCodice() {
	let x = document.getElementById("pass");
	if (x.type === "password") {
		x.type = "text";
		document.getElementById("occhio").innerHTML =
			'<i class="far fa-eye-slash"></i>';
	} else {
		x.type = "password";
		document.getElementById("occhio").innerHTML =
			'<i class="far fa-eye"></i>';
	}
}

function changePage(url) {
	document.location.href = url;
}

function login() {
	changePage("profilo.html");
}
