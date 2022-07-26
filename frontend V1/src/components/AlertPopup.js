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
export function ConfirmPopup(props) {

    return (
        <div className='confirm-popup' id='confirm-popup' style={!props.confirmVisible ? { display: 'none' } : { display: 'block' }}>
            <div className='confirm-popup__window'>
                <h2>{props.messagealert}</h2>
                <button className='confirm-popup__window__btn' onClick={() => props.confirmToggle('')}>fermer</button>
            </div>
        </div>
    )
}