const popup = document.getElementById('modalBackground')!;
const popupBox = document.getElementById('dynamicContent')!;

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

   showBalance() {
      popup.style.display = 'flex';
      const firstTitle = createNewElement('h3', 'Ditt saldo är:', null, null, popupBox);
      const balanceTitle = createNewElement('h1',`${customer.balance.toLocaleString('sv-SE')} SEK`, null, null, popupBox);
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

const bank = new Bank('Typbanken', []);
const customer = bank.createNewCustomer('Ville', '1234');


document.getElementById('balance')!.onclick = () => {
   customer.showBalance();
}

document.getElementById('deposit')!.onclick = () => {
   customer.makeDepositOrWithdrawal('deposit');
}

document.getElementById('withdrawal')!.onclick = () => {
   customer.makeDepositOrWithdrawal('withdrawal');
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