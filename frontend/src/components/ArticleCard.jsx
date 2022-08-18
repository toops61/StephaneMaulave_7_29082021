import { useDispatch, useSelector } from "react-redux";
import { deleteComment, modifyComment, updateAlertsParam, updateGeneralParam } from "../redux";

export default function ArticleCard(props) {
    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : {};

    const dispatch = useDispatch();

    const articles = useSelector(state => state.handleComments);
    const article = articles[props.messageId];
    let commentsArray = [...article.users_comments];

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
            ...article,
            users_comments: JSON.stringify(article.users_comments),
            likes: JSON.stringify(likes)
        };
        const attachmentDisplayed = article.attachment !== '' ? article.attachment : '';

        const formData = new FormData();
        formData.append('comment', JSON.stringify(modifiedComment));
        formData.append('attachmentDisplayed', attachmentDisplayed);

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
            ...article,
            likes: JSON.stringify(article.likes),
            users_comments: JSON.stringify(commentsArray)
        };
        const attachmentDisplayed = article.attachment !== '' ? article.attachment : '';

        const formData = new FormData();
        formData.append('comment', JSON.stringify(modifiedComment));
        formData.append('attachmentDisplayed', attachmentDisplayed);

        let request = {
            method: 'PUT',
            body: formData,
            headers: {
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
                    <h3 tabIndex='0'>{article.USERS_id === userStored.id ? userStored.pseudo : article.user_pseudo}</h3>
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
                <div className="comments__card__field__article">
                    <p tabIndex='0'>{article.article}</p>
                </div>
                {article.attachment && <div className='publication-photo'>
                    <img src={article.attachment} alt='partage' />
                </div>}
                {article.linkURL ?
                    <video className='publication-video' controls>
                        <source src={article.linkURL} type='video'></source>
                    </video> : null}
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