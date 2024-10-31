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
    Bank.prototype.saveBankToLocalStorage = function () {
        localStorage.setItem('bank', JSON.stringify(this));
    };
    Bank.prototype.createCustomerInstance = function (customerName, password, balance) {
        return new Customer(customerName, password, balance);
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
    Customer.prototype.showBalance = function () {
        popup.style.display = 'flex';
        var firstTitle = createNewElement('h3', 'Ditt saldo är:', null, null, popupBox);
        var balanceTitle = createNewElement('h1', "".concat(currentCustomer.balance.toLocaleString('sv-SE'), " SEK"), null, null, popupBox);
    };
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
            popupBox.innerHTML = '';
            createNewElement('h3', "".concat(actionNoun, " p\u00E5 ").concat(depositValue.toLocaleString('sv-SE'), " SEK har genomf\u00F6rts."), null, null, popupBox);
        };
    };
    return Customer;
}());
var localStorageBank = JSON.parse(localStorage.getItem('bank'));
var bank = new Bank(localStorageBank.bankName, localStorageBank.customers);
var currentCustomer;
document.querySelector('header h1').innerText = bank.bankName;
bank.saveBankToLocalStorage();
document.getElementById('login').onclick = function () {
    var _a, _b;
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    console.log(bank.customers);
    var correctCredentials = false;
    console.log();
    var correctUser;
    bank.customers.forEach(function (customer) {
        if (username.value == customer.name && password.value == customer.password) {
            correctCredentials = true;
            correctUser = customer;
            return;
        }
    });
    if (correctCredentials) {
        console.log('användare', correctUser);
        currentCustomer = bank.createCustomerInstance(correctUser.name, correctUser.password, correctUser.balance);
        (_a = document.getElementById('loginPage')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = document.getElementById('buttonContainer')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    }
};
document.getElementById('newUser').onclick = function () {
    popup.style.display = 'flex';
    createNewElement('h3', 'Skapa användare', null, null, popupBox);
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
document.getElementById('balance').onclick = function () {
    currentCustomer.showBalance();
};
document.getElementById('deposit').onclick = function () {
    currentCustomer.makeDepositOrWithdrawal('deposit');
};
document.getElementById('withdrawal').onclick = function () {
    currentCustomer.makeDepositOrWithdrawal('withdrawal');
};
document.getElementById('closeButton').onclick = function () {
    document.getElementById('modalBackground').style.display = 'none';
    document.getElementById('dynamicContent').innerHTML = '';
};
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
