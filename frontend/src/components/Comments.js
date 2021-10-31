import React from 'react';
import logo from '../assets/Groupomania_Logos/icon-left-font-decoupe.png';
//import imgProfil from '../assets/photo_profil.jpg';
import Footer from './Footer';
//import { storeToLocal, recupLocal } from './Storage';

//API fetch requete POST pour formulaire
function commentSubmit(data, props) {
    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
    const url = 'http://localhost:4200/commentsPage';
    const messagesFetched = props.comments ? props.comments : [];
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
            //localStorage.setItem('messages', JSON.stringify(messagesFetched));
        })
        .catch(error => {
            console.log('erreur ' + error);
        })
}

//API fetch requete PUT pour formulaire
function commentUpdate(e, state) {
    if (e) { e.preventDefault() };
    const id = state.props ? state.props.id : state.id;
    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
    const url = 'http://localhost:4200/commentsPage/' + id;
    //const messagesFetched = props.comments ? props.comments : [];
    /* for (let ind = 0; ind < messagesFetched.length; ind++) {
        if (messagesFetched[ind].id === data.id) {
            messagesFetched.splice(ind, 1);
        }
    } */
    //const file = document.querySelector('#photoProfil').files[0];
    let modifiedComment = {
        id: id,
        title: state.title,
        article: state.article
    };

    let request = {
        method: 'PUT',
        body: JSON.stringify(modifiedComment),
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
            if (state.setArticleIsvisible) { state.setArticleIsvisible(!state.articleIsvisible) };
            state.props ? state.props.confirmToggle(value.message) : state.confirmToggle(value.message);
        })
        .catch(error => {
            console.log('erreur ' + error);
        })
}

function commentLike(props, likes, user_like) {
    const id = props.id;
    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
    const url = 'http://localhost:4200/commentsPage/' + id;
    let modifiedComment = {
        likes: likes,
        user_like: user_like
    };

    let request = {
        method: 'PUT',
        body: JSON.stringify(modifiedComment),
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
        .catch(error => {
            console.log('erreur ' + error);
        })
}

function deleteComment(props) {
    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
    const url = 'http://localhost:4200/commentsPage/' + props.id;

    let request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userStored.token
        }
    };
    if (window.confirm('Voulez-vous supprimer le message ?')) {
        fetch(url, request)
            .then(() => {
                props.alertToggle('Le message a été supprimé !');
                const messagesFetched = props.comments ? props.comments : [];
                for (let ind = 0; ind < messagesFetched.length; ind++) {
                    if (messagesFetched[ind].id === props.id) {
                        return messagesFetched.splice(ind, 1);
                    }
                }
            })
            .catch(function (error) {
                console.log('erreur !' + error);
            })
    }
}

function BuildComments(props) {
    const messagesFetched = props.comments ? props.comments : [];

    if (messagesFetched.length > 0) {
        var arrayDom = messagesFetched.map(message => {
            return (
                <div key={message.id + message.updatedAt}>
                    <CommentCard
                        {...message}
                        {...props}
                        pseudo={message.user_pseudo}
                        modify={message.USERS_id === props.user.id || props.user.isAdmin ? true : false}
                    />
                </div>
            )
        });
    }
    return (
        <div>
            {arrayDom}
        </div>
    )
}

