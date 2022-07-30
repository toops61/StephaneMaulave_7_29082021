import brandLogo from '../assets/Groupomania_Logos/icon.png';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
    const generalParams = useSelector(state => state.generalParams);

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
            {!generalParams.connected && <h2> ⚠️ vous n'êtes pas connecté ⚠️ </h2>}
            <nav>
                <Link to="/profil">
                    <div className='user-icon'>
                    </div>
                </Link>
                <ul>
                    {!generalParams.connected ? 
                    <>
                        <li>
                            <Link to="/login">Connexion</Link>
                        </li>
                        <li>
                            <Link to="/subscribe">Inscription</Link>
                        </li>
                    </>
                    : <li>
                        <Link to="/logout" onClick={logOut}>Déconnexion</Link>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;