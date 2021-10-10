import React from 'react';
//import { User } from '../../../backend/db/sequelize';
//import ReactDOM from 'react-dom';
import logo from '../assets/Groupomania_Logos/icon-left-font-decoupe.png';
//import imgProfil from '../assets/photo_profil.jpg';
import Footer from './Footer';
import { storeToLocal, recupLocal } from './Storage';

let user = {};
let messagesFetched = [];
let userPseudo;
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

    messagesFetched.forEach(element => {
        arrayDom.push(
            <div key={element.id}>
                <CommentCard
                    pseudo='Machin'
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
                    <p tabIndex='0'>{props.createdAt}</p>
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

const CommentPopup = () => {

    let classePop = 'message-pop';

    return (
        <div className={classePop} id='user-comment'>
            <div className='message-pop__field'>
                <div>
                    <div className='profil__photo'>
                        <img url={user.photoProfil} alt='profil' tabIndex='0' />
                    </div>
                    <h3 tabIndex='0'>{userPseudo}, c'est à vous !</h3>
                </div>
                <div className='message-pop__field__text' tabIndex='0'></div>
                <div className='message-pop__field__image' tabIndex='0'>Ajoutez une pièce jointe</div>
                <button type='submit' className='submit-btn' onClick={AddClass}>publier</button>
                <button type='submit' className='submit-btn' onClick={AddClass}>annuler</button>
            </div>
        </div>
    )
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
                            <img src={user.photoProfil} alt='profil' />
                        </div>
                        <span onClick={AddClass} tabIndex='0'>{userPseudo}, partagez votre story</span>
                    </div>
                    <BuildComments />
                    <CommentCard
                        pseudo='Machin'
                        title='Journée à la plage'
                        article='dfdsjkhfdshfkjdshfkjdhfk fdkjefg fdzhf fjkdl fjk lf, jfdlzjf , fjds ,fe khfkdjs.'
                        createdAt='03/01/2021'
                        user_like='0'
                        likes='32'
                    />
                    {/*  <CommentCard
                        pseudo='Bidule'
                        titre='Enfin vacciné'
                        article='fds fdf fdsfdf hd odj  jfds , fjdsfj f,f fds jf,dzf jkf .'
                        date='28/08/2021'
                    />
                    <CommentCard
                        name='Truc much'
                        titre='Fin des vacances, on retourne bosser !'
                        article='gfhdlkgh fdhfjk fkld f fdlskhf f fdhsfkjhkd ffjkdh. dfdkjfh fdkj fkds fkd fhdkjh fd hfkdjh fkjdfkdfkdsjkfdkf  hkfjdhsfhkds.
                    fdshflkds
                    fdslfhkdsjhfkdhfjkdhfkjd. hydysioue
                    dfdfdsf fdfdf
                    Trerrekl fdsfdsfdsf.
                    mlkhfdslkhfdh fkdh fk fkjhdsk jdfk.'
                        date='07/09/2021'
                        aime='200'
                    /> */}
                </div>
                <div>
                    <img src={logo} alt='Groupomania' tabIndex='0' />
                </div>
                <Footer />
            </main>
        )
    }
}