import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyComment, updateAlertsParam, updateGeneralParam } from "../redux";
import { v4 as uuidv4 } from 'uuid';

export default function AddComment(props) {
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
        
        let modifiedComment = {
            ...article,
            likes: JSON.stringify(article.likes),
            users_comments: JSON.stringify(data)
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