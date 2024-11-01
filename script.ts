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

   // Metod för att spara bankens nuvaranade info till localStorage
   saveBankToLocalStorage() {
      localStorage.setItem('bank', JSON.stringify(this));
   }

   // Metod för att skapa ny instans av den inloggade kunden utan att skapa en ny kund
   createCustomerInstance(customerName:string, password:string, balance:number) {
      return new Customer(customerName, password, balance);
   }

   // Metod för att uppdatera användarens info (i detta fall bara saldo)
   updateCustomerInfo(customer:object) {
      for (const currentCustomer in this.customers) {
         if (this.customers[currentCustomer].name == customer.name) {
            this.customers[currentCustomer] = customer;
         }
      }
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

   // Metod för att visa saldo
   showBalance() {
      popup.style.display = 'flex';
      const firstTitle = createNewElement('h3', 'Ditt saldo är:', null, null, popupBox);
      const balanceTitle = createNewElement('h1',`${currentCustomer.balance.toLocaleString('sv-SE')} SEK`, null, null, popupBox);
   }

   // Metod för att göra insättning eller uttag, beroende på parametern type
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

         bank.updateCustomerInfo(this);
         bank.saveBankToLocalStorage();
         
         popupBox.innerHTML = '';
         createNewElement('h3', `${actionNoun} på ${depositValue.toLocaleString('sv-SE')} SEK har genomförts.`, null, null, popupBox);
      }
   }

   logout() {
      document.getElementById('loginPage')?.classList.remove('hidden');
      document.getElementById('buttonContainer')?.classList.add('hidden');
      document.getElementById('username')!.value = '';
      document.getElementById('password')!.value = '';
   }
}

// Kollar om banken finns i LS, annars sätt en startbank
if (!localStorage.getItem('bank')) {
   localStorage.setItem('bank', JSON.stringify({
      bankName: 'Typbanken',
      customers: []
   }))
}

// Skapar ny instans av banken
const localStorageBank = JSON.parse(localStorage.getItem('bank')!);
const bank = new Bank(localStorageBank.bankName, localStorageBank.customers);
let currentCustomer:Customer;
(document.querySelector('header h1') as HTMLHeadingElement).innerText = bank.bankName;
bank.saveBankToLocalStorage();

// Kollar om det redan finns inloggad användare, isåfall loggar in den
if (localStorage.getItem('userLoggedIn')) {
   loginUser(localStorage.getItem('userLoggedIn')!);
}

// Klick på logga in-knappen
document.getElementById('login')!.onclick = () => {
   const username = document.getElementById('username')! as HTMLInputElement;
   const password = document.getElementById('password')! as HTMLInputElement;
   let correctCredentials = false;
   let correctUser:string;
   bank.customers.forEach(customer => {
      if (username.value == customer.name && password.value == customer.password) {
         correctCredentials = true;
         correctUser = customer.name;
         return;
      }
   });
   if (correctCredentials) {
      localStorage.setItem('userLoggedIn', correctUser!)
      loginUser(correctUser!);
   } else if (!document.getElementById('wrongCredText')) {
      const wrongCred = createNewElement('h4', 'Felaktigt användarnamn eller lösenord, försök igen!', 'wrongCredText', null, null);
      wrongCred.style.color = 'red';
      document.getElementById('loginPage')?.insertBefore(wrongCred, document.getElementById('newUser')!)
   }
}

// Klick på Skapa användare-knappen
document.getElementById('newUser')!.onclick = () => {
   popup.style.display = 'flex';
   createNewElement('h3', 'Skapa konto', null, null, popupBox);
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

// Klick på saldo-knappen
document.getElementById('balance')!.onclick = () => {
   currentCustomer.showBalance();
}

// Klick på insättning-knappen
document.getElementById('deposit')!.onclick = () => {
   currentCustomer.makeDepositOrWithdrawal('deposit');
}

// Klick på uttag-knappen
document.getElementById('withdrawal')!.onclick = () => {
   currentCustomer.makeDepositOrWithdrawal('withdrawal');
}

// Klick på avsluta-knappen
document.getElementById('logout')!.onclick = () => {
   currentCustomer.logout();
   localStorage.removeItem('userLoggedIn');
}

// Klick på stänga ner ruta-kryss
document.getElementById('closeButton')!.onclick = () => {
   document.getElementById('modalBackground')!.style.display = 'none';
   document.getElementById('dynamicContent')!.innerHTML = '';
}

// Funktion för att logga in en användare
function loginUser(user:string) {
   let correctCustomer:object;
   bank.customers.forEach(customer => {
      if (customer.name == user) {
         correctCustomer = customer;
      }
   });
   currentCustomer = bank.createCustomerInstance(correctCustomer!.name, correctCustomer!.password, correctCustomer!.balance);
   document.getElementById('loginPage')?.classList.add('hidden')
   document.getElementById('buttonContainer')?.classList.remove('hidden');
}




function createNewElement(elementType:string, text:string|null, id:string|null, classes:string|null, parent:HTMLElement|null) {
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