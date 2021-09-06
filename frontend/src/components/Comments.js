import logo from '../assets/Groupomania_Logos/icon-left-font-decoupe.png';

const userPseudo = 'Bidule';

const CommentCard = props => {

    return (
        <div className='comments__card'>
            <div className='comments__card__profil'>
                <div>
                    <h3>{props.name}</h3>
                    <p>{props.date}</p>
                </div>
                <h4>{props.titre}</h4>
            </div>
            <div className='comments__card__field'>
                <div className='publication-photo'>photo publication</div>
                <p>{props.article}</p>
                <div className='user-comment'>
                    <div className='user-comment__aimer'>
                        {props.aime ? props.aime : '0'}
                    </div>
                    <div className='user-comment__btn'>commentez ici</div>
                </div>
            </div>
        </div>
    )
}

const CommentPopup = () => {

    let classePop = 'message-pop';
    
    return (
        <div className={classePop} id='user-comment'>
            <div className='message-pop__field'>
                <h3>{userPseudo}, c'est à vous !</h3>
                <div className='message-pop__field__text'></div>
                <div className='message-pop__field__image'>Ajoutez une pièce jointe</div>
                <button type='submit' className='submit-btn' onClick={AddClass}>publiez</button>
            </div>
        </div>
    )
}
function AddClass() {
    document.getElementById('user-comment').classList.toggle('appear');
}

export default function CommentPage () {
    return (
        <main>
            <CommentPopup />
            <div className='comments'>
                <span className='comments__btn' onClick={AddClass}>{userPseudo}, partagez votre story</span>
                <CommentCard 
                    name='Machin'
                    titre='Journée à la plage'
                    article='dfdsjkhfdshfkjdshfkjdhfk fdkjefg fdzhf fjkdl fjk lf, jfdlzjf , fjds ,fe khfkdjs.' 
                    date='03/01/2021'
                    aime='32'
                />
                <CommentCard 
                    name='Bidule'
                    titre='Enfin vacciné'
                    article='fds fdf fdsfdf hd odj  jfds , fjdsfj f,f fds jf,dzf jkf .' 
                    date='28/08/2021'
                />
                <CommentCard 
                    name='Truc much'
                    titre='Fin des vacances, on retourne bosser !'
                    article='gfhdlkgh fdhfjk fkld f fdlskhf f fdhsfkjhkd ffjkdh. dfdkjfh fdkj fkds fkd fhdkjh fd hfkdjh fkjdfkdfkdsjkfdkf  hkfjdhsfhkds.
                    fdshflkds
                    fdslfhkdsjhfkdhfjkdhfkjd. hydysioue
                    dfdfdsf fdfdf
                    Trerrekl fdsfdsfdsf.
                    mlkhfdslkhfdh fkdh fk fkjhdsk jdfk.' 
                    date='07/09/2021'
                    aime='200'
                />
            </div>            
            <div>
                <img src={logo} alt='Groupomania' />
            </div>
        </main>
    )
}