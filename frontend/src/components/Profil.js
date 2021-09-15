import imgProfil from '../assets/photo_profil.jpg';
import React from 'react';
import Footer from './Footer';
import validator from 'validator';

export default class Profil extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: 'Bidule',
            lastName: 'Machin',
            pseudonyme: 'Toops61',
            job: 'web dev',
            birthday: '1986-02-16',
            email: 'utilisateur1@mail.com',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.rejectText = this.rejectText.bind(this);
        this.rejectPseudo = this.rejectPseudo.bind(this);
        this.rejectMail = this.rejectMail.bind(this);
        this.rejectPassword = this.rejectPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const year = value.substring(0, 4);
        this.setState({
            [name]: value
        });
        value !== null && year <= 2006 && year > 1900 ? e.target.className = 'valid' : e.target.className = 'invalid';
    }

    rejectText(e) {
        const regexText = new RegExp('[0-9/=;,`:$&"()§!@≠…∞€ø«¡¶{}“º%µ¬®†°π‡∂ﬁƒ¬‹≈©◊£*#ë—<>≤≥]');
        const name = e.target.name;
        const value = e.target.value;
        if (!regexText.test(value)) {
            this.setState({[name]: value.replace(/ /g, "_")});
            e.target.className = 'valid';
        } else {
            alert('ces caractères ne sont pas autorisés');
        };
    }

    rejectPseudo(e) {
        const regexText = new RegExp('[=;,`()§≠…∞ø«¡¶{}“º%¬®†°‡∂ﬁƒ¬‹≈©◊*#—<>≤≥]');
        const name = e.target.name;
        const value = e.target.value;
        if (!regexText.test(value)) {
            this.setState({[name]: value.replace(/ /g, "_")});
            e.target.className = 'valid';
        } else {
            alert('ces caractères ne sont pas autorisés');
        };
    }

    rejectMail(e) {
        const name = e.target.name;
        const value = e.target.value;
        const regexMail = new RegExp('[/=;,`:éàèîôû$&"()§!≠…∞€ø«¡¶{}“º%µ¬®†°π‡∂ﬁƒ¬‹≈©◊£*#ë—<>≤≥]');
        if (validator.isEmail(value) && !regexMail.test(value)) {
            e.target.className = 'valid';
            this.setState({[name]: value});
        } else {
            e.target.className = 'invalid';
            this.setState({[name]: ''});
        };
    }

    rejectPassword(e) {
        const regexPassword = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[%@$&#?]).{8,32}$');
        const name = e.target.name;
        const value = e.target.value;
        if (regexPassword.test(value)) {
            this.setState({[name]: value});
            e.target.className = 'valid'
         } else {
             e.target.className = 'invalid';
         };
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = JSON.stringify(this.state);
        const inputsArray = document.querySelectorAll('form div input');
        const validArray = [];
        for (let index = 0; index < inputsArray.length; index++) {
            const element = inputsArray[index];
            if (element.className === 'invalid') {
                alert('vos champs ne sont pas valides');
            } else {
                validArray.push(element.name);
            }
        };
        if (validArray.length === inputsArray.length) {console.log(data)};
    }

    render() {
    return (
        <div>
            <main>
                <div className='profil'>
                    <div>
                        <div className='profil__photo'>
                            <img src={imgProfil} alt='profil' />
                        </div>
                        <span><em>changer la photo</em></span>
                    </div>
                    <h1 className='profil__titre'>
                        {this.state.pseudonyme}, modifiez vos infos
                    </h1>
                </div>
                <form className='connect__form' onSubmit={this.handleSubmit}>
                    <div className='connect__form__field'>
                        <label htmlFor='pseudonyme'>Pseudo</label>
                        <input type='text' name='pseudonyme' id='pseudonyme' className='' value={this.state.pseudonyme} onChange={this.rejectPseudo} minLength='2' maxLength='31' required />
                    </div>
                    <div className='connect__form__field'>
                        <label htmlFor='job'>Emploi</label>
                        <input type='text' name='job' id='job' className='' value={this.state.job} onChange={this.rejectText} minLength='2' maxLength='50' />
                    </div>
                    <div className='connect__form__field'>
                        <label htmlFor='firstName'>Prénom</label>
                        <input type='text' name='firstName' id='firstName' className='' value={this.state.firstName} onChange={this.rejectText} minLength='2' maxLength='31' required />
                    </div>
                    <div className='connect__form__field'>
                        <label htmlFor='lastName'>Nom</label>
                        <input type='text' name='lastName' id='lastName' className='' value={this.state.lastName} onChange={this.rejectText} minLength='2' maxLength='31' required />
                    </div>
                    <div className='connect__form__field'>
                        <label htmlFor='birthday'>Date de Naissance</label>
                        <input type='date' name='birthday' id='birthday' className='' value={this.state.birthday} onChange={this.handleChange} min='1900-01-01' max='2006-01-01' required />
                    </div>
                    <div className='connect__form__field'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' className='' value={this.state.email} onChange={this.rejectMail} minLength='3' maxLength='50' required />
                    </div>
                    <div className='connect__form__field'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input type='password' name='password' id='password' className='' onChange={this.rejectPassword} minLength='8' maxLength='32' required />
                    </div>
                    <button type='submit' id='submit-btn' className='submit-btn'>Modifier les infos</button>
                </form>
            </main>
            <Footer />
        </div>
        )
    }
}