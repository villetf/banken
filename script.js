var popup = document.getElementById('modalBackground');
var popupBox = document.getElementById('dynamicContent');
// Klass för banken
var Bank = /** @class */ (function () {
    function Bank(name, customers) {
        this.bankName = name;
        this.customers = customers;
    }
    Bank.prototype.createNewCustomer = function (customerName, password) {
        var newCustomer = new Customer(customerName, password, 0);
        this.customers.push(newCustomer);
        this.saveBankToLocalStorage();
        return newCustomer;
    };
    // Metod för att spara bankens nuvaranade info till localStorage
    Bank.prototype.saveBankToLocalStorage = function () {
        localStorage.setItem('bank', JSON.stringify(this));
    };
    // Metod för att skapa ny instans av den inloggade kunden utan att skapa en ny kund
    Bank.prototype.createCustomerInstance = function (customerName, password, balance) {
        return new Customer(customerName, password, balance);
    };
    // Metod för att uppdatera användarens info (i detta fall bara saldo)
    Bank.prototype.updateCustomerInfo = function (customer) {
        for (var currentCustomer_1 in this.customers) {
            if (this.customers[currentCustomer_1].name == customer.name) {
                this.customers[currentCustomer_1] = customer;
            }
        }
    };
    return Bank;
}());
// Klass för kunden
var Customer = /** @class */ (function () {
    function Customer(name, password, balance) {
        this.name = name;
        this.password = password;
        this.balance = balance;
    }
    // Metod för att visa saldo
    Customer.prototype.showBalance = function () {
        popup.style.display = 'flex';
        var firstTitle = createNewElement('h3', 'Ditt saldo är:', null, null, popupBox);
        var balanceTitle = createNewElement('h1', "".concat(currentCustomer.balance.toLocaleString('sv-SE'), " SEK"), null, null, popupBox);
    };
    // Metod för att göra insättning eller uttag, beroende på parametern type
    Customer.prototype.makeDepositOrWithdrawal = function (type) {
        var _this = this;
        var actionNoun;
        var actionVerb;
        if (type == 'deposit') {
            actionNoun = 'Insättning';
            actionVerb = 'sätta in';
        }
        else {
            actionNoun = 'Uttag';
            actionVerb = 'ta ut';
        }
        popup.style.display = 'flex';
        createNewElement('h3', "V\u00E4lj den summa du vill ".concat(actionVerb, ":"), null, null, popupBox);
        var amountTextbox = createNewElement('input', null, null, null, popupBox);
        amountTextbox.type = 'number';
        amountTextbox.min = '1';
        var confirmButton = createNewElement('button', "G\u00F6r ".concat(actionNoun.toLowerCase()), null, null, popupBox);
        confirmButton.onclick = function () {
            var depositValue = +amountTextbox.value;
            if (type == 'deposit') {
                _this.balance += depositValue;
            }
            else {
                var newBalance = _this.balance - depositValue;
                if (newBalance < 0) {
                    var errorText = createNewElement('h3', 'Du har inte tillräckligt med pengar för att genomföra uttaget.', null, null, popupBox);
                    errorText.style.color = 'red';
                    return;
                }
                _this.balance = newBalance;
            }
            bank.updateCustomerInfo(_this);
            bank.saveBankToLocalStorage();
            popupBox.innerHTML = '';
            createNewElement('h3', "".concat(actionNoun, " p\u00E5 ").concat(depositValue.toLocaleString('sv-SE'), " SEK har genomf\u00F6rts."), null, null, popupBox);
        };
    };
    return Customer;
}());
// Kollar om banken finns i LS, annars sätt en startbank
if (!localStorage.getItem('bank')) {
    localStorage.setItem('bank', JSON.stringify({
        bankName: 'Typbanken',
        customers: []
    }));
}
// Skapar ny instans av banken
var localStorageBank = JSON.parse(localStorage.getItem('bank'));
var bank = new Bank(localStorageBank.bankName, localStorageBank.customers);
var currentCustomer;
document.querySelector('header h1').innerText = bank.bankName;
bank.saveBankToLocalStorage();
// Kollar om det redan finns inloggad användare, isåfall loggar in den
if (localStorage.getItem('userLoggedIn')) {
    loginUser(localStorage.getItem('userLoggedIn'));
}
// Klick på logga in-knappen
document.getElementById('login').onclick = function () {
    var _a;
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var correctCredentials = false;
    var correctUser;
    bank.customers.forEach(function (customer) {
        if (username.value == customer.name && password.value == customer.password) {
            correctCredentials = true;
            correctUser = customer.name;
            return;
        }
    });
    if (correctCredentials) {
        localStorage.setItem('userLoggedIn', correctUser);
        loginUser(correctUser);
    }
    else if (!document.getElementById('wrongCredText')) {
        var wrongCred = createNewElement('h4', 'Felaktigt användarnamn eller lösenord, försök igen!', 'wrongCredText', null, null);
        wrongCred.style.color = 'red';
        (_a = document.getElementById('loginPage')) === null || _a === void 0 ? void 0 : _a.insertBefore(wrongCred, document.getElementById('newUser'));
    }
};
// Klick på Skapa användare-knappen
document.getElementById('newUser').onclick = function () {
    popup.style.display = 'flex';
    createNewElement('h3', 'Skapa konto', null, null, popupBox);
    var newUsername = createNewElement('input', null, null, null, popupBox);
    var newPassword = createNewElement('input', null, null, null, popupBox);
    newUsername.placeholder = 'Användarnamn';
    newPassword.placeholder = 'Lösenord';
    newPassword.type = 'password';
    var saveUserButton = createNewElement('button', 'Skapa användare', null, null, popupBox);
    saveUserButton.onclick = function () {
        bank.createNewCustomer(newUsername.value, newPassword.value);
        createNewElement('h4', 'Konto har skapats!', 'accountCreated', null, popupBox);
    };
};
// Klick på saldo-knappen
document.getElementById('balance').onclick = function () {
    currentCustomer.showBalance();
};
// Klick på insättning-knappen
document.getElementById('deposit').onclick = function () {
    currentCustomer.makeDepositOrWithdrawal('deposit');
};
// Klick på uttag-knappen
document.getElementById('withdrawal').onclick = function () {
    currentCustomer.makeDepositOrWithdrawal('withdrawal');
};
// Klick på avsluta-knappen
document.getElementById('logout').onclick = function () {
    var _a, _b;
    localStorage.removeItem('userLoggedIn');
    (_a = document.getElementById('loginPage')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    (_b = document.getElementById('buttonContainer')) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
};
// Klick på stänga ner ruta-kryss
document.getElementById('closeButton').onclick = function () {
    document.getElementById('modalBackground').style.display = 'none';
    document.getElementById('dynamicContent').innerHTML = '';
};
// Funktion för att logga in en användare
function loginUser(user) {
    var _a, _b;
    var correctCustomer;
    bank.customers.forEach(function (customer) {
        if (customer.name == user) {
            correctCustomer = customer;
        }
    });
    currentCustomer = bank.createCustomerInstance(correctCustomer.name, correctCustomer.password, correctCustomer.balance);
    (_a = document.getElementById('loginPage')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    (_b = document.getElementById('buttonContainer')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
}
function createNewElement(elementType, text, id, classes, parent) {
    var _a;
    var element = document.createElement(elementType);
    if (text) {
        element.innerText = text;
    }
    if (id) {
        element.id = id;
    }
    if (classes) {
        (_a = element.classList).add.apply(_a, classes.split(" "));
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}
