import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, modifyComment, updateAlertsParam, updateGeneralParam } from "../redux";

export default function ArticlePopup(props) {
    const user = useSelector(state => state.handleUser);
    const visible = useSelector(state => state.generalParams.articleVisible);

    const articles = [...useSelector(state => state.handleComments)];

    const [photoFile, setPhotoFile] = useState();
    const [photoChoosen, setPhotoChoosen] = useState();
    
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
    
    const attachmentDisplayed = article.attachment !== '' ? article.attachment : '';

    const [updatedArticle, setUpdatedArticle] = useState({...article});

    const userStored = localStorage.user ? JSON.parse(localStorage.getItem('user')) : {};

    const articleModify = (data,file) => {
        const url = 'http://localhost:4200/commentsPage/'+props.modifiedArticle;
        
        let modifiedComment = {
            ...data,
            users_comments: JSON.stringify(data.users_comments),
            likes: JSON.stringify(data.likes)
        };

        const formData = new FormData();
        formData.append('comment', JSON.stringify(modifiedComment));
        formData.append('image', file);
        formData.append('attachmentDisplayed',attachmentDisplayed);

        let request = {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + userStored.token
            }
        };
        
        (file && !file.type.includes('image')) ? dispatch(updateAlertsParam({message:'vous ne pouvez charger que des images',alertVisible:true})) : 
        fetch(url, request)
        .then(rep => {
            let userComment = rep.json();
            return userComment;
        })
        .then(value => {
            dispatch(updateAlertsParam({message:value.message,confirmVisible:true}));
            dispatch(modifyComment({...value.data,likes:data.likes,users_comments:data.users_comments}));
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
        
        (file && !file.type.includes('image')) && dispatch(updateAlertsParam({message:'vous ne pouvez charger que des images',alertVisible:true}));

        (file && !file.type.includes('image')) ? dispatch(updateAlertsParam({message:'vous ne pouvez charger que des images',alertVisible:true})) : 
        fetch(url, request)
        .then(rep => {
            let userArticle = rep.json();
            return userArticle;
        })
        .then(value => {
                dispatch(updateAlertsParam({message:value.message,confirmVisible:true}));
                dispatch(createComment({...value.data,likes:[],users_comments:[]}));
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
        if (e.target.files[0] !== null) {
            setPhotoFile(e.target.files[0]);
        } 
    }

    const cancel = e => {
        dispatch(updateGeneralParam({articleVisible:false}));
        props.setModifiedArticle('');
    }

    const printFile = file => {
        var reader = new FileReader();
        reader.onload = function() {
          setPhotoChoosen(reader.result);
        };
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        photoFile !== undefined && printFile(photoFile);
    }, [photoFile])

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
                    <div className='message-pop__field__text photo' tabIndex='0'>
                        <label htmlFor='photo'>Ajouter une pièce jointe</label>   
                        <input type='file' onChange={onChangeHandler} accept='image/png, image/jpg, image/jpeg image/webp' />
                        {updatedArticle.file !== undefined && 
                        <div className="photo-selected">
                            <img src={photoChoosen} alt="profil" />
                        </div>}
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