import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import logoGroupomania from '../assets/Groupomania_Logos/icon-left-font-monochrome-pink.png';

export default class ConnectForm extends React.Component {
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
                alert('vos champs ne sont pas valides');
            } else {
                validArray.push(element.name);
            }
        };
        if (validArray.length === inputsArray.length) { console.log(data) };
    }

    render() {
        return (
            <section className='connect'>
                <form className='connect__form' onSubmit={this.handleSubmit}>
                    <div className='connect__form__field'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' className='' onChange={this.rejectMail} minLength='3' maxLength='50' required />
                    </div>
                    <div className='connect__form__field'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input type='password' name='password' id='password' className='' onChange={this.rejectPassword} minLength='8' maxLength='32' required />
                    </div>
                    <div className='connect__form__field'>
                        <button type='submit' id='submit-btn' className='submit-btn'>Valider</button>
                        <button id='subscribe-btn' className='submit-btn' onClick={(e) => { e.preventDefault() }}><Link to='/subscribe'>S'inscrire</Link></button>
                    </div>
                </form>
                <div className='connect__logo' tabIndex='0'>
                    <img src={logoGroupomania} alt='logo' />
                </div>
            </section>
        )
    }
}