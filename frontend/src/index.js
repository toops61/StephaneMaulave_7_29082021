import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
import './styles/style.css';
import Loader from './components/Loader';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import SubscribeForm from './components/SubscribeForm';
import CommentPage from './components/Comments';
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
  const [user, setUser] = React.useState({});
  const [comments, setComments] = React.useState({});
  let history = useHistory();

  function alertToggle(message) {
    setIsVisible(!isVisible);
    setMessagealert(message);
  }
  function confirmToggle(message) {
    setConfirmVisible(!confirmVisible);
    setMessagealert(message);
  }

  let props = {
    confirmVisible: confirmVisible,
    confirmToggle: confirmToggle,
    alertToggle: alertToggle,
    user: user,
    setUser: setUser,
    comments: comments,
    setComments: setComments,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    isVisible: isVisible,
    messagealert: messagealert,
    setMessagealert: setMessagealert
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
          <AlertPopup
            isVisible={isVisible}
            alertToggle={alertToggle}
            messagealert={messagealert}
            setMessagealert={setMessagealert} />
          <ConfirmPopup
            confirmVisible={confirmVisible}
            confirmToggle={confirmToggle}
            messagealert={messagealert}
            setMessagealert={setMessagealert} />
          <Switch>
            <Route exact path="/">
              {localStorage.getItem('user') === null || user === {} ? <LoginForm {...props} /> : <CommentPage {...props} />}
            </Route>
            <Route path="/subscribe">
              <SubscribeForm {...props} />
            </Route>
            <Route path="/commentsPage">
              {localStorage.getItem('user') === null || user === {} ?
                <LoginForm {...props} /> : <CommentPage {...props} />}
            </Route>
            <Route path="/login">
              <LoginForm {...props} />
            </Route>
            <Route path="/logout">
              <LoginForm {...props} />
            </Route>
            <Route path="/profil">
              {localStorage.getItem('user') === null || user === {} ?
                <LoginForm {...props} /> :
                <Profil {...props} />}
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
