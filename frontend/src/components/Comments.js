import React from 'react';
//import { User } from '../../../backend/db/sequelize';
//import ReactDOM from 'react-dom';
import logo from '../assets/Groupomania_Logos/icon-left-font-decoupe.png';
//import imgProfil from '../assets/photo_profil.jpg';
import Footer from './Footer';
import { storeToLocal, recupLocal } from './Storage';

let messagesFetched = [];
const userStored = JSON.parse(localStorage.getItem('user'));
let messagesStored;
const arrayDom = [];

if (localStorage.messages) {
    messagesFetched = JSON.parse(localStorage.getItem('messages'));
} else if (localStorage.user) {
    fetchMessages();
}

function fetchMessages() {

    const url = 'http://localhost:4200/commentsPage';
    //let loginUser = {};

    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userStored.token
        }
    };

    fetch(url, request)
        .then(function (rep) {
            let recupMessages = rep.json();
            return recupMessages;
        })
        .then(function (value) {
            messagesFetched = value;
            storeToLocal('messages', value);
            return messagesFetched;
        })
        .catch(function (error) {
            console.log('erreur !' + error);
        })
}

function BuildComments() {
    arrayDom.length = 0;
    messagesFetched.forEach(element => {
        arrayDom.push(
            <div key={element.id}>
                <CommentCard
                    pseudo={element.user_pseudo}
                    title={element.title}
                    article={element.article}
                    createdAt={element.createdAt}
                    user_like='0'
                    likes={element.likes}
                />
            </div>
        )
    });
    return (
        <div>
            {arrayDom}
        </div>
    )
}



const CommentCard = props => {

    return (
        <div className='comments__card'>
            <div className='comments__card__profil'>
                <div>
                    <h3 tabIndex='0'>{props.pseudo}</h3>
                    <p tabIndex='0'>{props.createdAt.split('T')[0]} à {props.createdAt.split('T')[1].split('.')[0]}</p>
                </div>
                <h4 tabIndex='0'>{props.title}</h4>
            </div>
            <div className='comments__card__field'>
                <div className='publication-photo'>photo publication</div>
                <p tabIndex='0'>{props.article}</p>
                <div>
                    <div className='users__likes' tabIndex='0'>{props.likes}</div>
                </div>
                <div className='user-comment'>
                    <div className='user-comment__like' tabIndex='0'>Vous aimez</div>
                    <div className='user-comment__btn' tabIndex='0'>commentez ici</div>
                </div>
            </div>
        </div>
    )
}

class CommentPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            USERS_id: userStored.id,
            pseudo: userStored.pseudo,
            title: '',
            article: '',
            attachment: '',
            user_like: 0,
            user_comment: '',
            likes: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();


        //loginSubmit(data, this.props);

    }
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className='message-pop' id='user-comment'>
                <div className='message-pop__field'>
                    <div>
                        <div className='profil__photo'>
                            <img url={userStored.photoProfil} alt='profil' tabIndex='0' />
                        </div>
                        <h3 tabIndex='0'>{userStored.pseudo}, c'est à vous !</h3>
                    </div>
                    <form className='message-pop__field__form' onSubmit={this.handleSubmit}>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='title'>Titre</label>
                            <input type='text' name='title' max='60' value={this.state.title} onChange={this.handleChange} />
                        </div>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='article'></label>
                            <textarea name="article" rows="5" cols="33" value={this.state.article} onChange={this.handleChange}></textarea>
                        </div>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='article'>Ajoutez une pièce jointe</label>
                            <input type='file' className='message-pop__field__image' tabIndex='0' accept='image/png, image/jpg, image/jpeg image/webp' value={this.state.attachment} onChange={this.handleChange} />
                        </div>
                        <div id='image-field'>
                            <button type='submit' className='submit-btn' onClick={AddClass}>publier</button>
                            <button type='submit' className='submit-btn' onClick={AddClass}>annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const AddClass = () => {
    document.getElementById('user-comment').classList.toggle('appear');
}

window.onscroll = () => {
    if (window.location.pathname === '/commentsPage') {
        window.scrollY > 135 ?
            document.getElementById('arrow-up').classList.add('appears') : document.getElementById('arrow-up').classList.remove('appears')
    }
}

class ArrowUp extends React.Component {
    arrowUp() {
        window.scroll(0, 0);
    }

    render() {
        return (
            <div id='arrow-up' tabIndex='0' className='arrow-up' onClick={this.arrowUp}>
                <div></div>
            </div>
        )
    }
}

export default class CommentPage extends React.Component {


    render() {
        return (
            <main>
                <ArrowUp />
                <CommentPopup />
                <div className='comments'>
                    <div className='comments__btn'>
                        <div className='profil__photo mini' tabIndex='0'>
                            <img src={userStored.photoProfil} alt='profil' />
                        </div>
                        <span onClick={AddClass} tabIndex='0'>{userStored.pseudo}, partagez votre story</span>
                    </div>
                    <BuildComments />
                </div>
                <div>
                    <img src={logo} alt='Groupomania' tabIndex='0' />
                </div>
                <Footer />
            </main>
        )
    }
}