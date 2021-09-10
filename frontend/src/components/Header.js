import brandLogo from '../assets/Groupomania_Logos/icon.png';
import ConnectForm from './ConnectForm';
import SubscribeForm from './SubscribeForm';
import Comments from './Comments';
import Profil from './Profil';
import Footer from './Footer';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

const Header = () => {
    return (
        <Router>
            <header className='header'>
                <div className='header__logo'>
                    <Link to="/commentsPage">
                        <img src={brandLogo} alt='Groupomania brand' />
                    </Link>
                </div>
                <div className='header__notification' tabIndex='0'>
                    <div></div>
                    <p>Vous avez {} message(s)</p>
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
            <Switch>
            <Route exact path="/">
                <Redirect to="/connect" />
            </Route>
                <Route path="/subscribe">
                    <SubscribeForm />
                </Route>
                <Route path="/commentsPage">
                    <Comments />
                    <Footer />
                </Route>
                <Route path="/connect">
                    <ConnectForm />
                </Route>
                <Route path="/profil">
                    <Profil />
                </Route>
            </Switch>
        </Router>
    )
}

export default Header;