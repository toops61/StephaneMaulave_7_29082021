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
import AlertPopup from './components/AlertPopup';

ReactDOM.render(
  <React.StrictMode>
    <div className='loader hidden'>
      <Loader />
    </div>
    <Router>
      <AlertPopup />
      <Header />
      <Switch>
        <Route exact path="/">
          <LoginForm />
        </Route>
        <Route path="/subscribe">
          <SubscribeForm />
        </Route>
        <Route path="/commentsPage">
          <Comments />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/profil">
          <Profil />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
