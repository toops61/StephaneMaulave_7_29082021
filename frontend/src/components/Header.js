import brandLogo from '../assets/Groupomania_Logos/icon.png';
import { Link } from "react-router-dom";

const Header = (props) => {
    const logOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <header className='header'>
            <div className='header__logo'>
                <Link to="/commentsPage">
                    <img src={brandLogo} alt='Groupomania brand' />
                </Link>
            </div>
            {props.user.pseudo ? null : <h2> ! vous n'êtes pas connecté ! </h2>}
            <nav>
                <Link to="/profil">
                    <div className='user-icon'>
                    </div>
                </Link>
                <ul>
                    {props.user.pseudo ? null : <li>
                        <Link to="/login">Connexion</Link>
                    </li>}
                    {props.user.pseudo ? null : <li>
                        <Link to="/subscribe">Inscription</Link>
                    </li>}
                    {props.user.pseudo ?
                        <li>
                            <Link to="/logout" onClick={logOut}>Déconnexion</Link>
                        </li> : null}
                </ul>
            </nav>
        </header>
    )
}

export default Header;