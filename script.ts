class Bank {
   bankName:string;
   customers:object[];

   customerName:string;
   password:string;
   balance:number;

   constructor(name:string, customers:object[]) {
      this.bankName = name
      this.customers = customers
   }

   createNewCustomer(customerName:string, password:string) {
      const newCustomer = new Customer(customerName, password);
      this.customers.push(newCustomer);
      return newCustomer;
   }
}

class Customer {
   name:string;
   password:string;
   balance:number;

   constructor(name:string, password:string) {
      this.name = name;
      this.password = password;
      this.balance = 0;
   }
}

const bank = new Bank('Typbanken', []);
console.log('bank', bank);
const customer = bank.createNewCustomer('Ville', '1234');
console.log(customer);

const balanceButton = document.getElementById('balance');
console.log('button', balanceButton);
