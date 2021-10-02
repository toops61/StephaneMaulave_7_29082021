import brandLogo from '../assets/Groupomania_Logos/icon.png';
import { Link } from "react-router-dom";

const Header = () => {
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
            {/* <div className='header__notification' tabIndex='0'>
                <div></div>
                <p>Vous avez { } message(s)</p>
            </div> */}
            <nav>
                <Link to="/profil">
                    <div className='user-icon'>
                    </div>
                </Link>
                <ul>
                    <li>
                        <Link to="/login">Connexion</Link>
                    </li>
                    <li>
                        <Link to="/subscribe">Inscription</Link>
                    </li>
                    <li>
                        <Link to="/logout" onClick={logOut}>Déconnexion</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;