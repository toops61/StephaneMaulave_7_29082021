import logo from '../assets/Groupomania_Logos/icon-left-font-decoupe.png';

const CommentCard = () => {
    return (
        <div className='comments__card'>
            <div className='comments__card__profil'>
                <div>
                    <h3>pseudo</h3>
                    <p>date</p>
                </div>
                <h4>titre commentaire</h4>
            </div>
            <div className='comments__card__field'>
                <div className='publication-photo'>photo publication</div>
                <p>commentaire</p>
                <div>
                    <div className='aimer'></div>
                    <textarea name='comment' rows='5' cols='33' className='comment-field'>
                    </textarea>
                </div>
            </div>
        </div>
    )
}

const CommentPage = () => {
    return (
        <main>
            <div className='comments'>
                <span>Partagez votre story</span>
                <CommentCard />
                <CommentCard />
                <CommentCard />
            </div>
            
            <div>
                <img src={logo} alt='Groupomania' />
            </div>
        </main>
    )
}
export default CommentPage;