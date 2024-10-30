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
        var popup = document.getElementById('modalBackground');
        var popupBox = document.getElementById('dynamicContent');
        popup.style.display = 'flex';
        var firstTitle = createNewElement('h3', 'Ditt saldo är:', null, null, popupBox);
        var balanceTitle = createNewElement('h1', "".concat(customer.balance.toLocaleString('sv-SE'), " SEK"), null, null, popupBox);
    };
    return Customer;
}());
var bank = new Bank('Typbanken', []);
var customer = bank.createNewCustomer('Ville', '1234');
document.getElementById('balance').onclick = function () {
    customer.showBalance();
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
