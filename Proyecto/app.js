var usuarios = [
    { nombre: "Yeon", saldo: 200, password: "1234" },
    { nombre: "Shuri", saldo: 290, password: "5678" },
    { nombre: "Yue", saldo: 67, password: "91011" },
    { nombre: "Junho", saldo: 100, password: "1213" },
    { nombre: "Quetzi", saldo: 50, password: "1415" }
];

let currentAccount = null;

document.getElementById('login-button').addEventListener('click', function() {
    const nombreUsuario = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;
    const account = usuarios.find(user => user.nombre === nombreUsuario);

    if (account && account.password === password) {
        currentAccount = account;
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('atm-options').classList.remove('hidden');
        document.getElementById('user-name').innerText = account.nombre;
        document.getElementById('login-error').innerText = '';
    } else {
        document.getElementById('login-error').innerText = "Contraseña incorrecta. Intenta nuevamente.";
    }
});

document.getElementById('check-balance').addEventListener('click', function() {
    document.getElementById('atm-response').innerText = `Tu saldo actual es: $${currentAccount.saldo}`;
    document.getElementById('transaction-section').classList.add('hidden');
});

document.getElementById('deposit').addEventListener('click', function() {
    document.getElementById('transaction-section').classList.remove('hidden');
    document.getElementById('transaction-amount').value = '';
    document.getElementById('transaction-error').innerText = '';
    document.getElementById('transaction-confirm').onclick = function() {
        const amount = parseInt(document.getElementById('transaction-amount').value);
        if (isNaN(amount) || amount <= 0) {
            document.getElementById('transaction-error').innerText = "Ingresa un monto válido.";
            return;
        }
        if (currentAccount.saldo + amount > 990) {
            document.getElementById('transaction-error').innerText = "El saldo no puede exceder $990.";
            return;
        }
        currentAccount.saldo += amount;
        document.getElementById('atm-response').innerText = `Ingresaste: $${amount}. Tu nuevo saldo es: $${currentAccount.saldo}`;
        document.getElementById('transaction-section').classList.add('hidden');
    };
});

document.getElementById('withdraw').addEventListener('click', function() {
    document.getElementById('transaction-section').classList.remove('hidden');
    document.getElementById('transaction-amount').value = '';
    document.getElementById('transaction-error').innerText = '';
    document.getElementById('transaction-confirm').onclick = function() {
        const amount = parseInt(document.getElementById('transaction-amount').value);
        if (isNaN(amount) || amount <= 0) {
            document.getElementById('transaction-error').innerText = "Ingresa un monto válido.";
            return;
        }
        if (currentAccount.saldo - amount < 10) {
            document.getElementById('transaction-error').innerText = "El saldo no puede ser menor a $10.";
            return;
        }
        currentAccount.saldo -= amount;
        document.getElementById('atm-response').innerText = `Retiraste: $${amount}. Tu nuevo saldo es: $${currentAccount.saldo}`;
        document.getElementById('transaction-section').classList.add('hidden');
    };
});

document.getElementById('logout').addEventListener('click', function() {
    currentAccount = null;
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('atm-options').classList.add('hidden');
    document.getElementById('floatingPassword').value = '';
    document.getElementById('floatingInput').value = '';
    document.getElementById('login-error').innerText = '';
    document.getElementById('atm-response').innerText = '';
    document.getElementById('transaction-section').classList.add('hidden');
});
