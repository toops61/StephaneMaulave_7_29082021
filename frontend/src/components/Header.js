import brandLogo from '../assets/Groupomania_Logos/icon.png';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, resetComments, updateGeneralParam } from '../redux';

const Header = () => {
    const generalParams = useSelector(state => state.generalParams);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        dispatch(updateGeneralParam({connected:false}));
        localStorage.clear();
        dispatch(resetComments());
        dispatch(deleteUser());
        navigate("/login");
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