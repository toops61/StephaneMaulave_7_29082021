//formulaire vérification des champs
const inputsArray = document.querySelectorAll('form input');
const firstName = inputsArray[0];
const lastName = inputsArray[1];
const address = inputsArray[2];
const city = inputsArray[3];
const email = inputsArray[4];

const regexText = /[0-9/=;`$&"()§!@≠…∞€ø«¡¶{}“º%µ¬®†°π‡∂ﬁƒ¬‹≈©◊ß£*#ë—<>≤≥]/;
const regexAdress = /[/=;`$&()§!@≠…∞€ø«¡¶{}ºµ¬%®†π‡∂ﬁƒ¬‹≈©◊ß£*ë—<>≤≥]/;
const regexMail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;
 
//regex exclu
function rejectInput(inputName, regex) {
    if (regex.exec(inputName.value) != null || inputName.value.length < 2) {
        inputName.classList.remove('valid');
        inputName.classList.add('invalid');
        inputName.valid = false;
    }
    else {
        inputName.classList.remove('invalid');
        inputName.classList.add('valid');
        inputName.valid = true;
    }
}
firstName.addEventListener('input', function(){
    rejectInput(firstName, regexText);
});
lastName.addEventListener('input', function(){
    rejectInput(lastName, regexText);
});
address.addEventListener('input', function(){
    rejectInput(address, regexAdress);
});
city.addEventListener('input', function(){
    rejectInput(city, regexAdress);
});

//Regex attendu
function expectInput(inputName, regex) {
    if (regex.exec(inputName.value) == null) {
        inputName.classList.remove('valid');
        inputName.classList.add('invalid');
        inputName.valid = false;
    }
    else {
        inputName.classList.remove('invalid');
        inputName.classList.add('valid');
        inputName.valid = true;
    }
}
email.addEventListener('input', function(){
    expectInput(email, regexMail);
});

//capture des champs du formulaire
/* let contact = {};
function takeInputs() {
    contact.firstName = firstName.value;
    contact.lastName = lastName.value;
    contact.address = address.value;
    contact.city = city.value;
    contact.email = email.value;
} */

//crée un tableau de booléens true/false correspondant à la validité ou non de chaque champ
/* function capturerChamps() {
    validInputArray = [];
    for (let index = 0; index < 5; index++) {
       validInputArray.push(inputsArray[index].valid);
    }
} */

//déclenche la vérification des champs lors du click sur le bouton soumettre
/* let validButton = document.querySelector('form div#submit-btn input');
let isTrue = (currentValue) => currentValue === true;
function valider() {
        capturerChamps();
        if (validInputArray.every(isTrue) && totalPanier > 0) {
            takeInputs();
            createArray();
            tableauProduits.push(totalPanier);
            localStorage.setItem('tableauStorage', JSON.stringify(tableauProduits));
            localStorage.setItem('contact', JSON.stringify(contact));
            localStorage.setItem('products', JSON.stringify(totalArray));
            location.href = './pageConfirm.html';
        } else if (totalPanier === 0) {
            displayMessage('Votre panier est vide');
        } else {
            displayMessage('Impossible, vos champs ne sont pas correctement remplis');
        }
}
validButton.addEventListener('click', valider);
validButton.addEventListener('click', function(event) {
    event.preventDefault();
  }, false); */