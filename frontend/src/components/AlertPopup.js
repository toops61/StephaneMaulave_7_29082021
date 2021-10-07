import React, { useEffect, useState } from "react";

export default class AlertPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: this.props.isVisible
        }
    }

    RemoveClass = () => {
        this.setState = ({ isVisible: false })
        //document.getElementById('alert-popup').classList.remove('appear');
    }

    render() {

        let classePop = 'alert-popup';

        return (
            <div className={classePop} id='alert-popup'>
                <div className='alert-popup__window'>
                    <p>texte</p>
                    <button className='alert-popup__window__btn' onClick={this.RemoveClass}>close</button>
                </div>
            </div>
        )
    }
}
/* export default function AlertPopup() {
    const [isOpen, setIsOpen] = useState(true);

    return isOpen ? (
        <div className='alert-popup appear' id='alert-popup'>
            <div className='alert-popup__window'>
                <p>texte</p>
                <button className='alert-popup__window__btn' onClick={setIsOpen(false)}>close</button>
            </div>
        </div>
    ) : (
        <div className='alert-popup' id='alert-popup'>
        </div>
    )
} */