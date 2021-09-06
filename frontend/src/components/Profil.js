import Footer from './Footer';

const Profil = () => {
    return (
        <div>
            <main>
                <div className='profil'>
                    <div className='profil__photo'></div>
                    <h1 className='profil__titre'>
                        Votre profil
                    </h1>
                </div>
                <form className='connect-form'>
                    <div>
                        <label htmlFor='firstName'>Prénom</label>
                        <input type='text' id='firstName' minLength='2' maxLength='31' required />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Nom</label>
                        <input type='text' id='lastName' minLength='2' maxLength='31' required />
                    </div>
                    <div>
                        <label htmlFor='pseudonyme'>Pseudo</label>
                        <input type='text' id='pseudonyme' minLength='2' maxLength='31' required />
                    </div>
                    <div>
                        <label htmlFor='job'>Emploi</label>
                        <input type='text' id='job' minLength='2' maxLength='50' />
                    </div>
                    <div>
                        <label htmlFor='birthday'>Date de Naissance</label>
                        <input type='date' id='birthday' min='1900-01-01' max='2003-01-01' required />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' minLength='3' maxLength='50' required />
                    </div>
                    <div>
                        <label htmlFor='password'>Mot de passe</label>
                        <input type='password' id='password' minLength='3' maxLength='50' required />
                    </div>
                    <button type='submit' id='submit-btn'>modifier les infos</button>
                </form>
            </main>
            <Footer />
        </div>
        )
}

export default Profil;