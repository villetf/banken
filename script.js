var popup = document.getElementById('modalBackground');
var popupBox = document.getElementById('dynamicContent');
var Bank = /** @class */ (function () {
    function Bank(name, customers) {
        this.bankName = name;
        this.customers = customers;
    }
    Bank.prototype.createNewCustomer = function (customerName, password) {
        var newCustomer = new Customer(customerName, password);
        this.customers.push(newCustomer);
        return newCustomer;
    };
    return Bank;
}());
var Customer = /** @class */ (function () {
    function Customer(name, password) {
        this.name = name;
        this.password = password;
        this.balance = 0;
    }
    Customer.prototype.showBalance = function () {
        popup.style.display = 'flex';
        var firstTitle = createNewElement('h3', 'Ditt saldo är:', null, null, popupBox);
        var balanceTitle = createNewElement('h1', "".concat(customer.balance.toLocaleString('sv-SE'), " SEK"), null, null, popupBox);
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
var bank = new Bank('Typbanken', []);
var customer = bank.createNewCustomer('Ville', '1234');
document.getElementById('balance').onclick = function () {
    customer.showBalance();
};
document.getElementById('deposit').onclick = function () {
    customer.makeDepositOrWithdrawal('deposit');
};
document.getElementById('withdrawal').onclick = function () {
    customer.makeDepositOrWithdrawal('withdrawal');
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
