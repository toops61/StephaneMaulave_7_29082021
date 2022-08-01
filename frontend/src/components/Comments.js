import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/Groupomania_Logos/icon-left-font-decoupe.png';
import { createComment, deleteComment, modifyComment, updateAlertsParam, updateGeneralParam } from '../redux';
import { v4 as uuidv4 } from 'uuid';
//import imgProfil from '../assets/photo_profil.jpg';
import Footer from './Footer';
//import { storeToLocal, recupLocal } from './Storage';



function BuildArticles(props) {

    const messagesFetched = [...useSelector(state => state.handleComments)];
    const user = useSelector(state => state.handleUser)

    if (messagesFetched.length > 0) {
        var arrayDom = messagesFetched.map((message,index) => {
            return (
                <div key={message.id + message.updatedAt}>
                    <ArticleCard
                        pseudo={message.user_pseudo}
                        modify={message.USERS_id === user.id || user.isAdmin ? true : false}
                        messageId={index}
                        setModifiedArticle={props.setModifiedArticle}
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

function ArticleCard(props) {
    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : {};

    const dispatch = useDispatch();

    const comments = useSelector(state => state.handleComments);
    const comment = comments[props.messageId];
    let commentsArray = [...comment.users_comments]

    function deleteArticle() {
        const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
        const url = 'http://localhost:4200/commentsPage/' + comment.id;

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
                    dispatch(deleteComment(comment));
                })
                .catch(function (error) {
                    console.log('erreur !' + error);
                })
        }
    }

    const commentLike = likes => {
        const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
        const url = 'http://localhost:4200/commentsPage/' + comment.id;
        let modifiedComment = {
            likes: JSON.stringify(likes)
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

    const addLike = () => {
        const userLikes = comment.likes.includes(userStored.id) ? true : false;
        let likes = comment.likes === 'NULL' ? [] : [...comment.likes];
        !userLikes ? likes.push(userStored.id) : likes = likes.filter(e => e!== userStored.id);
        dispatch(modifyComment({...comment,likes:likes}));
        commentLike(likes);
    }

    const addUserComment = e => {
        e.preventDefault();
        dispatch(updateGeneralParam({commentVisible:true}));
        props.setModifiedArticle(comment.id)
    }

    const deleteComment = id => {
        commentsArray = commentsArray.filter(e => e.commentId !== id);
        dispatch(modifyComment({...comment,users_comments:commentsArray}));
        fetchModifiedComment();
        //props.setModifiedArticle(comment.id);
    }

    const fetchModifiedComment = () => {
        const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
        const url = 'http://localhost:4200/commentsPage/' + comment.id;
        let modifiedComment = {
            users_comments: JSON.stringify(commentsArray)
        };

        let request = {
            method: 'PUT',
            body: JSON.stringify(modifiedComment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userStored.token
            }
        };

        if (window.confirm('Voulez-vous supprimer le message ?')) {
            fetch(url, request)
            .then(rep => {
                let userComment = rep.json();
                dispatch(updateAlertsParam({message:'Votre commentaire a été supprimé !',confirmVisible:true}));
                return userComment;
            })
            .catch(error => {
                console.log('erreur ' + error);
            })
        }
    }

    const modifyArticle = () => {
        dispatch(updateGeneralParam({articleVisible:true}));
        props.setModifiedArticle(comment.id);
    }

    const commentDom = commentsArray.map((comment) => {
        return (
            <div key={comment.commentId} className="comment">
                <div className="comment__image">
                    <img src={comment.photoProfil} alt="profil" />
                </div>
                <h4>{comment.pseudo} : </h4>
                <p>{comment.content}</p>
                <div className="delete" onClick={() => deleteComment(comment.commentId)}><p>X</p></div>
            </div>
        ) 
    });

    return (
        <div className='comments__card'>
            <div className='comments__card__title'>
                <div className='comments__card__title__box'>
                    <h3 tabIndex='0'>{comment.user_pseudo}</h3>
                    {comment.updatedAt !== comment.createdAt ? <p tabIndex='0'>modifié le {comment.updatedAt.split('T')[0]} à {comment.updatedAt.split('T')[1].split('.')[0]}</p> : <p tabIndex='0'>créé le {comment.createdAt.split('T')[0]} à {comment.createdAt.split('T')[1].split('.')[0]}</p>}
                <h4 tabIndex='0'>{comment.title}</h4>
                </div>
                <div>
                    <div className='users__likes' tabIndex='0'>
                        <span>{comment.likes.length}</span>
                    </div>
                </div>
            </div>
            <div className='comments__card__field'>
                {props.attachment ? <div className='publication-photo'>
                    <img src={comment.attachment} alt='partage' />
                </div> : null}
                {comment.linkURL ?
                    <video className='publication-video' controls>
                        <source src={comment.linkURL} type='video'></source>
                    </video> : null}
                <div className="comments__card__field__article">
                    <p tabIndex='0'>{comment.article}</p>
                </div>
                <div className='comments__card__field__answer'>
                    <h4 tabIndex='0'>commentaires: </h4>
                    <div className="comments-section">
                        {commentDom}
                    </div>
                    
                </div>
                <div className='user-comment'>
                    {comment.likes.includes(userStored.id) ? <div className='user-comment__like__true' tabIndex='0' onClick={() => addLike()}>Vous aimez</div> :
                    <div className='user-comment__like' tabIndex='0' onClick={() => addLike()}>Aimer ?</div>}
                    {props.modify && <button className='user-comment__btn' onClick={modifyArticle}>modifier</button>}
                    {props.modify && <button className='user-comment__btn' onClick={() => deleteArticle()}>effacer</button>}
                    <button type='button' className='user-comment__btn' tabIndex='0' onClick={addUserComment}>commenter ici</button>
                </div>
            </div>
        </div>
    )
}

export function ArticlePopup(props) {
    const user = useSelector(state => state.handleUser);
    const visible = useSelector(state => state.generalParams.articleVisible);

    const comments = [...useSelector(state => state.handleComments)];

    const dispatch = useDispatch();

    const comment = props.modifiedArticle === '' ? 
    {
        USERS_id: user.id,
        user_pseudo: user.pseudo,
        title: '',
        article: '',
        linkURL: '',
        attachment: '',
        users_comments: [],
        likes: []
    } : comments.filter(e => e.id === props.modifiedArticle)[0];

    const [updatedArticle, setUpdatedArticle] = useState({...comment});

    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : {};

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

    const articleModify = data => {
        const url = 'http://localhost:4200/commentsPage/'+props.modifiedArticle;
        //const file = document.querySelector('#photoProfil').files[0];
        let modifiedComment = {
            ...data,
            users_comments: JSON.stringify(data.users_comments),
            likes: JSON.stringify(data.likes)
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
            dispatch(updateAlertsParam({message:value.message,confirmVisible:true}));
            dispatch(modifyComment({...value.data,likes:data.likes,users_comments:data.users_comments}));
            //localStorage.setItem('messages', JSON.stringify(messagesFetched));
        })
        .catch(error => {
            console.log('erreur ' + error);
        })
    }

    //API fetch requete POST pour formulaire
    const articleSubmit = data => {
        const url = 'http://localhost:4200/commentsPage';
        //const file = document.querySelector('#photoProfil').files[0];
        const likesArray = data.likes;
        const commentsArray = data.users_comments;
        data.likes = JSON.stringify(likesArray);
        data.users_comments = JSON.stringify(commentsArray);
        
        let request = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userStored.token
            }
        };
        
        fetch(url, request)
        .then(rep => {
            let userArticle = rep.json();
            return userArticle;
        })
        .then(value => {
                dispatch(updateAlertsParam({message:value.message,confirmVisible:true}));
                console.log(value.data);
                dispatch(createComment({...value.data,likes:likesArray,comments:commentsArray}))
                //localStorage.setItem('messages', JSON.stringify(messagesFetched));
            })
            .catch(error => {
                console.log('erreur ' + error);
            })
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateGeneralParam({articleVisible:false}));
        const data = {...updatedArticle};
        props.modifiedArticle === '' ? articleSubmit(data) : articleModify(data);
        props.setModifiedArticle('');
    }
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setUpdatedArticle({
            ...updatedArticle,
            [name]: value
        });
    }

    const onChangeHandler = e => {
        setUpdatedArticle({ ...updatedArticle,file: e.target.files[0] })
    }

    const cancel = e => {
        dispatch(updateGeneralParam({articleVisible:false}));
        props.setModifiedArticle('');
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
                        <input type='text' name='title' max='100' value={updatedArticle.title} onChange={handleChange} required />
                    </div>
                    <div className='message-pop__field__text' tabIndex='0'>
                        <label htmlFor='article'></label>
                        <textarea name='article' rows='5' cols="33" value={updatedArticle.article} onChange={handleChange}></textarea>
                    </div>
                    <div className='message-pop__field__text' tabIndex='0'>
                        <label htmlFor='linkURL'>Copier un lien</label>
                        <input type='link' name='linkURL' id='linkURL' className='message-pop__field__link' tabIndex='0' value={updatedArticle.linkURL} onChange={handleChange} />
                    </div>
                    <div className='message-pop__field__text' tabIndex='0'>
                        <label htmlFor='file'>Ajouter une pièce jointe</label>
                        <input type='file' className='message-pop__field__image' tabIndex='0' accept='image/png, image/jpg, image/jpeg image/webp' value={updatedArticle.attachment} onChange={onChangeHandler} />
                    </div>
                    <div id='image-field'>
                        <button type='submit' className='submit-btn'>publier</button>
                        <button type='button' className='submit-btn' onClick={cancel}>annuler</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function AddComment(props) {
    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : {};

    const comments = [...useSelector(state => state.handleComments)];
    const comment = comments.filter(e => e.id === props.modifiedArticle)[0];

    const dispatch = useDispatch();

    const [newComment, setNewComment] = useState({
        userId: userStored.id,
        pseudo: userStored.pseudo,
        photoProfil: userStored.photoProfil,
        commentId: uuidv4(),
        content: ''
    })

    const commentChange = e => {
        const value = e.target.value;
        setNewComment({
            ...newComment,
            content: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const commentsArray = [...comment.users_comments];
        commentsArray.push(newComment);
        dispatch(updateGeneralParam({commentVisible:false}));
        dispatch(modifyComment({...comment,users_comments:commentsArray}));
        articleModify(commentsArray);
        props.setModifiedArticle('');
        //setUserComment(userComment + ' ' + data);
    }

    const articleModify = data => {
        const url = 'http://localhost:4200/commentsPage/'+props.modifiedArticle;
        //const file = document.querySelector('#photoProfil').files[0];
        let modifiedComment = {
            ...comment,
            users_comments: JSON.stringify(data),
            likes: JSON.stringify(comment.likes)
        };
        
        console.log(modifiedComment.users_comments);
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
            dispatch(updateAlertsParam({message:'Votre commentaire a été ajouté',confirmVisible:true}));
            return userComment;
        })
        .catch(error => {
            console.log('erreur ' + error);
        })
    }

    const hideUserComment = e => {
        e.preventDefault();
        dispatch(updateGeneralParam({commentVisible:false}));
    }

    return (
        <div className='userComment-popup'>
            <form className='userComment-popup__field' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='userComment'></label>
                    <textarea rows="5" cols="33" required value={newComment.content} onChange={commentChange}></textarea>
                </div>
                <button type='submit' className='submit-btn'>publier</button>
                <button type='submit' className='submit-btn' onClick={hideUserComment}>annuler</button>
            </form>
        </div>
    )
}

export default function CommentPage() {

    const [modifiedArticle, setModifiedArticle] = useState('');

    const userStored = JSON.parse(localStorage.getItem('user'));

    const generalParams = useSelector(state => state.generalParams);

    const dispatch = useDispatch();


    return (
        <main>
            {generalParams.articleVisible && <ArticlePopup modifiedArticle={modifiedArticle} setModifiedArticle={setModifiedArticle} />}
            {generalParams.commentVisible && <AddComment  modifiedArticle={modifiedArticle} setModifiedArticle={setModifiedArticle} />}
            <div className='comments'>
                <div className='comments__btn' onClick={() => dispatch(updateGeneralParam({articleVisible:true}))} id='comment-btn'>
                    <div className='profil__photo mini' tabIndex='0'>
                        <img src={userStored.photoProfil} alt='profil' />
                    </div>
                    <span tabIndex='0'>{userStored.pseudo}, partagez votre story</span>
                </div>
                <BuildArticles setModifiedArticle={setModifiedArticle} />
            </div>
            <div>
                <img src={logo} alt='Groupomania' tabIndex='0' />
            </div>
            <Footer />
        </main>
    )
}