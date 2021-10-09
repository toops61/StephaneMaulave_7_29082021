export default function AlertPopup(props) {

    return (
        <div className='alert-popup' id='alert-popup' style={!props.isVisible ? { display: 'none' } : { display: 'block' }}>
            <div className='alert-popup__window'>
                <h3>Attention !</h3>
                <p>{props.messagealert}</p>
                <button className='alert-popup__window__btn' onClick={() => props.alertToggle('')}>fermer</button>
            </div>
        </div>
    )
}