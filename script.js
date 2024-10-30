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
    Customer.prototype.makeDeposit = function () {
        var _this = this;
        popup.style.display = 'flex';
        var title = createNewElement('h3', 'Välj den summa du vill sätta in:', null, null, popupBox);
        var amountTextbox = createNewElement('input', null, null, null, popupBox);
        amountTextbox.type = 'number';
        amountTextbox.min = '1';
        var confirmButton = createNewElement('button', 'Gör insättning', null, null, popupBox);
        confirmButton.onclick = function () {
            var depositValue = +amountTextbox.value;
            _this.balance += depositValue;
            popupBox.innerHTML = '';
            createNewElement('h3', "Ins\u00E4ttning p\u00E5 ".concat(depositValue.toLocaleString('sv-SE'), " SEK har genomf\u00F6rts."), null, null, popupBox);
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
    customer.makeDeposit();
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
