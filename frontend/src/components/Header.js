import brandLogo from '../assets/Groupomania_Logos/icon.png';

const Header = () => {
    return (
        <header className='header'>
                <div className='header__logo'>
                    <img src={brandLogo} alt='Groupomania brand' />
                </div>
                <div className='header__notification'>
                    <div></div>
                    <p>Vous avez {} message(s)</p>
                </div>
                <nav>
                    <div className='user-icon'>
                    </div>
                    <ul>
                        <li>Se connecter</li>
                        <li>S'inscrire</li>
                    </ul>
                </nav>
        </header>
    )
}

export default Header;