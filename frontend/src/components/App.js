import logo from '../assets/Groupomania_Logos/icon.png';
import Header from './Header';
import Footer from './Footer';
/* import SubscribeForm from './SubscribeForm'; */
import ConnectForm from './ConnectForm';


const App = () => {
    return (
      <div>
        <Header />
        <main>
          {/* <SubscribeForm /> */}
          <ConnectForm />
          <img src={logo} alt='Groupomania' />
        </main>
        <Footer />
      </div>
    )
}

export default App;