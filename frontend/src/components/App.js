import logo from '../assets/Groupomania_Logos/icon.png';
import Header from './Header';
import Footer from './Footer';

const App = () => {
    return (
      <div>
        <Header />
        <main>
            <img src={logo} alt='Groupomania' />
        </main>
        <Footer />
      </div>
    )
}

export default App;