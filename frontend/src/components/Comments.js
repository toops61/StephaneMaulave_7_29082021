import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/Groupomania_Logos/logo-decoupe.png';
import icon from '../assets/Groupomania_Logos/icon-decoupe.png';
import { createComment, deleteComment, modifyComment, updateAlertsParam, updateGeneralParam } from '../redux';
import { v4 as uuidv4 } from 'uuid';
import Footer from './Footer';
//import { storeToLocal, recupLocal } from './Storage';


function BuildArticles(props) {

    let messagesFetched = [...useSelector(state => state.handleComments)];
    const user = useSelector(state => state.handleUser)

    //const array = messagesFetched.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
    //console.log(messagesFetched);

    if (messagesFetched.length > 0) {
        var arrayDom = messagesFetched.map((message,index) => {
            return (
                <div key={message.id + message.updatedAt}>
                    <ArticleCard
                        modify={message.USERS_id === user.id || user.isAdmin ? true : false}
                        messageId={index}
                        setModifiedArticle={props.setModifiedArticle}
                        setModifiedComment={props.setModifiedComment}
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

    const articles = useSelector(state => state.handleComments);
    const article = articles[props.messageId];
    let commentsArray = [...article.users_comments]

    function deleteArticle() {
        const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
        const url = 'http://localhost:4200/commentsPage/' + article.id;

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
                    dispatch(deleteComment(article));
                })
                .catch(function (error) {
                    console.log('erreur !' + error);
                })
        }
    }

    const articleLike = likes => {
        const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
        const url = 'http://localhost:4200/commentsPage/' + article.id;
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
        const userLikes = article.likes.includes(userStored.id) ? true : false;
        let likes = article.likes === 'NULL' ? [] : [...article.likes];
        !userLikes ? likes.push(userStored.id) : likes = likes.filter(e => e!== userStored.id);
        dispatch(modifyComment({...article,likes:likes}));
        articleLike(likes);
    }

    const addUserComment = e => {
        e.preventDefault();
        dispatch(updateGeneralParam({commentVisible:true}));
        props.setModifiedArticle(article.id);
    }

    const changeComment = id => {
        dispatch(updateGeneralParam({commentVisible:true}));
        props.setModifiedArticle(article.id);
        props.setModifiedComment(id);
    }

    const fetchModifiedArticle = comment => {
        const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;
        const url = 'http://localhost:4200/commentsPage/' + article.id;
        commentsArray = commentsArray.filter(e => e.commentId !== comment.commentId);
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
                let userArticle = rep.json();
                dispatch(updateAlertsParam({message:'Votre commentaire a été supprimé !',confirmVisible:true}));
                dispatch(modifyComment({...article,users_comments:commentsArray}));
                return userArticle;
            })
            .catch(error => {
                console.log('erreur ' + error);
            })
        }
    }

    const modifyArticle = () => {
        dispatch(updateGeneralParam({articleVisible:true}));
        props.setModifiedArticle(article.id);
    }

    const commentsDom = commentsArray.map(e => {
        return (
            <div key={e.commentId} className="comment">
                <div className="comment__image">
                    <img src={e.photoProfil} alt="profil" />
                </div>
                <h4>{e.pseudo} : </h4>
                <p onClick={() => e.userId === userStored.id || userStored.isAdmin ? changeComment(e.commentId): null}>{e.content}</p>
                {(e.userId === userStored.id || userStored.isAdmin) && <div className="delete" onClick={() => fetchModifiedArticle(e)}><p>X</p></div>}
            </div>
        ) 
    });

    return (
        <div className='comments__card'>
            <div className='comments__card__title'>
                <div className='comments__card__title__box'>
                    <h3 tabIndex='0'>{article.user_pseudo}</h3>
                    {article.updatedAt !== article.createdAt ? <p tabIndex='0'>modifié le {article.updatedAt.split('T')[0]} à {article.updatedAt.split('T')[1].split('.')[0]}</p> : <p tabIndex='0'>créé le {article.createdAt.split('T')[0]} à {article.createdAt.split('T')[1].split('.')[0]}</p>}
                <h4 tabIndex='0'>{article.title}</h4>
                </div>
                <div>
                    <div className='users__likes' tabIndex='0'>
                        <span>{article.likes.length}</span>
                    </div>
                </div>
            </div>
            <div className='comments__card__field'>
                {article.attachment && <div className='publication-photo'>
                    <img src={article.attachment} alt='partage' />
                </div>}
                {article.linkURL ?
                    <video className='publication-video' controls>
                        <source src={article.linkURL} type='video'></source>
                    </video> : null}
                <div className="comments__card__field__article">
                    <p tabIndex='0'>{article.article}</p>
                </div>
                <div className='comments__card__field__answer'>
                    <h4 tabIndex='0'>commentaires: </h4>
                    <div className="comments-section">
                        {commentsDom}
                    </div>
                    
                </div>
                <div className='user-comment'>
                    {article.likes.includes(userStored.id) ? <div className='user-comment__like__true' tabIndex='0' onClick={() => addLike()}>Vous aimez</div> :
                    <div className='user-comment__like' tabIndex='0' onClick={() => addLike()}>Aimer ?</div>}
                    {props.modify && <button className='user-comment__btn' onClick={modifyArticle}>modifier</button>}
                    {props.modify && <button className='user-comment__btn' onClick={() => deleteArticle()}>effacer</button>}
                    <button type='button' className='user-comment__btn' tabIndex='0' onClick={addUserComment}>commentez</button>
                </div>
            </div>
        </div>
    )
}

