export default function alertPopup(alertMessage) {
    const RemoveClass = () => {
        document.getElementById('alert-popup').classList.remove('appear');
    }
    return (
        <div className='alert-popup appear' id='alert-popup'>
            <div className='alert-popup__window'>
                <p>{alertMessage}</p>
                <button className='alert-popup__window__btn' onClick={RemoveClass}>close</button>
            </div>
        </div>
    );
}