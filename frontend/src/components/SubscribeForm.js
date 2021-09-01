const SubscribeForm = () => {
    return (
    <form className="connect-form">
        <div>
            <label htmlFor="firstName">Prénom</label>
            <input type="text" id="firstName" minLength="2" maxLength="31" required />
        </div>
        <div>
            <label htmlFor="lastName">Nom</label>
            <input type="text" id="lastName" minLength="2" maxLength="31" required />
        </div>
        <div>
            <label htmlFor="pseudonyme">Pseudo</label>
            <input type="text" id="pseudonyme" minLength="2" maxLength="31" required />
        </div>
        <div>
            <label htmlFor="job">Emploi</label>
            <input type="text" id="job" minLength="2" maxLength="50" />
        </div>
        <div>
            <label htmlFor="birthday">Date de Naissance</label>
            <input type="date" id="birthday" min="1900-01-01" max="2003-01-01" required />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" minLength="3" maxLength="50" required />
        </div>
        <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" minLength="3" maxLength="50" required />
        </div>
        <button type='submit' id="submit-btn">S'inscrire</button>
    </form>
    )
}

//formulaire vérification des champs
const inputsArray = document.querySelectorAll('form input');
const firstName = inputsArray[0];
const lastName = inputsArray[1];
const pseudonyme = inputsArray[2];
const job = inputsArray[3];
const birthday = inputsArray[4];
const email = inputsArray[5];
/* const password = inputsArray[6]; */

const regexText = /[0-9/=;`$&"()§!@≠…∞€ø«¡¶{}“º%µ¬®†°π‡∂ﬁƒ¬‹≈©◊ß£*#ë—<>≤≥]/;
const regexAdress = /[/=;`$&()§!@≠…∞€ø«¡¶{}ºµ¬%®†π‡∂ﬁƒ¬‹≈©◊ß£*ë—<>≤≥]/;
const regexMail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;

export default SubscribeForm;