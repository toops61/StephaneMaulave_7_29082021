import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import logoGroupomania from '../assets/Groupomania_Logos/icon-left-font-monochrome-pink.png';
import { storeToLocal, recupLocal } from './Storage';

//API fetch requete GET pour récupérer les messages
function fetchMessages(token, props) {

    const url = 'http://localhost:4200/commentsPage';

    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    fetch(url, request)
        .then(function (rep) {
            let recupMessages = rep.json();
            return recupMessages;
        })
        .then(function (value) {
            props.setComments(value);
            props.setIsLoading(props.isLoading);
        })
        .catch(function (error) {
            console.log('erreur ! ' + error);
        })
}

//API fetch requete POST se connecter et récupérer les données user
function loginSubmit(data, props) {
    const url = 'http://localhost:4200/login';

    let request = {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url, request)
        .then(rep => {
            let userProfil = rep.json();
            return userProfil;
        })
        .then(value => {
            const pseudo = value.data.pseudo;
            const photoProfil = value.data.photoProfil ? value.data.photoProfil : 'http://localhost:4200/images/default-avatar.png';
            props.confirmToggle(`Bienvenue ${pseudo}`);
            const { password, email, createdAt, updatedAt, ...userRep } = value.data;
            props.setUser(userRep);
            const UserContext = React.createContext(value.data);
            localStorage.clear();
            const userLogged = {
                id: value.data.id,
                pseudo: pseudo,
                photoProfil: photoProfil,
                token: value.token
            }
            storeToLocal('user', userLogged);
            fetchMessages(value.token, props);
            return (userLogged);
        })
        .catch(error => {
            props.setIsLoading(props.isLoading);
            props.alertToggle('Vous n\'avez pas correctement rempli les champs');
            console.log('erreur ! ' + error);
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
        const regexPassword = new RegExp('^(?=.*[0-9])(?=.*[a-zÞ-öø-ÿ])(?=.*[A-ZÀ-ÖØ-Ý])(?=.*[^0-9a-zÞ-öø-ÿA-ZÀ-ÖØ-Ý ]).{8,128}$');
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
        this.props.setIsLoading(!this.props.isLoading);
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
            loginSubmit(data, this.props);
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