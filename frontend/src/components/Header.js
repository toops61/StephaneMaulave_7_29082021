import brandLogo from '../assets/Groupomania_Logos/icon-left-font-decoupe.png';

const Header = () => {
    return (
        <header className="header">
            <div>
                <img src={brandLogo} alt='Groupomania brand' />
            </div>
        </header>
    )
}

export default Header;