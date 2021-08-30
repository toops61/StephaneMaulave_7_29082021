const SubscribeForm = () => {
    return (
    <form className="connect-form">
        <div>
            <label for="firstName">Prénom</label>
            <input type="text" id="firstName" minlength="2" maxlength="31" required />
        </div>
        <div>
            <label for="lastName">Nom</label>
            <input type="text" id="lastName" minlength="2" maxlength="31" required />
        </div>
        <div>
            <label for="pseudonyme">Pseudo</label>
            <input type="text" id="pseudonyme" minlength="2" maxlength="31" required />
        </div>
        <div>
            <label for="job">Emploi</label>
            <input type="text" id="job" minlength="2" maxlength="50" />
        </div>
        <div>
            <label for="birthday">Date de Naissance</label>
            <input type="date" id="birthday" min="1900-01-01" max="2003-01-01" required />
        </div>
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" minlength="3" maxlength="50" required />
        </div>
        <div>
            <label for="password">Mot de passe</label>
            <input type="password" id="password" minlength="3" maxlength="50" required />
        </div>
        <button type='submit' id="submit-btn">S'inscrire</button>
    </form>
    )
}

export default SubscribeForm;