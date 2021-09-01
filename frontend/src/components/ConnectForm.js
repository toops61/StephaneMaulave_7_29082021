const ConnectForm = () => {
    return (
        <form className="connect-form">
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" minLength="3" maxLength="50" required />
            </div>
            <div>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" minLength="3" maxLength="50" required />
            </div>
            <div>
                <button type='submit' id="submit-btn">Valider</button>
                <button id='subscribe-btn'>S'inscrire</button>
            </div>
        </form>
        )
}

export default ConnectForm;