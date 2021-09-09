import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  export default class ConnectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.rejectPseudo = this.rejectPseudo.bind(this)
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    rejectPseudo(e) {
        const regexText = new RegExp('[=;,`$&"()§≠…∞ø«¡¶{}“º%¬®†°‡∂ﬁƒ¬‹≈©◊*#—<>≤≥]');
        const name = e.target.name;
        const value = e.target.value;
        !regexText.test(value) ? this.setState({[name]: value}) : alert('ces caractères ne sont pas autorisés')
    }

    render() {
        return (
            <form className="connect-form">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id="email" value={this.state.email} onChange={this.rejectPseudo} minLength="3" maxLength="50" required />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name='password' id="password" minLength="3" maxLength="50" required />
                </div>
                <div>
                    <button type='submit' id="submit-btn">Valider</button>
                    <button id='subscribe-btn'><Link to="/subscribe">S'inscrire</Link></button>
                </div>
            </form>
            )
        }
}