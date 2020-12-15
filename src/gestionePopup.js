function openElement(id) {
	document.getElementById(id).style.display = "block";
}

function closeElement(id) {
	document.getElementById(id).style.display = "none";
}

function changePage(url) {
	document.location.href = url;
}

function login() {
	closeElement("login-form");
	changePage("azioni.html");
}
