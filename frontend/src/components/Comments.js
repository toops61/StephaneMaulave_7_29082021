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
                <div className='user-comment'>
                    <div className='user-comment__aimer'></div>
                    <div className='user-comment__btn'>commentez ici</div>
                </div>
            </div>
        </div>
    )
}

const CommentPage = () => {
    return (
        <main>
            <div className='comments'>
                <span className='comments__btn'>Pseudo, partagez votre story</span>
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