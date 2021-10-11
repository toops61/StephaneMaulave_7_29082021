import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
import './styles/style.css';
import Loader from './components/Loader';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import SubscribeForm from './components/SubscribeForm';
import Comments from './components/Comments';
import Profil from './components/Profil';
//import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router';
import AlertPopup from './components/AlertPopup';
import { ConfirmPopup } from './components/AlertPopup';

function Index() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [messagealert, setMessagealert] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  let history = useHistory();

  function alertToggle(message) {
    setIsVisible(!isVisible);
    setMessagealert(message);
  }
  function confirmToggle(message) {
    setConfirmVisible(!confirmVisible);
    setMessagealert(message);
  }

  return (
    <React.StrictMode>
      {isLoading ?
        <div className='loader'>
          <Loader />
        </div> :
        <Router>
          <div className='loader hidden'>
            <Loader />
          </div>
          <Header />
          <AlertPopup isVisible={isVisible} alertToggle={alertToggle} messagealert={messagealert} setMessagealert={setMessagealert} />
          <ConfirmPopup confirmVisible={confirmVisible} confirmToggle={confirmToggle} messagealert={messagealert} setMessagealert={setMessagealert} />
          <Switch>
            <Route exact path="/">
              {localStorage.getItem('user') === null ? <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} confirmVisible={confirmVisible} confirmToggle={confirmToggle} isVisible={isVisible} alertToggle={alertToggle} messagealert={messagealert} setMessagealert={setMessagealert} /> : <Comments isLoading={isLoading} setIsLoading={setIsLoading} confirmVisible={confirmVisible} confirmToggle={confirmToggle} isVisible={isVisible} alertToggle={alertToggle} messagealert={messagealert} setMessagealert={setMessagealert} />}
            </Route>
            <Route path="/subscribe">
              <SubscribeForm isLoading={isLoading} setIsLoading={setIsLoading} confirmVisible={confirmVisible} confirmToggle={confirmToggle} isVisible={isVisible} alertToggle={alertToggle} messagealert={messagealert} setMessagealert={setMessagealert} />
            </Route>
            <Route path="/commentsPage">
              {localStorage.getItem('user') === null ? <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} confirmVisible={confirmVisible} confirmToggle={confirmToggle} isVisible={isVisible} alertToggle={alertToggle} messagealert={messagealert} setMessagealert={setMessagealert} /> : <Comments isLoading={isLoading} setIsLoading={setIsLoading} confirmVisible={confirmVisible} confirmToggle={confirmToggle} isVisible={isVisible} alertToggle={alertToggle} messagealert={messagealert} setMessagealert={setMessagealert} />}
            </Route>
            <Route path="/login">
              <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} history={history} confirmVisible={confirmVisible} confirmToggle={confirmToggle} isVisible={isVisible} alertToggle={alertToggle} messagealert={messagealert} setMessagealert={setMessagealert} />
            </Route>
            <Route path="/logout">
              <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} confirmVisible={confirmVisible} confirmToggle={confirmToggle} isVisible={isVisible} alertToggle={alertToggle} messagealert={messagealert} setMessagealert={setMessagealert} />
            </Route>
            <Route path="/profil">
              {localStorage.getItem('user') === null ? <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} history={history} confirmVisible={confirmVisible} confirmToggle={confirmToggle} isVisible={isVisible} alertToggle={alertToggle} messagealert={messagealert} setMessagealert={setMessagealert} /> : <Profil isLoading={isLoading} setIsLoading={setIsLoading} confirmVisible={confirmVisible} confirmToggle={confirmToggle} isVisible={isVisible} alertToggle={alertToggle} messagealert={messagealert} setMessagealert={setMessagealert} />}
            </Route>
          </Switch>
        </Router>}
    </React.StrictMode>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
