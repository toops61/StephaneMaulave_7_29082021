export default function AlertPopup() {
    const RemoveClass = () => {
        document.getElementById('alert-popup').classList.remove('appear');
    }
    return (
        <div className='alert-popup' id='alert-popup'>
            <div className='alert-popup__window'>
                <p>
                </p>
                <button className='alert-popup__window__btn' onClick={RemoveClass}>close</button>
            </div>
        </div>
    );
}