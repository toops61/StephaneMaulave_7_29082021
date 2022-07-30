import { useDispatch, useSelector } from "react-redux"
import { updateAlertsParam } from "../redux";

export function AlertPopup() {
    const dispatch = useDispatch();

    const alertParams = useSelector(state => state.alertParams);

    const alertToggle = () => {
        dispatch(updateAlertsParam({alertVisible:false,message:''}));
    }

    return (
        <div className='alert-popup' id='alert-popup'>
            <div className='alert-popup__window'>
                <h3>Attention !</h3>
                <p>{alertParams.message}</p>
                <button className='alert-popup__window__btn' onClick={() => alertToggle()}>fermer</button>
            </div>
        </div>
    )
}
export function ConfirmPopup() {
    const dispatch = useDispatch();

    const alertParams = useSelector(state => state.alertParams);

    const confirmToggle = () => {
        dispatch(updateAlertsParam({confirmVisible:false,message:''}));
    }

    return (
        <div className='confirm-popup' id='confirm-popup'>
            <div className='confirm-popup__window'>
                <h2>{alertParams.message}</h2>
                <button className='confirm-popup__window__btn' onClick={() => confirmToggle()}>fermer</button>
            </div>
        </div>
    )
}