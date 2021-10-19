//import imgProfil from '../assets/photo_profil.jpg';
import React from 'react';
import Footer from './Footer';
import validator from 'validator';
import { storeToLocal } from './Storage';

let userInfos;

function profile() {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user.id;
    const url = 'http://localhost:4200/user/' + id;
    //let loginUser = {};

    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
        }
    };

    fetch(url, request)
        .then(rep => {
            const userProfil = rep.json();
            return userProfil;
        })
        .then(value => {
            userInfos = value.data;
            //console.log(userInfos);
            return userInfos;
            /* const inputField = document.querySelectorAll('form input');
            inputField[1].value = userInfos.data.job;
            inputField[2].value = userInfos.data.firstname;
            inputField[3].value = userInfos.data.lastname;
            inputField[4].value = userInfos.data.birthdate; */
        })
        .catch(error => {
            console.log('erreur !' + error);
        })
}

//API fetch requete POST pour formulaire
function updateProfile(data) {
    const userStored = JSON.parse(localStorage.getItem('user'));;
    const url = 'http://localhost:4200/user/' + userStored.id;

    let request = {
        method: 'PUT',
        body: data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userStored.token
        }
    };

    fetch(url, request)
        .then(rep => {
            let userProfil = rep.json();
            return userProfil;
        })
        .then(value => {

            const pseudo = value.data.pseudo;
            if (pseudo !== userStored.pseudo) {
                userStored.pseudo = pseudo;
                storeToLocal('user', userStored);
            }
        })
        .catch(error => {
            console.log('erreur !' + error);
        })
}

function deleteProfile(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = 'http://localhost:4200/user/' + user.id;
    //let loginUser = {};

    let request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
        }
    };
    if (window.confirm('Voulez-vous supprimer votre profil ?')) {
        fetch(url, request)
            .then(() => {
                props.alertToggle('Votre profil a été supprimé !');
                localStorage.clear();
                //window.location.reload();
            })
            .catch(function (error) {
                console.log('erreur !' + error);
            })
    }
}

export default class Profil extends React.Component {

    constructor(props) {
        super(props)

        //const userFetched = JSON.parse(localStorage.getItem('user'));;
        this.state = {
            lastname: this.props.user.lastname,
            firstname: this.props.user.firstname,
            pseudo: this.props.user.pseudo,
            birthdate: this.props.user.birthdate,
            job: this.props.user.job,
            password: '',
            photoProfil: this.props.user.photoProfil
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

    handleSubmit(e) {
        e.preventDefault();
        const data = JSON.stringify(this.state);
        const inputsArray = document.querySelectorAll('form div input');
        const validArray = [];
        for (let index = 0; index < inputsArray.length; index++) {
            const element = inputsArray[index];
            if (element.className === 'invalid') {
                this.props.alertToggle('vos champs ne sont pas valides');
            } else {
                validArray.push(element.name);
            }
        };
        if (validArray.length === inputsArray.length && inputsArray[5].value === inputsArray[6].value) {
            updateProfile(data, this.props);
            this.props.confirmToggle('votre profil a été mis à jour');
        };
    }

    render() {
        return (
            <div>
                <main>
                    <div className='profil'>
                        <div>
                            <div className='profil__photo'>
                                <img src={this.state.photoProfil} alt='profil' />
                            </div>
                            <span><em>changer la photo</em></span>
                        </div>
                        <h1 className='profil__titre'>
                            {this.state.pseudo}, modifiez vos infos
                        </h1>
                    </div>
                    <form className='login__form' onSubmit={this.handleSubmit}>
                        <div className='login__form__field'>
                            <label htmlFor='pseudo'>Pseudo</label>
                            <input type='text' name='pseudo' id='pseudo' className='' value={this.state.pseudo} onChange={this.rejectPseudo} minLength='2' maxLength='31' autoComplete='username' />
                        </div>
                        <div className='login__form__field'>
                            <label htmlFor='job'>Emploi</label>
                            <input type='text' name='job' id='job' className='' value={this.state.job} onChange={this.rejectText} minLength='2' maxLength='50' autoComplete='organization-title' />
                        </div>
                        <div className='login__form__field'>
                            <label htmlFor='firstname'>Prénom</label>
                            <input type='text' name='firstname' id='firstname' className='' value={this.state.firstname} onChange={this.rejectText} minLength='2' maxLength='31' autoComplete='given-name' />
                        </div>
                        <div className='login__form__field'>
                            <label htmlFor='lastname'>Nom</label>
                            <input type='text' name='lastname' id='lastname' className='' value={this.state.lastname} onChange={this.rejectText} minLength='2' maxLength='31' autoComplete='family-name' />
                        </div>
                        <div className='login__form__field'>
                            <label htmlFor='birthdate'>Date de Naissance</label>
                            <input type='date' name='birthdate' id='birthdate' className='' value={this.state.birthdate} onChange={this.handleChange} min='1900-01-01' max='2006-01-01' autoComplete='bday' />
                        </div>
                        <div className='login__form__field'>
                            <label htmlFor='password'>Mot de passe</label>
                            <input type='password' name='password' id='password' className='' onChange={this.rejectPassword} minLength='8' maxLength='128' autoComplete='new-password' required />
                        </div>
                        <div className='login__form__field'>
                            <label htmlFor='password'>Confirmez</label>
                            <input type='password' name='passwordconf' id='passwordconf' className='' onChange={this.rejectPassword} minLength='8' maxLength='128' autoComplete='new-password' required />
                        </div>
                        <button type='submit' id='submit-btn' className='submit-btn'>Modifier les infos</button>
                        <button type='button' id='delete-btn' className='submit-btn' onClick={() => deleteProfile(this.props)}>Effacer le profil</button>
                    </form>
                </main>
                <Footer />
            </div>
        )
    }
}