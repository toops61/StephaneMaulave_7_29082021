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

function App() {

  const generalParams = useSelector(state => state.generalParams);
  const alertParams = useSelector(state => state.alertParams);
  const handleUser = useSelector(state => state.handleUser);

  const dispatch = useDispatch();

  function windowup() {
    dispatch(updateGeneralParam({arrowVisible:false}));
    window.scroll(0, 0);
  }

  function arrowToggle() {
    if (window.scrollY > 350 && !generalParams.arrowVisible) {
      dispatch(updateGeneralParam({arrowVisible:true}));
    } else if (window.scrollY < 350 && generalParams.arrowVisible) {
      dispatch(updateGeneralParam({arrowVisible:false}));
    }
  }

  function ArrowUp() {
    return (
      <div id='arrow-up' tabIndex='0' className={generalParams.arrowVisible ? 'arrow-up appear' : 'arrow-up'} onClick={windowup}>
        <div></div>
      </div>
    )
  }

  return (
    <div className="App">
      {generalParams.isLoading ?
        <div className='loader'>
          <Loader />
        </div> :
        <>
          <div className='loader hidden'>
            <Loader />
          </div>
          <ArrowUp />
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
