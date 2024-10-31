const popup = document.getElementById('modalBackground')!;
const popupBox = document.getElementById('dynamicContent')!;

// Klass för banken
class Bank {
   bankName:string;
   customers:Customer[];

   constructor(name:string, customers:Customer[]) {
      this.bankName = name
      this.customers = customers
   }

   customerName:string;
   password:string;
   balance:number;

   createNewCustomer(customerName:string, password:string) {
      const newCustomer = new Customer(customerName, password, 0);
      this.customers.push(newCustomer);
      this.saveBankToLocalStorage()
      return newCustomer;
   }

   saveBankToLocalStorage() {
      localStorage.setItem('bank', JSON.stringify(this));
   }

   createCustomerInstance(customerName:string, password:string, balance:number) {
      return new Customer(customerName, password, balance);
   }
}

// Klass för kunden
class Customer {
   name:string;
   password:string;
   balance:number;

   constructor(name:string, password:string, balance:number) {
      this.name = name;
      this.password = password;
      this.balance = balance;
   }

   showBalance() {
      popup.style.display = 'flex';
      const firstTitle = createNewElement('h3', 'Ditt saldo är:', null, null, popupBox);
      const balanceTitle = createNewElement('h1',`${currentCustomer.balance.toLocaleString('sv-SE')} SEK`, null, null, popupBox);
   }

   makeDepositOrWithdrawal(type:string) {
      let actionNoun:string;
      let actionVerb:string;
      if (type == 'deposit') {
         actionNoun = 'Insättning';
         actionVerb = 'sätta in'; 
      } else {
         actionNoun = 'Uttag';
         actionVerb = 'ta ut';
      }
      popup.style.display = 'flex';
      createNewElement('h3', `Välj den summa du vill ${actionVerb}:`, null, null, popupBox);
      const amountTextbox = createNewElement('input', null, null, null, popupBox) as HTMLInputElement;
      amountTextbox.type = 'number';
      amountTextbox.min = '1';
      const confirmButton = createNewElement('button', `Gör ${actionNoun.toLowerCase()}`, null, null, popupBox);
      confirmButton.onclick = () => {
         const depositValue = +amountTextbox.value;
         if (type == 'deposit') {
            this.balance += depositValue;
         } else {
            const newBalance = this.balance - depositValue;
            if (newBalance < 0) {
               const errorText = createNewElement('h3', 'Du har inte tillräckligt med pengar för att genomföra uttaget.', null, null, popupBox);
               errorText.style.color = 'red';
               return;
            }
            this.balance = newBalance;
         }
         
         popupBox.innerHTML = '';
         createNewElement('h3', `${actionNoun} på ${depositValue.toLocaleString('sv-SE')} SEK har genomförts.`, null, null, popupBox);
      }
   }
}

const localStorageBank = JSON.parse(localStorage.getItem('bank')!);
const bank = new Bank(localStorageBank.bankName, localStorageBank.customers);
let currentCustomer:object;
(document.querySelector('header h1') as HTMLHeadingElement).innerText = bank.bankName;
bank.saveBankToLocalStorage();

document.getElementById('login')!.onclick = () => {
   const username = document.getElementById('username')! as HTMLInputElement;
   const password = document.getElementById('password')! as HTMLInputElement;
   console.log(bank.customers);
   let correctCredentials = false;
   console.log();
   let correctUser:object;
   bank.customers.forEach(customer => {
      if (username.value == customer.name && password.value == customer.password) {
         correctCredentials = true;
         correctUser = customer;
         return;
      }
   });
   if (correctCredentials) {
      console.log('användare', correctUser!);
      currentCustomer = bank.createCustomerInstance(correctUser!.name, correctUser!.password, correctUser!.balance);
      document.getElementById('loginPage')?.classList.add('hidden')
      document.getElementById('buttonContainer')?.classList.remove('hidden');
   }
}

document.getElementById('newUser')!.onclick = () => {
   popup.style.display = 'flex';
   createNewElement('h3', 'Skapa användare', null, null, popupBox);
   const newUsername = createNewElement('input', null, null, null, popupBox) as HTMLInputElement;
   const newPassword = createNewElement('input', null, null, null, popupBox) as HTMLInputElement;
   newUsername.placeholder = 'Användarnamn';
   newPassword.placeholder = 'Lösenord';
   newPassword.type = 'password'
   const saveUserButton = createNewElement('button', 'Skapa användare', null, null, popupBox);
   saveUserButton.onclick = () => {
      bank.createNewCustomer(newUsername.value, newPassword.value);
      createNewElement('h4', 'Konto har skapats!', 'accountCreated', null, popupBox)
   }
}

document.getElementById('balance')!.onclick = () => {
   currentCustomer.showBalance();
}

document.getElementById('deposit')!.onclick = () => {
   currentCustomer.makeDepositOrWithdrawal('deposit');
}

document.getElementById('withdrawal')!.onclick = () => {
   currentCustomer.makeDepositOrWithdrawal('withdrawal');
}

document.getElementById('closeButton')!.onclick = () => {
   document.getElementById('modalBackground')!.style.display = 'none';
   document.getElementById('dynamicContent')!.innerHTML = '';
}




function createNewElement(elementType:string, text:string|null, id:string|null, classes:string|null, parent:HTMLElement) {
   const element = document.createElement(elementType);

   if (text) {
      element.innerText = text;
   }

   if (id) {
      element.id = id;
   }

   if (classes) {
      element.classList.add(...classes.split(" "));
   }

   if (parent) {
      parent.appendChild(element);
   }
   return element;
}