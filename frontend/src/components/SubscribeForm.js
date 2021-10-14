import React from "react";
/* import { render } from "react-dom"; */
import validator from 'validator';
import logoGroupomania from '../assets/Groupomania_Logos/icon-left-font-monochrome-pink.png';
import { storeToLocal, recupLocal } from './Storage';
//import axios from 'axios';
//import { Link } from "react-router-dom";
//import alertPopup from './AlertPopup';

/* function previewFile() {
    const file = document.querySelector('#photoProfil').files[0];
    const reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
    }
    console.log(reader.result)
} */

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
            storeToLocal('messages', value);
            props.setComments(value);
            props.setIsLoading(props.isLoading);
        })
        .catch(function (error) {
            console.log('erreur !' + error);
        })
}

//API fetch requete POST pour formulaire
function subscribeSubmit(data, props) {
    const url = 'http://localhost:4200/subscribe';
    //const file = document.querySelector('#photoProfil').files[0];
    //let loginUser = {};

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
            //console.log(value);
            const pseudo = value.data.pseudo;
            const photoProfil = value.data.photoProfil ? value.data.photoProfil : 'http://localhost:4200/images/default-avatar.png';
            pseudo === undefined ? props.alertToggle(`il y a eu une erreur, le mail ou le pseudo existe déjà : ${value.message}`) : props.confirmToggle(`Bienvenue ${pseudo}`);
            props.setUser(value.data);
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
            console.log('erreur ' + error);
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
            photoProfil: 'http://localhost:4200/images/default-avatar.png',
            isAdmin: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.rejectText = this.rejectText.bind(this);
        this.rejectPseudo = this.rejectPseudo.bind(this);
        this.rejectMail = this.rejectMail.bind(this);
        this.rejectPassword = this.rejectPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        //this.onClickHandler = this.onClickHandler.bind(this);
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
            this.props.alertToggle('ces caractères ne sont pas autorisés');
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
            this.props.alertToggle('ces caractères ne sont pas autorisés');
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

    onChangeHandler(e) {
        this.setState({ file: e.target.files[0] })
    }

    /* onClickHandler = () => {
        const imageData = new FormData()
        imageData.append('file', this.state.photoProfil)
        axios.post("http://localhost:4200/subscribe", imageData)
            .then(res => { // then print response status
                console.log(res.statusText)
            })
            .catch(error => {
                console.log('il y a eu une erreur: ' + error)
            })
    } */

    handleSubmit(e) {
        e.preventDefault();
        const data = JSON.stringify(this.state);
        this.props.setIsLoading(!this.props.isLoading);
        //data.append(this.state);
        const inputsArray = document.querySelectorAll('form div input');
        const validArray = [];
        for (let index = 0; index < inputsArray.length; index++) {
            const element = inputsArray[index];
            if (element.className === 'invalid') {
                this.props.alertToggle('le mot de passe doit contenir au moins huit caractères, une minuscule, une majuscule, un chiffre et un caractère spécial')
            } else {
                validArray.push(element.name);
            }
        };
        if (validArray.length === inputsArray.length && inputsArray[6].value === inputsArray[7].value) {
            subscribeSubmit(data, this.props);
            //<Link to="/commentsPage"></Link>
        }
    }

    render() {
        return (
            <section className='login'>
                <form className='login__form' onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
                    <div className='login__form__field'>
                        <label htmlFor='lastname'>Nom</label>
                        <input type='text' name='lastname' id='lastname' className='' value={this.state.lastname} onChange={this.rejectText} minLength='2' maxLength='31' autoComplete='family-name' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='firstname'>Prénom</label>
                        <input type='text' name='firstname' id='firstname' className='' value={this.state.firstName} onChange={this.rejectText} minLength='2' maxLength='31' autoComplete='given-name' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='pseudo'>Pseudo</label>
                        <input type='text' name='pseudo' id='pseudo' className='' value={this.state.pseudo} onChange={this.rejectPseudo} minLength='2' maxLength='31' autoComplete='username' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='birthdate'>Date de Naissance</label>
                        <input type='date' name='birthdate' id='birthdate' className='' value={this.state.birthdate} onChange={this.handleChange} min='1900-01-01' max='2006-01-01' autoComplete='bday' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='job'>Emploi</label>
                        <input type='text' name='job' id='job' className='' value={this.state.job} onChange={this.rejectText} minLength='2' maxLength='50' autoComplete='organization-title' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' className='' onChange={this.rejectMail} minLength='3' maxLength='50' autoComplete='email' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input type='password' name='password' id='password' className='' onChange={this.rejectPassword} minLength='8' maxLength='128' autoComplete='new-password' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='password'>Confirmez</label>
                        <input type='password' name='passwordconf' id='passwordconf' className='' onChange={this.rejectPassword} minLength='8' maxLength='128' autoComplete='new-password' required />
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