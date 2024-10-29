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
    return Customer;
}());
var bank = new Bank('Typbanken', []);
console.log('bank', bank);
var customer = bank.createNewCustomer('Ville', '1234');
console.log(customer);
var balanceButton = document.getElementById('balance');
console.log('button', balanceButton);
