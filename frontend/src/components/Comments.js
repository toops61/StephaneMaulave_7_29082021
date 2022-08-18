import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/Groupomania_Logos/logo-decoupe.png';
import icon from '../assets/Groupomania_Logos/icon-decoupe.png';
import { updateGeneralParam } from '../redux';
import Footer from './Footer';
import BuildArticles from './BuildArticles';
import ArticlePopup from './ArticlePopup';
import AddComment from './AddComment';

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
                    <h2 tabIndex='0'>{userStored.pseudo}, partagez votre story</h2>
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