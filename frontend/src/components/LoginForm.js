import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import logoGroupomania from '../assets/Groupomania_Logos/icon-left-font-monochrome-pink.png';

//fonction update du local storage et du tableau des produits
function storeToLocal(where, what) {
    localStorage.setItem(where, JSON.stringify(what));
}

//API fetch requete POST pour formulaire
function loginSubmit(data) {

    const url = 'http://localhost:4200/login';
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
            const pseudo = value.data.pseudo;
            const photoProfil = value.data.photoProfil ? value.data.photoProfil : 'http://localhost:4200/images/default-avatar.png'
            alert(`Bienvenue ${pseudo}`);
            localStorage.clear();
            const userLogged = {
                id: value.data.id,
                pseudo: pseudo,
                photoProfil: photoProfil,
                token: value.token
            }
            storeToLocal('user', userLogged);
            window.location.reload();
        })
        .catch(function (error) {
            console.log('erreur !' + error);
        })
}

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.rejectMail = this.rejectMail.bind(this);
        this.rejectPassword = this.rejectPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const data = JSON.stringify(this.state);
        const inputsArray = document.querySelectorAll('form div input');
        const validArray = [];
        for (let index = 0; index < inputsArray.length; index++) {
            const element = inputsArray[index];
            if (element.className === 'invalid') {
                this.props.alertToggle('Vous n\'avez pas correctement rempli les champs')
            } else {
                validArray.push(element.name);
            }
        };
        if (validArray.length === inputsArray.length) {
            loginSubmit(data);
        };
    }

    render() {
        return (
            <section className='login'>
                <form className='login__form' onSubmit={this.handleSubmit}>
                    <div className='login__form__field'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' className='' onChange={this.rejectMail} minLength='3' maxLength='50' autoComplete='email' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input type='password' name='password' id='password' className='' onChange={this.rejectPassword} minLength='8' maxLength='128' autoComplete='current-password' required />
                    </div>
                    <div className='login__form__field'>
                        <button type='submit' id='submit-btn' className='submit-btn'>Valider</button>
                        <button id='subscribe-btn' className='submit-btn' onClick={(e) => { e.preventDefault() }}><Link to='/subscribe'>S'inscrire</Link></button>
                    </div>
                </form>
                <div className='login__logo' tabIndex='0'>
                    <img src={logoGroupomania} alt='logo' />
                </div>
            </section>
        )
    }
}