function CommentCard(props) {
    const [like, setLike] = React.useState(props.user_like);
    const [likes, setLikes] = React.useState(props.likes);
    const [commentVisible, setCommentVisible] = React.useState(false);
    const [userComment, setUserComment] = React.useState('');
    const [title, setTitle] = React.useState(props.title);
    const [article, setArticle] = React.useState(props.article);
    const [articleIsvisible, setArticleIsvisible] = React.useState(false);

    function closeWindow() {
        setArticleIsvisible(!articleIsvisible)
    }

    function UpdateComment(state) {
        return (
            <section className='message-pop appear'>
                <div className='message-pop__field'>
                    <form className='message-pop__field__form' onSubmit={(e) => commentUpdate(e, state)} method="put" encType="multipart/form-data">
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='title'>Titre</label>
                            <input type='text' name='title' max='100' value={state.title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='article'></label>
                            <textarea name="article" rows="5" cols="33" value={state.article} onChange={(e) => setArticle(e.target.value)} required></textarea>
                        </div>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='file'>Ajouter une pièce jointe</label>
                            <input type='file' className='message-pop__field__image' tabIndex='0' accept='image/png, image/jpg, image/jpeg image/webp' />
                        </div>
                        <button type='submit' className='submit-btn'>envoyer</button>
                        <button type='button' className='submit-btn' onClick={closeWindow}>annuler</button>
                    </form>
                </div>
            </section>
        )
    }

    function addLike() {
        setLike(!like);
        const totalLikes = like ? likes - 1 : likes + 1;
        setLikes(totalLikes);
        commentLike(props, totalLikes, !like);
    }

    function AddUserComment(e) {
        e.preventDefault();
        setCommentVisible(!commentVisible);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = e.target[0].value;
        setCommentVisible(!commentVisible);
        setUserComment(userComment + ' ' + data);
    }

    function modifyArticle() {
        setArticleIsvisible(!articleIsvisible);
    }

    return (
        <div className='comments__card'>
            {articleIsvisible ? <UpdateComment articleIsvisible={articleIsvisible} setArticleIsvisible={setArticleIsvisible} likes={likes} title={title} setTitle={setTitle} article={article} setArticle={setArticle} props={props} /> : null}
            <div className={commentVisible ? 'userComment-popup appear' : 'userComment-popup'}>
                <form className='userComment-popup__field' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='userComment'></label>
                        <textarea rows="5" cols="33" required></textarea>
                    </div>
                    <button type='submit' className='submit-btn'>publier</button>
                    <button type='submit' className='submit-btn' onClick={AddUserComment}>annuler</button>
                </form>
            </div>
            <div className='comments__card__profil'>
                <div>
                    <h3 tabIndex='0'>{props.pseudo}</h3>
                    {props.updatedAt !== props.createdAt ? <p tabIndex='0'>modifié le {props.updatedAt.split('T')[0]} à {props.updatedAt.split('T')[1].split('.')[0]}</p> : <p tabIndex='0'>créé le {props.createdAt.split('T')[0]} à {props.createdAt.split('T')[1].split('.')[0]}</p>}
                </div>
                <h4 tabIndex='0'>{title}</h4>
            </div>
            <div className='comments__card__field'>
                {props.attachment ? <div className='publication-photo'>
                    <img src={props.attachment} alt='partage' />
                </div> : null}
                {props.linkURL ?
                    <video className='publication-video' controls>
                        <source src={props.linkURL} type='video'></source>
                    </video> : null}
                <p tabIndex='0'>{article}</p>
                <div className='comments__card__field__answer'>
                    <h4 tabIndex='0'>commentaires: </h4>
                    <p tabIndex='0'>{userComment}</p>
                    <div>
                        <div className='users__likes' tabIndex='0'>
                            <span>{likes}</span>
                        </div>
                    </div>
                </div>
                <div className='user-comment'>
                    <div className={like ? 'user-comment__like__true' : 'user-comment__like'} tabIndex='0' onClick={() => addLike(props)}>{like ? 'Vous aimez' : 'Aimer ?'}</div>
                    {props.modify ? <button className='user-comment__btn' onClick={modifyArticle}>modifier</button> : null}
                    {props.modify ? <button className='user-comment__btn' onClick={() => deleteComment(props)}>effacer</button> : null}
                    <button type='button' className='user-comment__btn' tabIndex='0' onClick={AddUserComment}>commenter ici</button>
                </div>
            </div>
        </div>
    )
}

class ArticlePopup extends React.Component {
    constructor(props) {
        super(props);
        const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : this.props.user;
        this.state = {
            USERS_id: this.props.user ? this.props.user.id : userStored.id,
            user_pseudo: this.props.user ? this.props.user.pseudo : userStored.pseudo,
            title: '',
            article: '',
            linkURL: '',
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
        this.props.setArticleVisible(!this.props.articleVisible);
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
            <div className={this.props.articleVisible ? 'message-pop appear' : 'message-pop'} id='user-comment'>
                <div className='message-pop__field'>
                    <div>
                        <div className='profil__photo'>
                            <img src={this.props.user ? this.props.user.photoProfil : this.userStored.photoProfil} alt='profil' tabIndex='0' />
                        </div>
                        <h3 tabIndex='0'>{this.props.user ? this.props.user.pseudo : this.userStored.pseudo}, c'est à vous !</h3>
                    </div>
                    <form className='message-pop__field__form' onSubmit={this.handleSubmit}>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='title'>Titre</label>
                            <input type='text' name='title' max='100' value={this.state.title} onChange={this.handleChange} required />
                        </div>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='article'></label>
                            <textarea name='article' rows='5' cols="33" value={this.state.article} onChange={this.handleChange}></textarea>
                        </div>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='linkURL'>Copier un lien</label>
                            <input type='link' name='linkURL' id='linkURL' className='message-pop__field__link' tabIndex='0' value={this.state.linkURL} onChange={this.handleChange} />
                        </div>
                        <div className='message-pop__field__text' tabIndex='0'>
                            <label htmlFor='file'>Ajouter une pièce jointe</label>
                            <input type='file' className='message-pop__field__image' tabIndex='0' accept='image/png, image/jpg, image/jpeg image/webp' value={this.state.attachment} onChange={this.onChangeHandler} />
                        </div>
                        <div id='image-field'>
                            <button type='submit' className='submit-btn'>publier</button>
                            <button type='button' className='submit-btn' onClick={() => openArticlePopup(this.props)}>annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function openArticlePopup(props) {
    props.setArticleVisible(!props.articleVisible);
}

export default class CommentPage extends React.Component {

    render() {
        return (
            this.props.comments ?
                <main>
                    <ArticlePopup
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
                        articleVisible={this.props.articleVisible}
                        setArticleVisible={this.props.setArticleVisible}
                    />

                    <div className='comments'>
                        <div className='comments__btn' onClick={() => openArticlePopup(this.props)} id='comment-btn'>
                            <div className='profil__photo mini' tabIndex='0'>
                                <img src={this.props.user.photoProfil} alt='profil' />
                            </div>
                            <span tabIndex='0'>{this.props.user.pseudo}, partagez votre story</span>
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
                            articleVisible={this.props.articleVisible}
                            setArticleVisible={this.props.setArticleVisible}
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