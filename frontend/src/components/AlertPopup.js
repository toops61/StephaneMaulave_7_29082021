export default function alertPopup() {
    const RemoveClass = () => {
        document.getElementById('alert-popup').classList.remove('appear');
    }
    return (
        <div className='alert-popup appear' id='alert-popup'>
            <div className='alert-popup__window'>
                <p>hgjhgjhgjhg</p>
                <button className='alert-popup__window__btn' onClick={RemoveClass}>close</button>
            </div>
        </div>
    );
}