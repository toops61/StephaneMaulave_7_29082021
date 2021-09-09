import React from 'react';
import Footer from './Footer';
import validator from 'validator';

export default class Profil extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pseudonyme: '',
            job: '',
            email: '',
            password: ''
        }
        this.rejectText = this.rejectText.bind(this);
        this.rejectPseudo = this.rejectPseudo.bind(this);
        this.rejectMail = this.rejectMail.bind(this);
        this.rejectPassword = this.rejectPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    <div className='profil__photo'></div>
                    <h1 className='profil__titre'>
                        {this.state.pseudonyme}, modifier vos infos
                    </h1>
                </div>
                <form className='connect-form' onSubmit={this.handleSubmit}>
                <div>
                        <label htmlFor='pseudonyme'>Pseudo</label>
                        <input type='text' name='pseudonyme' id='pseudonyme' className='' value={this.state.pseudonyme} onChange={this.rejectPseudo} minLength='2' maxLength='31' required />
                    </div>
                    <div>
                        <label htmlFor='job'>Emploi</label>
                        <input type='text' name='job' id='job' className='' value={this.state.job} onChange={this.rejectText} minLength='2' maxLength='50' />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' className='' onChange={this.rejectMail} minLength='3' maxLength='50' required />
                    </div>
                    <div>
                        <label htmlFor='password'>Mot de passe</label>
                        <input type='password' name='password' id='password' className='' onChange={this.rejectPassword} minLength='8' maxLength='32' required />
                    </div>
                    <button type='submit' id='submit-btn'>Modifier les infos</button>
                </form>
            </main>
            <Footer />
        </div>
        )
    }
}