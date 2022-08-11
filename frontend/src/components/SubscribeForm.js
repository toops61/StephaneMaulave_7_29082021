import React, { useEffect, useState } from "react";
import validator from 'validator';
import logoGroupomania from '../assets/Groupomania_Logos/icon-left-font-monochrome-pink.png';
import { storeToLocal } from './Storage';
import { useDispatch } from "react-redux";
import { createComment, modifyUser, updateAlertsParam, updateGeneralParam } from "../redux";
import { useNavigate } from "react-router-dom";

export default function SubscribeForm() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [subscribeData, setSubscribeData] = useState({
        lastname: '',
        firstname: '',
        pseudo: '',
        birthdate: '',
        job: '',
        email: '',
        password: '',
        photoProfil: 'http://localhost:4200/images/default-avatar.png',
        isAdmin: false,
        file: null
    })

    const [photoFile, setPhotoFile] = useState();
    const [photoProfil, setPhotoProfil] = useState();

    //API fetch requete GET pour récupérer les messages
    const fetchMessages = token => {

        const url = 'http://localhost:4200/commentsPage';

        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        fetch(url, request)
            .then(function (rep) {
                let recupMessages = rep.json();
                return recupMessages;
            })
            .then(function (value) {
                const comments = value;
                comments.forEach(e => {
                    e.likes = e.likes !== "NULL" ? JSON.parse(e.likes) : [];
                    e.users_comments = e.users_comments !== "NULL" ? JSON.parse(e.users_comments) : [];
                    dispatch(createComment(e));
                });
                navigate("/commentsPage");
            })
            .catch(function (error) {
                console.log('erreur !' + error);
            })
    }

    //API fetch requete POST pour formulaire
    const subscribeSubmit = (data,file) => {
        const url = 'http://localhost:4200/subscribe';
        const formData = new FormData();
        formData.append('user', JSON.stringify(data));
        formData.append('image', file);

        let request = {
            method: 'POST',
            body: formData
        };

        let message = 'Vous n\'avez pas correctement rempli les champs';
        let status = '';

        (file && !file.type.includes('image')) ? dispatch(updateAlertsParam({message:'vous ne pouvez charger que des images',alertVisible:true})) : 
        fetch(url, request)
            .then(rep => {
                let userProfil = rep.json();
                status = (rep.status === 401 || rep.status === 400 || rep.status === 500) ? 'error' : 'logged';
                return userProfil;
            })
            .then(value => {
                if (status === 'logged') {
                    const pseudo = value.data.pseudo;
                    const photoProfil = value.data.photoProfil ? value.data.photoProfil : 'http://localhost:4200/images/default-avatar.png';
                    dispatch(updateAlertsParam({message:value.message,confirmVisible:true}));
                    localStorage.clear();
                    const userLogged = {
                        id: value.data.id,
                        pseudo: pseudo,
                        photoProfil: photoProfil,
                        token: value.token,
                        isAdmin: false
                    }
                    dispatch(modifyUser({...value.data,...userLogged}));
                    storeToLocal('user', userLogged);
                    fetchMessages(value.token);
                    dispatch(updateGeneralParam({connected:true}))
                    return (userLogged);
                } else if (status === 'error') {
                    console.log(value);
                    dispatch(updateAlertsParam({message:value.message,alertVisible:true}));
                }
            })
            .catch(error => {
                console.log('erreur ' + error);
                dispatch(updateAlertsParam({message:message,alertVisible:true}));
            })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const year = value.substring(0, 4);
        setSubscribeData({
            ...subscribeData,
            [name]: value
        });
        value !== null && year <= 2006 && year > 1900 ? e.target.className = 'valid' : e.target.className = 'invalid';
    }

    const rejectText = (e) => {
        const regexText = new RegExp('[0-9/=;,`:$&"()§!@≠…∞€ø«¡¶{}“º%µ¬®†°π‡∂ﬁƒ¬‹≈©◊£*#ë—<>≤≥]');
        const name = e.target.name;
        const value = e.target.value;
        if (!regexText.test(value)) {
            setSubscribeData({ 
                ...subscribeData,
                [name]: value.replace(/ /g, "_") 
            });
            e.target.className = 'valid';
        } else {
            dispatch(updateAlertsParam({message:'ces caractères ne sont pas autorisés',alertVisible:true}));
        };
    }

    const rejectPseudo = (e) => {
        const regexText = new RegExp('[=;,`()§≠…∞ø«¡¶{}“º%¬®†°‡∂ﬁƒ¬‹≈©◊*#—<>≤≥]');
        const name = e.target.name;
        const value = e.target.value;
        if (!regexText.test(value)) {
            setSubscribeData({
                ...subscribeData,
                [name]: value.replace(/ /g, "_") 
            });
            e.target.className = 'valid';
        } else {
            dispatch(updateAlertsParam({message:'ces caractères ne sont pas autorisés',alertVisible:true}));
        };
    }

    const rejectMail = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const regexMail = new RegExp('[/=;,`:éàèîôû$&"()§!≠…∞€ø«¡¶{}“º%µ¬®†°π‡∂ﬁƒ¬‹≈©◊£*#ë—<>≤≥]');
        if (validator.isEmail(value) && !regexMail.test(value)) {
            e.target.className = 'valid';
            setSubscribeData({
                ...subscribeData,
                [name]: value
            });
        } else {
            e.target.className = 'invalid';
            setSubscribeData({ ...subscribeData,[name]: '' });
        };
    }

    const rejectPassword = (e) => {
        const regexPassword = new RegExp('^(?=.*[0-9])(?=.*[a-zÞ-öø-ÿ])(?=.*[A-ZÀ-ÖØ-Ý])(?=.*[^0-9a-zÞ-öø-ÿA-ZÀ-ÖØ-Ý ]).{8,128}$');
        const name = e.target.name;
        const value = e.target.value;
        if (regexPassword.test(value)) {
            setSubscribeData({
                ...subscribeData,
                [name]: value
            });
            e.target.className = 'valid'
        } else {
            e.target.className = 'invalid';
        };
    }

    const onChangeHandler = (e) => {
        setSubscribeData({
            ...subscribeData,
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const imageFile = subscribeData.file;
        const data = {...subscribeData};
        delete data.file;
        const inputsArray = document.querySelectorAll('form div input');
        const validArray = [];
        for (let index = 0; index < inputsArray.length; index++) {
            const element = inputsArray[index];
            const message = index === 6 || index === 7 ? 'le mot de passe doit contenir au moins huit caractères, une minuscule, une majuscule, un chiffre et un caractère spécial' : 'invalid ' + element.name;
            if (element.className === 'invalid') {
                dispatch(updateAlertsParam({message:message,alertVisible:true}));
            } else {
                validArray.push(element.name);
            }
        };
        if (validArray.length === inputsArray.length && inputsArray[6].value === inputsArray[7].value) {
            subscribeSubmit(data,imageFile);
        } else if (inputsArray[6].value !== inputsArray[7].value) {
            dispatch(updateAlertsParam({message:'Le mot de passe n\'est pas correctement rempli ou confirmé',alertVisible:true}));
        }
    }

  return (
    <section className='login'>
        <form className='login__form' onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <div className='login__form__field'>
                <label htmlFor='lastname'>Nom</label>
                <input type='text' name='lastname' id='lastname' className='' value={subscribeData.lastname} onChange={rejectText} minLength='2' maxLength='31' autoComplete='family-name' required />
            </div>
            <div className='login__form__field'>
                <label htmlFor='firstname'>Prénom</label>
                <input type='text' name='firstname' id='firstname' className='' value={subscribeData.firstname} onChange={rejectText} minLength='2' maxLength='31' autoComplete='given-name' required />
            </div>
            <div className='login__form__field'>
                <label htmlFor='pseudo'>Pseudo</label>
                <input type='text' name='pseudo' id='pseudo' className='' value={subscribeData.pseudo} onChange={rejectPseudo} minLength='2' maxLength='31' autoComplete='username' required />
            </div>
            <div className='login__form__field'>
                <label htmlFor='birthdate'>Date de Naissance</label>
                <input type='date' name='birthdate' id='birthdate' className='' value={subscribeData.birthdate} onChange={handleChange} min='1900-01-01' max='2006-01-01' autoComplete='bday' required />
            </div>
            <div className='login__form__field'>
                <label htmlFor='job'>Emploi</label>
                <input type='text' name='job' id='job' className='' value={subscribeData.job} onChange={rejectText} minLength='2' maxLength='50' autoComplete='organization-title' required />
            </div>
            <div className='login__form__field'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' id='email' className='' onChange={rejectMail} minLength='3' maxLength='50' autoComplete='email' required />
            </div>
            <div className='login__form__field'>
                <label htmlFor='password'>Mot de passe</label>
                <input type='password' name='password' id='password' className='' onChange={rejectPassword} minLength='8' maxLength='128' autoComplete='new-password' required />
            </div>
            <div className='login__form__field'>
                <label htmlFor='password'>Confirmez</label>
                <input type='password' name='passwordconf' id='passwordconf' className='' onChange={rejectPassword} minLength='8' maxLength='128' autoComplete='new-password' required />
            </div>
            <div className='login__form__field'>
                <label htmlFor='photoProfil'>Photo profil</label>
                <input type='file' name='photoProfil' id='photoProfil' onChange={onChangeHandler} accept='image/png, image/jpg, image/jpeg image/webp' />
            </div>
            {subscribeData.file !== null && 
            <div className="login__form__field photo-selected">
                <div>
                    <img src={photoProfil} alt="profil" />
                </div>
            </div>}
            <button type='submit' id='submit-btn' className='submit-btn'>S'inscrire</button>
        </form>
        <div className='login__logo' tabIndex='0'>
            <img src={logoGroupomania} alt='logo' />
        </div>
    </section>
)
}
