import brandLogo from '../assets/Groupomania_Logos/icon.png';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className='header'>
            <div className='header__logo'>
                <Link to="/commentsPage">
                    <img src={brandLogo} alt='Groupomania brand' />
                </Link>
            </div>
            <div className='header__notification' tabIndex='0'>
                <div></div>
                <p>Vous avez { } message(s)</p>
            </div>
            <nav>
                <Link to="/profil">
                    <div className='user-icon'>
                    </div>
                </Link>
                <ul>
                    <li>
                        <Link to="/connect">Connection</Link>
                    </li>
                    <li>
                        <Link to="/subscribe">Inscription</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;