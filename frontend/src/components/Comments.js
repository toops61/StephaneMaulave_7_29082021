import React from 'react';
//import { User } from '../../../backend/db/sequelize';
//import ReactDOM from 'react-dom';
import logo from '../assets/Groupomania_Logos/icon-left-font-decoupe.png';
//import imgProfil from '../assets/photo_profil.jpg';
import Footer from './Footer';
//import { storeToLocal, recupLocal } from './Storage';

const arrayDom = [];

/* function fetchMessages(props) {

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
            //this.setComments(value);
            return messagesFetched;
        })
        .catch(function (error) {
            console.log('erreur !' + error);
        })
} */

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

//API fetch requete POST pour formulaire
function commentSubmit(data, props) {
    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
    const url = 'http://localhost:4200/commentsPage';
    const messagesFetched = props.comments;
    //const file = document.querySelector('#photoProfil').files[0];

    let request = {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userStored.token
        }
    };

    fetch(url, request)
        .then(rep => {
            let userComment = rep.json();
            return userComment;
        })
        .then(value => {
            props.confirmToggle(value.message);
            messagesFetched.push(value.data);
            localStorage.setItem('messages', JSON.stringify(messagesFetched));
        })
        .catch(error => {
            console.log('erreur ' + error);
        })
}

function BuildComments(props) {
    arrayDom.length = 0;
    const messagesFetched = props.comments;
    if (!messagesFetched) { return props.setIsLoading(!props.isLoading) }
    messagesFetched.forEach(element => {
        arrayDom.push(
            <div key={element.id}>
                <CommentCard
                    id={element.id}
                    pseudo={element.user_pseudo}
                    USERS_id={element.USERS_id}
                    title={element.title}
                    article={element.article}
                    createdAt={element.createdAt}
                    user_like='0'
                    likes={element.likes}
                    modify={element.USERS_id === props.user.id || props.user.isAdmin ? true : false}
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

function AddComment() {

    console.log('ajout commentaire');
}

function CommentCard(props) {
    //const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;

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
                    <div>
                        {props.modify ? <button onClick={AddClass} className='user-comment__btn'>modifiez votre publication</button> : null}
                    </div>
                    <div className='user-comment__btn' tabIndex='0' onClick={AddComment}>commentez ici</div>
                </div>
            </div>
        </div>
    )
}

class CommentPopup extends React.Component {
    constructor(props) {
        super(props);
        const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : this.props.user;
        this.state = {
            USERS_id: this.props.user ? this.props.user.id : userStored.id,
            user_pseudo: this.props.user ? this.props.user.pseudo : userStored.pseudo,
            title: '',
            article: '',
            attachment: '',
            user_like: 0,
            user_comment: '',
            likes: 0
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        document.getElementById('user-comment').classList.toggle('appear');
        const data = this.state;
        commentSubmit(JSON.stringify(data), this.props);
    }
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    onChangeHandler(e) {
        this.setState({ file: e.target.files[0] })
    }

    render() {
        return (
            <div className='message-pop' id='user-comment'>
                <div className='message-pop__field'>
                    <div>
                        <div className='profil__photo'>
                            <img url={this.props.user ? this.props.user.photoProfil : this.userStored.photoProfil} alt='profil' tabIndex='0' />
                        </div>
                        <h3 tabIndex='0'>{this.props.user ? this.props.user.pseudo : this.userStored.pseudo}, c'est à vous !</h3>
                    </div>
                    <form className='message-pop__field__form' onSubmit={this.handleSubmit}>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='title'>Titre</label>
                            <input type='text' name='title' max='60' value={this.state.title} onChange={this.handleChange} required />
                        </div>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='article'></label>
                            <textarea name="article" rows="5" cols="33" value={this.state.article} onChange={this.handleChange} required ></textarea>
                        </div>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='file'>Ajoutez une pièce jointe</label>
                            <input type='file' className='message-pop__field__image' tabIndex='0' accept='image/png, image/jpg, image/jpeg image/webp' value={this.state.attachment} onChange={this.onChangeHandler} />
                        </div>
                        <div id='image-field'>
                            <button type='submit' className='submit-btn'>publier</button>
                            <button type='button' className='submit-btn' onClick={AddClass}>annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const AddClass = (e) => {
    e.preventDefault();
    document.getElementById('user-comment').classList.toggle('appear');
}

export default class CommentPage extends React.Component {
    /* constructor(props) {
        super(props);
        if (this.props.comments !== {}) {
            const messagesFetched = this.props.comments;
        }
        
    } */

    render() {

        return (
            this.props.comments ?
                <main>
                    <ArrowUp />
                    <CommentPopup
                        confirmVisible={this.props.confirmVisible}
                        confirmToggle={this.props.confirmToggle}
                        alertToggle={this.props.alertToggle}
                        user={this.props.user}
                        setUser={this.props.setUser}
                        comments={this.props.comments}
                        setComments={this.props.setComments}
                        isLoading={this.props.isLoading}
                        setIsLoading={this.props.setIsLoading}
                        isVisible={this.props.isVisible}
                        messagealert={this.props.messagealert}
                        setMessagealert={this.props.setMessagealert}
                    />

                    <div className='comments'>
                        <div className='comments__btn'>
                            <div className='profil__photo mini' tabIndex='0'>
                                <img src={this.props.user.photoProfil} alt='profil' />
                            </div>
                            <span onClick={AddClass} tabIndex='0'>{this.props.user.pseudo}, partagez votre story</span>
                        </div>
                        <BuildComments
                            confirmVisible={this.props.confirmVisible}
                            confirmToggle={this.props.confirmToggle}
                            alertToggle={this.props.alertToggle}
                            user={this.props.user}
                            setUser={this.props.setUser}
                            comments={this.props.comments}
                            setComments={this.props.setComments}
                            isLoading={this.props.isLoading}
                            setIsLoading={this.props.setIsLoading}
                            isVisible={this.props.isVisible}
                            messagealert={this.props.messagealert}
                            setMessagealert={this.props.setMessagealert}
                        />
                    </div>
                    <div>
                        <img src={logo} alt='Groupomania' tabIndex='0' />
                    </div>
                    <Footer />
                </main> : <div>problème de chargement</div>
        )
    }
}