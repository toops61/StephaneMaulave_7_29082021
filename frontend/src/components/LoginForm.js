import React, { useState } from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import logoGroupomania from '../assets/Groupomania_Logos/icon-left-font-monochrome-pink.png';
import { storeToLocal, recupLocal } from './Storage';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, modifyUser, updateAlertsParam, updateGeneralParam } from '../redux';

export default function LoginForm() {
    const [connectData, setConnectData] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch();

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
                //dispatch(updateGeneralParam({isLoading:false}));
            })
            .catch(function (error) {
                console.log('erreur ! ' + error);
            })
    }

    //API fetch requete POST se connecter et récupérer les données user
    const loginSubmit = (data) => {
        const url = 'http://localhost:4200/login';

        let request = {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(url, request)
            .then(rep => {
                let userProfil = rep.json();
                return userProfil;
            })
            .then(value => {
                const pseudo = value.data.pseudo;
                const photoProfil = value.data.photoProfil ? value.data.photoProfil : 'http://localhost:4200/images/default-avatar.png';
                dispatch(updateAlertsParam({message:`Bienvenue ${pseudo}`,confirmVisible:true}))
                const { password, email, createdAt, updatedAt, ...userRep } = value.data;
                dispatch(modifyUser({...value.data}))
                localStorage.clear();
                const userLogged = {
                    id: value.data.id,
                    pseudo: pseudo,
                    photoProfil: photoProfil,
                    token: value.token
                }
                storeToLocal('user', userLogged);
                dispatch(updateGeneralParam({connected:true}))
                fetchMessages(value.token);
                return (userLogged);
            })
            .catch(error => {
                dispatch(updateAlertsParam({message:'Vous n\'avez pas correctement rempli les champs',alertVisible:true}));
                console.log('erreur ! ' + error);
            })
    }

    const rejectMail = e => {
        const name = e.target.name;
        const value = e.target.value;
        const regexMail = new RegExp('[/=;,`:éàèîôû$&"()§!≠…∞€ø«¡¶{}“º%µ¬®†°π‡∂ﬁƒ¬‹≈©◊£*#ë—<>≤≥]');
        if (validator.isEmail(value) && !regexMail.test(value)) {
            e.target.className = 'valid';
            setConnectData({...connectData,[name]: value});
        } else {
            e.target.className = 'invalid';
            setConnectData({...connectData,[name]: ''});
        };
    }

    const rejectPassword = e => {
        const regexPassword = new RegExp('^(?=.*[0-9])(?=.*[a-zÞ-öø-ÿ])(?=.*[A-ZÀ-ÖØ-Ý])(?=.*[^0-9a-zÞ-öø-ÿA-ZÀ-ÖØ-Ý ]).{8,128}$');
        const name = e.target.name;
        const value = e.target.value;
        if (regexPassword.test(value)) {
            setConnectData({...connectData,[name]: value});
            e.target.className = 'valid'
        } else {
            e.target.className = 'invalid';
        };
    }

    const handleSubmit = e => {
        e.preventDefault();
        const data = JSON.stringify(connectData);
        dispatch(updateGeneralParam({loading:true}))
        const inputsArray = document.querySelectorAll('form div input');
        const validArray = [];
        for (let index = 0; index < inputsArray.length; index++) {
            const element = inputsArray[index];
            if (element.className === 'invalid') {
                dispatch(updateAlertsParam({message:'Vous n\'avez pas correctement rempli les champs',alertVisible:true}))
            } else {
                validArray.push(element.name);
            }
        };
        if (validArray.length === inputsArray.length) {
            loginSubmit(data);
        };
    }

    return (
        <section className='login'>
            <form className='login__form' onSubmit={handleSubmit}>
                <div className='login__form__field'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' className='' onChange={rejectMail} minLength='3' maxLength='50' autoComplete='email' required />
                </div>
                <div className='login__form__field'>
                    <label htmlFor='password'>Mot de passe</label>
                    <input type='password' name='password' id='password' className='' onChange={rejectPassword} minLength='8' maxLength='128' autoComplete='current-password' required />
                </div>
                <div className='login__form__field'>
                    <button type='submit' id='submit-btn' className='submit-btn'>Valider</button>
                    <button id='subscribe-btn' className='submit-btn' onClick={(e) => { e.preventDefault() }}><Link to='/subscribe'>S'inscrire</Link></button>
                </div>
            </form>
            <div className='login__logo' tabIndex='0'>
                <img src={logoGroupomania} alt='logo' />
            </div>
        </section>
    )
}
