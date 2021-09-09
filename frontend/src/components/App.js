import Header from './Header';
import Loader from './Loader';
/* import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; */

/* const App = () => {
    return (
      <div>
        <Header />
        <main>
          <ConnectForm />
          <img src={logo} alt='Groupomania' />
        </main>
        <Footer />
      </div>
    )
}

export default App; */

export default function App() {
  return (
    <div>
      <div className='loader hidden'>
        <Loader />
      </div>
      <Header />
    </div>
  );
}
