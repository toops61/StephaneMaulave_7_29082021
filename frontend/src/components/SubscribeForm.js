import React from "react";
/* import { render } from "react-dom"; */

export default class SubscribeForm extends React.Component {
    constructor(props) {
        super(props)        
        
        this.state = {
            firstName: '',
            lastName: '',
            pseudonyme: '',
            job: '',
            birthday: '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.rejectText = this.rejectText.bind(this)
        this.rejectPseudo = this.rejectPseudo.bind(this)
        this.rejectMail = this.rejectMail.bind(this)
        this.rejectPassword = this.rejectPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
        handleChange(e) {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({
                [name]: value
            })
        }

        rejectText(e) {
            const regexText = new RegExp('[0-9/=;,`:$&"()§!@≠…∞€ø«¡¶{}“º%µ¬®†°π‡∂ﬁƒ¬‹≈©◊£*#ë—<>≤≥]');
            const name = e.target.name;
            const value = e.target.value;
            !regexText.test(value) ? this.setState({[name]: value}) : alert('ces caractères ne sont pas autorisés')
        }

        rejectPseudo(e) {
            const regexText = new RegExp('[=;,`$&"()§≠…∞ø«¡¶{}“º%¬®†°‡∂ﬁƒ¬‹≈©◊*#—<>≤≥]');
            const name = e.target.name;
            const value = e.target.value;
            !regexText.test(value) ? this.setState({[name]: value}) : alert('ces caractères ne sont pas autorisés')
        }

        rejectMail(e) {
            const regexMail = new RegExp('^[a-z0-9]+([_|.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|.|-]­{1}[a-z0-9]+)*[.]{1}[a-z]{2,6}$');
            const name = e.target.name;
            const value = e.target.value;
            !regexMail.test(value) ? this.setState({[name]: value}) : alert('il faut entrer un email')
        }

        rejectPassword(e) {
            const regexPassword = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$');
            const name = e.target.name;
            const value = e.target.value;
            !regexPassword.test(value) ? this.setState({[name]: value}) : alert('le mot de passe doit faire entre 8 et 32 caractères et doit contenir au moins un chiffre, une majuscule et un caractère spécial')
        }

        handleSubmit(e) {
            e.preventDefault();
            const data = JSON.stringify(this.state);
            console.log(data);
        }

        render () {
            return (
                <form className='connect-form' onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='firstName'>Prénom</label>
                        <input type='text' name='firstName' id='firstName' value={this.state.firstName} onChange={this.rejectText} minLength='2' maxLength='31' required />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Nom</label>
                        <input type='text' name='lastName' id='lastName' value={this.state.lastName} onChange={this.rejectText} minLength='2' maxLength='31' required />
                    </div>
                    <div>
                        <label htmlFor='pseudonyme'>Pseudo</label>
                        <input type='text' name='pseudonyme' id='pseudonyme' value={this.state.pseudonyme} onChange={this.rejectPseudo} minLength='2' maxLength='31' required />
                    </div>
                    <div>
                        <label htmlFor='job'>Emploi</label>
                        <input type='text' name='job' id='job' value={this.state.job} onChange={this.rejectText} minLength='2' maxLength='50' />
                    </div>
                    <div>
                        <label htmlFor='birthday'>Date de Naissance</label>
                        <input type='date' name='birthday' id='birthday' value={this.state.birthday} onChange={this.handleChange} min='1900-01-01' max='2003-01-01' required />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' value={this.state.email} onChange={this.rejectPseudo} onSubmit={this.rejectMail} minLength='3' maxLength='50' required />
                    </div>
                    <div>
                        <label htmlFor='password'>Mot de passe</label>
                        <input type='password' name='password' id='password' value={this.state.password} onChange={this.rejectPassword} minLength='3' maxLength='50' required />
                    </div>
                    <button type='submit' id='submit-btn'>S'inscrire</button>
                </form>
            )       
        }
}