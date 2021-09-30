import brandLogo from '../assets/Groupomania_Logos/icon-decoupe.png';

export default function Loader() {
  return (
    <div className='loader__anim'>
      <div className="anim1">
      </div>
      <div className='loader__logo'>
        <img src={brandLogo} alt='Groupomania brand' />
      </div>
    </div>
  );
}