function ArticlePopup(props) {
    const user = useSelector(state => state.handleUser);
    const visible = useSelector(state => state.generalParams.articleVisible);

    const articles = [...useSelector(state => state.handleComments)];

    const dispatch = useDispatch();

    const article = props.modifiedArticle === '' ? 
    {
        USERS_id: user.id,
        user_pseudo: user.pseudo,
        title: '',
        article: '',
        linkURL: '',
        attachment: '',
        users_comments: [],
        likes: []
    } : articles.filter(e => e.id === props.modifiedArticle)[0];

    const [updatedArticle, setUpdatedArticle] = useState({...article});

    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : {};

    const articleModify = (data,file) => {
        const url = 'http://localhost:4200/commentsPage/'+props.modifiedArticle;
        //const file = document.querySelector('#photoProfil').files[0];
        let modifiedComment = {
            ...data,
            users_comments: JSON.stringify(data.users_comments),
            likes: JSON.stringify(data.likes)
        };

        const formData = new FormData();
        formData.append('comment', JSON.stringify(modifiedComment));
        formData.append('image', file);
        
        let request = {
            method: 'PUT',
            body: formData,
            headers: {
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
    const articleSubmit = (data,file) => {
        const url = 'http://localhost:4200/commentsPage';

        data.likes = JSON.stringify([]);
        data.users_comments = JSON.stringify([]);

        const formData = new FormData();
        formData.append('comment', JSON.stringify(data));
        formData.append('image', file);
        
        let request = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + userStored.token
            }
        };
        
        fetch(url, request)
        .then(rep => {
            console.log(rep);
            let userArticle = rep.json();
            return userArticle;
        })
        .then(value => {
                dispatch(updateAlertsParam({message:value.message,confirmVisible:true}));
                dispatch(createComment({...value.data,likes:[],users_comments:[]}))
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
        const imageFile = updatedArticle.file;
        //const data = {...subscribeData};
        delete data.file;
        props.modifiedArticle === '' ? articleSubmit(data,imageFile) : articleModify(data,imageFile);
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
                <div className='profil'>
                    <div className='photo'>
                        <img src={user ? user.photoProfil : userStored.photoProfil} alt='profil' tabIndex='0' />
                    </div>
                    <h3 tabIndex='0'>{user ? user.pseudo : userStored.pseudo}, c'est à vous !</h3>
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
                        <label htmlFor='attachment'>Copier un lien</label>
                        <input type='link' name='attachment' id='attachment' className='message-pop__field__link' tabIndex='0' value={updatedArticle.attachment} onChange={handleChange} />
                    </div>
                    <div className='message-pop__field__text' tabIndex='0'>
                        <label htmlFor='photo'>Ajouter une pièce jointe</label>
                        
                <input type='file' onChange={onChangeHandler} accept='image/png, image/jpg, image/jpeg image/webp' />
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

    const articles = [...useSelector(state => state.handleComments)];
    const article = articles.filter(e => e.id === props.modifiedArticle)[0];

    const dispatch = useDispatch();

    let modifiedComment = '';
    props.modifiedComment !== '' && (modifiedComment = article.users_comments.filter(e => e.commentId === props.modifiedComment)[0])

    const [newComment, setNewComment] = useState(props.modifiedComment === '' ? {
        userId: userStored.id,
        pseudo: userStored.pseudo,
        photoProfil: userStored.photoProfil,
        commentId: uuidv4(),
        content: ''
    } : {...modifiedComment});

    const commentChange = e => {
        const value = e.target.value;
        setNewComment({
            ...newComment,
            content: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const commentsArray = [...article.users_comments];
        if (props.modifiedComment === '') {
            commentsArray.push(newComment);
        } else {
            const index = commentsArray.findIndex(e => e.commentId === props.modifiedComment);
            commentsArray.splice(index, 1, newComment);
        }
        dispatch(updateGeneralParam({commentVisible:false}));
        dispatch(modifyComment({...article,users_comments:commentsArray}));
        articleModify(commentsArray);
        props.setModifiedArticle('');
        props.setModifiedComment('');
        //setUserComment(userComment + ' ' + data);
    }
    

    const articleModify = data => {
        const url = 'http://localhost:4200/commentsPage/'+props.modifiedArticle;
        //const file = document.querySelector('#photoProfil').files[0];
        let modifiedComment = {
            users_comments: JSON.stringify(data)
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
            dispatch(updateAlertsParam({message:props.modifiedComment === '' ? 'Votre commentaire a été ajouté' : 'Votre commentaire a été modifié',confirmVisible:true}));
            return userComment;
        })
        .catch(error => {
            console.log('erreur ' + error);
        })
    }

    const hideUserComment = e => {
        e.preventDefault();
        dispatch(updateGeneralParam({commentVisible:false}));
        props.setModifiedArticle('');
        props.setModifiedComment('');
    }

    return (
        <div className='userComment-popup'>
            <form className='userComment-popup__field' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='userComment'></label>
                    <textarea className='comment-area' required value={newComment.content} onChange={commentChange}></textarea>
                </div>
                <button type='submit' className='submit-btn'>publier</button>
                <button type='submit' className='submit-btn' onClick={hideUserComment}>annuler</button>
            </form>
        </div>
    )
}

export default function CommentPage() {

    const [modifiedArticle, setModifiedArticle] = useState('');
    const [modifiedComment, setModifiedComment] = useState('');

    const userStored = JSON.parse(localStorage.getItem('user'));

    const generalParams = useSelector(state => state.generalParams);

    const dispatch = useDispatch();

    return (
        <main>
            {generalParams.articleVisible && <ArticlePopup 
                modifiedArticle={modifiedArticle} 
                setModifiedArticle={setModifiedArticle} 
            />}
            {generalParams.commentVisible && <AddComment 
                modifiedArticle={modifiedArticle} 
                setModifiedArticle={setModifiedArticle}
                modifiedComment={modifiedComment} 
                setModifiedComment={setModifiedComment}
            />}
            <div className='comments'>
                <div className='comments__btn' onClick={() => dispatch(updateGeneralParam({articleVisible:true}))} id='comment-btn'>
                    <div className='photo__mini' tabIndex='0'>
                        <img src={userStored.photoProfil} alt='profil' />
                    </div>
                    <span tabIndex='0'>{userStored.pseudo}, partagez votre story</span>
                </div>
                <BuildArticles setModifiedArticle={setModifiedArticle} setModifiedComment={setModifiedComment} />
            </div>
            <div className='logos-footer'>
                <div className="logos-footer__icon">
                    <img src={icon} alt='Groupomania' tabIndex='0' />
                </div>
                <div className="logos-footer__logo">
                    <img src={logo} alt='Groupomania' tabIndex='0' />
                </div>
            </div>
            <Footer />
        </main>
    )
}