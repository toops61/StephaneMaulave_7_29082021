//import imgProfil from '../assets/photo_profil.jpg';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { storeToLocal } from './Storage';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, resetComments, deleteUser, modifyComment, modifyUser, resetUser, updateAlertsParam, updateGeneralParam } from '../redux';
import { useNavigate } from 'react-router-dom';


export default function Profil() {
    const userStored = JSON.parse(localStorage.getItem('user'));
    
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.handleUser);
    const articles = useSelector(state => state.handleComments);

    const navigate = useNavigate();
    
    const [photoFile, setPhotoFile] = useState();
    const [photoProfil, setPhotoProfil] = useState(user.photoProfil);
    const [userNew, setUserNew] = useState({
        ...user,
        lastname: user.lastname,
        firstname: user.firstname,
        pseudo: user.pseudo,
        birthdate: user.birthdate,
        job: user.job,
        password: '',
        photoProfil: user.photoProfil
    });

    const deconnection = () => {
        dispatch(updateGeneralParam({connected:false}));
        localStorage.clear();
        dispatch(resetComments());
        dispatch(resetUser());
        navigate("/login");
    }

    const fetchUpdatedArticle = (article) => {
        const url = 'http://localhost:4200/commentsPage/' + article.id;
        const articleToFetch = {...article,likes:JSON.stringify(article.likes),users_comments:JSON.stringify(article.users_comments)};

        const attachmentDisplayed = article.attachment !== '' ? article.attachment : '';

        const formData = new FormData();
        formData.append('comment', JSON.stringify(articleToFetch));
        formData.append('attachmentDisplayed', attachmentDisplayed);

        let request = {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + userStored.token
            }
        };
        
        fetch(url, request)
        .then()
        .catch(error => {
            console.log('erreur ' + error);
            console.log(article);
        })
    }
    
    //API fetch requete POST pour formulaire
    const updateProfile = (data,file) => {
        const url = 'http://localhost:4200/user/' + user.id;

        let newPhotoProfil = data.photoProfil;

        const formData = new FormData();
        formData.append('user', JSON.stringify(data));
        formData.append('image', file);

        let request = {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + userStored.token
            }
        };

        const modifyUserComments = () => {
            //modify articles from user updated
            articles.filter(e => e.USERS_id === userStored.id).map(el => {
                const modifiedArticle = {...el,user_pseudo:userNew.pseudo,photoProfil:newPhotoProfil};
                dispatch(modifyComment(modifiedArticle));
                fetchUpdatedArticle(modifiedArticle);
                return modifiedArticle
            });
            //modify comments from user updated
            const profilArticles = [...articles.filter(e => e.users_comments.some(el => el.userId === userStored.id))];
            if (profilArticles.length > 0) {
                profilArticles.map(e => {
                    //console.log(userStored.photoProfil);
                    const comments = [...e.users_comments.filter(el => el.userId === userStored.id)];
                    const modifiedComments = comments.map(element => {
                    return {...element,pseudo:userNew.pseudo,photoProfil:newPhotoProfil}});

                    const modifiedArticle = {...e,users_comments:modifiedComments};
                    dispatch(modifyComment(modifiedArticle));
                    fetchUpdatedArticle(modifiedArticle);
                    return modifiedArticle;
                })
            }
        }
    
        fetch(url, request)
            .then(rep => {
                let userProfil = rep.json();
                return userProfil;
            })
            .then(value => {
                const pseudo = value.data.pseudo;
                value.data.photoProfil && ((newPhotoProfil = value.data.photoProfil) && (userStored.photoProfil = value.data.photoProfil));
                if (pseudo !== userStored.pseudo) {
                    userStored.pseudo = pseudo;
                }
                storeToLocal('user', userStored);
                modifyUserComments();
                dispatch(updateAlertsParam({message:'votre profil a été mis à jour',confirmVisible:true}));
                dispatch(modifyUser({...data,photoProfil:newPhotoProfil}));
            })
            .catch(error => {
                console.log('erreur !' + error);
            })
    }

    const selectArticlesToModify = () => {
        const likesArticles = [...articles.filter(e => e.USERS_id !== userStored.id && e.likes.includes(userStored.id) && !e.users_comments.some(el => el.userId === userStored.id))];
        if (likesArticles.length > 0) {
            likesArticles.map(e => {
                const likes = [...e.likes.filter(el => el !== userStored.id)];
                const likesArticle = {...e,likes:likes};
                dispatch(modifyComment(likesArticle));
                fetchUpdatedArticle(likesArticle);
                return likesArticle;
            })
        }

        const commentsArticles = [...articles.filter(e => e.USERS_id !== userStored.id && e.users_comments.some(el => el.userId === userStored.id))];
        if (commentsArticles.length > 0) {
            commentsArticles.map(e => {
                const likes = e.likes.includes(userStored.id) ? e.likes.filter(el => el !== userStored.id) : e.likes;
                const comments = [...e.users_comments.filter(el => el.userId !== userStored.id)];
                const commentsArticle = {...e,users_comments:comments,likes:likes};
                dispatch(modifyComment(commentsArticle));
                fetchUpdatedArticle(commentsArticle);
                return commentsArticle;
            })
        }
    }

    const deleteArticles = () => {
        const articlesToDelete = articles.filter(e => e.USERS_id === userStored.id);
        articlesToDelete.length > 0 && articlesToDelete.forEach(el => {
            dispatch(deleteComment(el));
        });
    }
    
    const deleteProfile = () => {
        const userStored = JSON.parse(localStorage.getItem('user'));
        const url = 'http://localhost:4200/user/' + user.id;
    
        let request = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userStored.token
            }
        };
        if (window.confirm('Voulez-vous supprimer votre profil ?')) {
            fetch(url, request)
                .then(() => {
                    deleteArticles();
                    selectArticlesToModify();
                    dispatch(deleteUser());
                    dispatch(updateAlertsParam({message:'Votre profil a été supprimé !',confirmVisible:true}));
                    deconnection();
                })
                .catch(function (error) {
                    console.log('erreur !' + error);
                })
        }
    }

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        const year = value.substring(0, 4);
        setUserNew({
            ...userNew,
            [name]: value
        });
        value !== null && year <= 2006 && year > 1900 ? e.target.className = 'valid' : e.target.className = 'invalid';
    }

    const rejectText = e => {
        const regexText = new RegExp('[0-9/=;,`:$&"()§!@≠…∞€ø«¡¶{}“º%µ¬®†°π‡∂ﬁƒ¬‹≈©◊£*#ë—<>≤≥]');
        const name = e.target.name;
        const value = e.target.value;
        if (!regexText.test(value)) {
            setUserNew({ ...userNew,[name]: value.replace(/ /g, "_") });
            e.target.className = 'valid';
        } else {
            dispatch(updateAlertsParam({message:'ces caractères ne sont pas autorisés',alertVisible:true}));
        };
    }

    const rejectPseudo = e => {
        const regexText = new RegExp('[=;,`()§≠…∞ø«¡¶{}“º%¬®†°‡∂ﬁƒ¬‹≈©◊*#—<>≤≥]');
        const name = e.target.name;
        const value = e.target.value;
        if (!regexText.test(value)) {
            setUserNew({ ...userNew,[name]: value.replace(/ /g, "_") });
            e.target.className = 'valid';
        } else {
            dispatch(updateAlertsParam({message:'ces caractères ne sont pas autorisés',alertVisible:true}));
        };
    }

    const rejectPassword = e => {
        const regexPassword = new RegExp('^(?=.*[0-9])(?=.*[a-zÞ-öø-ÿ])(?=.*[A-ZÀ-ÖØ-Ý])(?=.*[^0-9a-zÞ-öø-ÿA-ZÀ-ÖØ-Ý ]).{8,128}$');
        const name = e.target.name;
        const value = e.target.value;
        if (regexPassword.test(value)) {
            setUserNew({ ...userNew,[name]: value });
            e.target.className = 'valid'
        } else {
            e.target.className = 'invalid';
        };
    }

    const handleSubmit = e => {
        e.preventDefault();
        const data = {...userNew};
        const imageFile = userNew.file;
        delete data.file;
        const inputsArray = document.querySelectorAll('form div input');
        const validArray = [];
        for (let index = 0; index < inputsArray.length; index++) {
            const element = inputsArray[index];
            if (element.className === 'invalid') {
                dispatch(updateAlertsParam({message:'les champs ne sont pas valides',alertVisible:true}));
            } else {
                validArray.push(element.name);
            }
        };
        if (validArray.length === inputsArray.length && inputsArray[6].value === inputsArray[7].value) {
            updateProfile(data,imageFile);
        };
    }

    const onChangeHandler = (e) => {
        setUserNew({
            ...userNew,
            file: e.target.files[0]
        });
        if (e.target.files[0] !== null) {
            setPhotoFile(e.target.files[0]);
        } 
    }

    const printFile = file => {
        var reader = new FileReader();
        reader.onload = function() {
          setPhotoProfil(reader.result);
        };
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        photoFile !== undefined && printFile(photoFile);
    }, [photoFile])

    return (
        <div>
            <main>
                <form className='login__form' onSubmit={handleSubmit}>
                    <div className='profil'>
                        <div className='profil__box'>
                            <div className='photo'>
                                <img src={photoProfil} alt='profil' />
                            </div>
                            <label htmlFor='newPhotoProfil'></label>
                            <input type='file' name='newPhotoProfil' id='newPhotoProfil' onChange={onChangeHandler} accept='image/png, image/jpg, image/jpeg image/webp' />
                        </div>
                        <h1 className='profil__titre'>
                            {userNew.pseudo}, modifiez vos infos
                        </h1>
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='pseudo'>Pseudo</label>
                        <input type='text' name='pseudo' id='pseudo' className='' value={userNew.pseudo} onChange={rejectPseudo} minLength='2' maxLength='31' autoComplete='username' />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='job'>Emploi</label>
                        <input type='text' name='job' id='job' className='' value={userNew.job} onChange={rejectText} minLength='2' maxLength='50' autoComplete='organization-title' />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='firstname'>Prénom</label>
                        <input type='text' name='firstname' id='firstname' className='' value={userNew.firstname} onChange={rejectText} minLength='2' maxLength='31' autoComplete='given-name' />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='lastname'>Nom</label>
                        <input type='text' name='lastname' id='lastname' className='' value={userNew.lastname} onChange={rejectText} minLength='2' maxLength='31' autoComplete='family-name' />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='birthdate'>Date de Naissance</label>
                        <input type='date' name='birthdate' id='birthdate' className='' value={userNew.birthdate} onChange={handleChange} min='1900-01-01' max='2006-01-01' autoComplete='bday' />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input type='password' name='password' id='password' className='' onChange={rejectPassword} minLength='8' maxLength='128' autoComplete='new-password' required />
                    </div>
                    <div className='login__form__field'>
                        <label htmlFor='password'>Confirmez</label>
                        <input type='password' name='passwordconf' id='passwordconf' className='' onChange={rejectPassword} minLength='8' maxLength='128' autoComplete='new-password' required />
                    </div>
                    <button type='submit' id='submit-btn' className='submit-btn'>Modifier les infos</button>
                    <button type='button' id='delete-btn' className='submit-btn' onClick={() => deleteProfile()}>Effacer le profil</button>
                </form>
            </main>
            <Footer />
        </div>
    )
}