import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/Groupomania_Logos/icon-left-font-decoupe.png';
import { createComment, modifyComment, updateAlertsParam, updateGeneralParam } from '../redux';
//import imgProfil from '../assets/photo_profil.jpg';
import Footer from './Footer';
//import { storeToLocal, recupLocal } from './Storage';



function BuildComments(props) {

    const messagesFetched = [...useSelector(state => state.handleComments)];
    const user = useSelector(state => state.handleUser)

    if (messagesFetched.length > 0) {
        var arrayDom = messagesFetched.map((message,index) => {
            return (
                <div key={message.id + message.updatedAt}>
                    <CommentCard
                        pseudo={message.user_pseudo}
                        modify={message.USERS_id === user.id || user.isAdmin ? true : false}
                        messageId={index}
                        deleteComment={props.deleteComment}
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
    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : {};

    const dispatch = useDispatch();

    const generalParams = useSelector(state => state.generalParams);
    const comments = useSelector(state => state.handleComments);
    const comment = comments[props.messageId];
    const user = useSelector(state => state.handleUser);

    /* function UpdateComment(state) {
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
    } */

    function commentLike(likes, user_like) {
        const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
        const id = userStored.id;
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

    function addLike() {
        const userLike = !comment.user_like ? true : false;
        let likes = comment.likes === 'NULL' ? [] : [...comment.likes];
        !comment.user_like ? likes.push(userStored.id) : likes = likes.filter(e => e!== userStored.id);
        dispatch(modifyComment({...comment,user_like:userLike,likes:likes}));
        commentLike(likes, userLike);
    }

    function addUserComment(e) {
        e.preventDefault();
        dispatch(updateGeneralParam({commentVisible:true}));
    }

    function hideUserComment(e) {
        e.preventDefault();
        dispatch(updateGeneralParam({commentVisible:false}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = e.target[0].value;
        dispatch(updateGeneralParam({commentVisible:false}));
        //setUserComment(userComment + ' ' + data);
    }

    function modifyArticle() {
        dispatch(updateGeneralParam({articleVisible:true}));
    }

    return (
        <div className='comments__card'>
            {generalParams.commentVisible && <div className='userComment-popup'>
                <form className='userComment-popup__field' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='userComment'></label>
                        <textarea rows="5" cols="33" required></textarea>
                    </div>
                    <button type='submit' className='submit-btn'>publier</button>
                    <button type='submit' className='submit-btn' onClick={hideUserComment}>annuler</button>
                </form>
            </div>}
            <div className='comments__card__profil'>
                <div>
                    <h3 tabIndex='0'>{comment.pseudo}</h3>
                    {comment.updatedAt !== comment.createdAt ? <p tabIndex='0'>modifié le {comment.updatedAt.split('T')[0]} à {comment.updatedAt.split('T')[1].split('.')[0]}</p> : <p tabIndex='0'>créé le {comment.createdAt.split('T')[0]} à {comment.createdAt.split('T')[1].split('.')[0]}</p>}
                </div>
                <h4 tabIndex='0'>{comment.title}</h4>
            </div>
            <div className='comments__card__field'>
                {props.attachment ? <div className='publication-photo'>
                    <img src={comment.attachment} alt='partage' />
                </div> : null}
                {comment.linkURL ?
                    <video className='publication-video' controls>
                        <source src={comment.linkURL} type='video'></source>
                    </video> : null}
                <p tabIndex='0'>{comment.article}</p>
                <div className='comments__card__field__answer'>
                    <h4 tabIndex='0'>commentaires: </h4>
                    <p tabIndex='0'>{comment.userComment}</p>
                    <div>
                        <div className='users__likes' tabIndex='0'>
                            <span>{comment.likes.length}</span>
                        </div>
                    </div>
                </div>
                <div className='user-comment'>
                    <div className={comment.user_like ? 'user-comment__like__true' : 'user-comment__like'} tabIndex='0' onClick={() => addLike(props)}>{comment.user_like ? 'Vous aimez' : 'Aimer ?'}</div>
                    {props.modify && <button className='user-comment__btn' onClick={modifyArticle}>modifier</button>}
                    {props.modify && <button className='user-comment__btn' onClick={() => props.deleteComment(comment.id)}>effacer</button>}
                    <button type='button' className='user-comment__btn' tabIndex='0' onClick={addUserComment}>commenter ici</button>
                </div>
            </div>
        </div>
    )
}

export function ArticlePopup(props) {
    const user = useSelector(state => state.handleUser);
    const visible = useSelector(state => state.generalParams.articleVisible);

    const dispatch = useDispatch();

    const [updatedComment, setUpdatedComment] = useState({
        userId: user.id,
        user_pseudo: user.pseudo,
        title: '',
        article: '',
        linkURL: '',
        attachment: '',
        user_like: 0,
        user_comment: '',
        likes: []
    })

    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : {};


    //API fetch requete POST pour formulaire
    const commentSubmit = data => {
        const url = 'http://localhost:4200/commentsPage';
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
                dispatch(updateAlertsParam({message:value.message,confirmVisible:true}));
                //messagesFetched.push(value.data);
                console.log(value);
                dispatch(createComment(value.data))
                //localStorage.setItem('messages', JSON.stringify(messagesFetched));
            })
            .catch(error => {
                console.log('erreur ' + error);
            })
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.toggleArticle();
        const data = {...updatedComment};
        commentSubmit(JSON.stringify(data), props);
    }
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setUpdatedComment({
            ...updatedComment,
            [name]: value
        });
    }

    const onChangeHandler = e => {
        setUpdatedComment({ ...updatedComment,file: e.target.files[0] })
    }

    return (
        <div className={visible ? 'message-pop appear' : 'message-pop'} id='user-comment'>
            <div className='message-pop__field'>
                <div>
                    <div className='profil__photo'>
                        <img src={props.user ? props.user.photoProfil : userStored.photoProfil} alt='profil' tabIndex='0' />
                    </div>
                    <h3 tabIndex='0'>{props.user ? props.user.pseudo : userStored.pseudo}, c'est à vous !</h3>
                </div>
                <form className='message-pop__field__form' onSubmit={handleSubmit}>
                    <div className='message-pop__field__text' tabIndex='0'>
                        <label htmlFor='title'>Titre</label>
                        <input type='text' name='title' max='100' value={updatedComment.title} onChange={handleChange} required />
                    </div>
                    <div className='message-pop__field__text' tabIndex='0'>
                        <label htmlFor='article'></label>
                        <textarea name='article' rows='5' cols="33" value={updatedComment.article} onChange={handleChange}></textarea>
                    </div>
                    <div className='message-pop__field__text' tabIndex='0'>
                        <label htmlFor='linkURL'>Copier un lien</label>
                        <input type='link' name='linkURL' id='linkURL' className='message-pop__field__link' tabIndex='0' value={updatedComment.linkURL} onChange={handleChange} />
                    </div>
                    <div className='message-pop__field__text' tabIndex='0'>
                        <label htmlFor='file'>Ajouter une pièce jointe</label>
                        <input type='file' className='message-pop__field__image' tabIndex='0' accept='image/png, image/jpg, image/jpeg image/webp' value={updatedComment.attachment} onChange={onChangeHandler} />
                    </div>
                    <div id='image-field'>
                        <button type='submit' className='submit-btn'>publier</button>
                        <button type='button' className='submit-btn' onClick={() => dispatch(updateGeneralParam({articleVisible:false}))}>annuler</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function CommentPage() {

    const userStored = JSON.parse(localStorage.getItem('user'));

    const generalParams = useSelector(state => state.generalParams);

    const dispatch = useDispatch();

    //API fetch requete PUT pour formulaire
    /* const commentUpdate = (e, state) => {
        if (e) { e.preventDefault() };
        const id = state.props ? state.props.id : state.id;
        const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
        const url = 'http://localhost:4200/commentsPage/' + id;
        //const messagesFetched = props.comments ? props.comments : [];
        for (let ind = 0; ind < messagesFetched.length; ind++) {
            if (messagesFetched[ind].id === data.id) {
                messagesFetched.splice(ind, 1);
            }
        }
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
                console.log(value);
                articleIsvisible && ;
                 ? confirmToggle(value.message) : confirmToggle(value.message);
            })
            .catch(error => {
                console.log('erreur ' + error);
            })
    } */

    

    function deleteComment(id) {

        console.log('efface ' + id);
        /* const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
        const url = 'http://localhost:4200/commentsPage/' + id;

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
                    dispatch(updateAlertsParam({message:'Le message a été supprimé !',confirmVisible:true}));
                    for (let ind = 0; ind < messagesFetched.length; ind++) {
                        if (messagesFetched[ind].id === id) {
                            return messagesFetched.splice(ind, 1);
                        }
                    }
                })
                .catch(function (error) {
                    console.log('erreur !' + error);
                })
        } */
    }

    return (
        <main>
            {generalParams.articleVisible && <ArticlePopup />}

            <div className='comments'>
                <div className='comments__btn' onClick={() => dispatch(updateGeneralParam({articleVisible:true}))} id='comment-btn'>
                    <div className='profil__photo mini' tabIndex='0'>
                        <img src={userStored.photoProfil} alt='profil' />
                    </div>
                    <span tabIndex='0'>{userStored.pseudo}, partagez votre story</span>
                </div>
                <BuildComments deleteComment={deleteComment} />
            </div>
            <div>
                <img src={logo} alt='Groupomania' tabIndex='0' />
            </div>
            <Footer />
        </main>
    )
}