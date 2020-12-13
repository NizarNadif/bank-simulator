let clienti;
fetch('temp/clienti.json')
    .then(r => r.json())
    .then(data => {
        clienti = data;
    });

function accedi(form) {
    let utente = { user: form.user.value, password: form.pass.value };
    console.log(findUser(utente));
}

function findUser(utente) {
    let user, msg;

    for (let i = 0; i < clienti.length; i++) {
        if ((utente.user == clienti[i].username) || (utente.user == clienti[i].mail)) {
            if (utente.password == clienti[i].password) {
                msg = 'accesso permesso';
                createLineChart();
                closeForm();
                return { user: clienti[i], msg: msg };
            } else {
                msg = 'password ' + utente.password + ' errata';
                return { user: undefined, msg: msg };
            }
        } else {
            msg = 'nome utente ' + utente.user + ' errato';
        }
    }
    return { user: undefined, msg: msg };
}

let valori = new Array();
let date = new Array();
const API_valori = 'http://localhost:63342/banca/cronologia_azione.php?societa=batilla';
fetch('temp/valori.json')
    .then(r => r.json())
    .then(data => {
        let i = 0;
        data.forEach(valore => {
            date[i] = valore['data'];
            valori[i++] = {
                x: valore['data'],
                y: valore['prezzo']
            }
        });
    });