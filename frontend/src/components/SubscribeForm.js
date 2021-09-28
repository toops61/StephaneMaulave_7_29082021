import React from "react";
/* import { render } from "react-dom"; */
import validator from 'validator';
import logoGroupomania from '../assets/Groupomania_Logos/icon-left-font-monochrome-pink.png';

//fonction update du local storage et du tableau des produits
function storeToLocal(where, what) {
    localStorage.setItem(where, JSON.stringify(what));
}

//API fetch requete POST pour formulaire
function subscribeSubmit(data) {
    const url = 'http://localhost:4200/subscribe';
    //let loginUser = {};

    let request = {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url, request)
        .then(function (rep) {
            let userProfil = rep.json();
            return userProfil;
        })
        .then(function (value) {
            //console.log(value);
            const pseudo = value.data.pseudo;
            alert(`Bienvenue ${pseudo}`);
            localStorage.clear();
            const userLogged = {
                id: value.data.id,
                pseudo: pseudo,
                token: value.token
            }
            storeToLocal('user', userLogged);
        })
        .catch(function (error) {
            console.log('erreur !' + error);
        })
}

export default class SubscribeForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lastname: '',
            firstname: '',
            pseudo: '',
            birthdate: '',
            job: '',
            email: '',
            password: '',
            isAdmin: false
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
            this.setState({ [name]: value.replace(/ /g, "_") });
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
            this.setState({ [name]: value.replace(/ /g, "_") });
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
            this.setState({ [name]: value });
        } else {
            e.target.className = 'invalid';
            this.setState({ [name]: '' });
        };
    }

    rejectPassword(e) {
        /* const regexPassword = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$'); */
        const regexPassword = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[%@$&#?]).{8,32}$');
        const name = e.target.name;
        const value = e.target.value;
        if (regexPassword.test(value)) {
            this.setState({ [name]: value });
            e.target.className = 'valid'
        } else {
            e.target.className = 'invalid';
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
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
        //data.photoProfil = inputsArray[7].files[0];
        if (validArray.length === inputsArray.length) { subscribeSubmit(JSON.stringify(data)) };
    }

    render() {
        return (
            <section className='login'>
                <form className='login__form' onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
                    <div className='login__form__field'>
                        <label htmlFor='lastname'>Nom</label>
                        <input type='text' name='lastname' id='lastname' className='' value={this.state.lastname} onChange={this.rejectText} minLength='2' maxLength='31' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='firstname'>Prénom</label>
                        <input type='text' name='firstname' id='firstname' className='' value={this.state.firstName} onChange={this.rejectText} minLength='2' maxLength='31' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='pseudo'>Pseudo</label>
                        <input type='text' name='pseudo' id='pseudo' className='' value={this.state.pseudo} onChange={this.rejectPseudo} minLength='2' maxLength='31' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='birthdate'>Date de Naissance</label>
                        <input type='date' name='birthdate' id='birthdate' className='' value={this.state.birthdate} onChange={this.handleChange} min='1900-01-01' max='2006-01-01' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='job'>Emploi</label>
                        <input type='text' name='job' id='job' className='' value={this.state.job} onChange={this.rejectText} minLength='2' maxLength='50' />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' className='' onChange={this.rejectMail} minLength='3' maxLength='50' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input type='password' name='password' id='password' className='' onChange={this.rejectPassword} minLength='8' maxLength='32' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='photoProfil'>Photo profil</label>
                        <input type='file' name='photoProfil' id='photoProfil' onChange={this.onChangeHandler} className='' accept='image/png, image/jpg, image/jpeg image/webp' />
                    </div>
                    <button type='submit' id='submit-btn' className='submit-btn'>S'inscrire</button>
                </form>
                <div className='login__logo' tabIndex='0'>
                    <img src={logoGroupomania} alt='logo' />
                </div>
            </section>
        )
    }
}