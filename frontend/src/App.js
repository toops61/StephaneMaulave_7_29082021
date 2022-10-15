import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Loader from './components/Loader';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import SubscribeForm from './components/SubscribeForm';
import CommentPage from './components/Comments';
import Profil from './components/Profil';
import { updateGeneralParam } from './redux';
import { AlertPopup, ConfirmPopup } from './components/alertWindows';
import { useEffect, useState } from 'react';

function App() {
  const [scroll, setScroll] = useState(0);
  const [arrowAppears, setArrowAppears] = useState(false);

  const generalParams = useSelector(state => state.generalParams);
  const alertParams = useSelector(state => state.alertParams);
  const handleUser = useSelector(state => state.handleUser);

  const dispatch = useDispatch();

  const  windowup = () => {
    setArrowAppears(false);
    window.scroll(0, 0);
  }

  function ArrowUp() {
    return (
      <div id='arrow-up' tabIndex='0' className='arrow-up' onClick={windowup}>
        <div></div>
      </div>
    )
  }

  useEffect(() => {
    const handleScroll = event => {
      const scrollTop = window.scrollY;
      setScroll(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scroll > 350 && !arrowAppears) {
      setArrowAppears(true);
    } else if (scroll < 350 && arrowAppears) {
      setArrowAppears(false);
    }
  
  }, [scroll])
  
  const pageLoaded = () => {
    document.querySelector('.loader').classList.add('hidden');
    setTimeout(() => {
      dispatch(updateGeneralParam({isLoading:false}));
    }, 2000);
  }

  window.addEventListener('load',pageLoaded);
  //window.addEventListener('scroll', arrowToggle);

  return (
    <div className="App">
      {generalParams.isLoading ? <Loader /> :
      <>
        {arrowAppears && <ArrowUp />}
        <Header />
        {alertParams.confirmVisible && <ConfirmPopup />}
        {alertParams.alertVisible && <AlertPopup />}
        <Routes>
          <Route path="/" element={<LoginForm />} /> 
          <Route path="/subscribe" element={<SubscribeForm />} />
          <Route path="/commentsPage" element={!generalParams.connected ? <LoginForm/> : <CommentPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<LoginForm />} />
          <Route path="/profil" element={!generalParams.connected ? <LoginForm /> : <Profil />} />
        </Routes>
      </>}
    </div>
  );
}

export default App;
