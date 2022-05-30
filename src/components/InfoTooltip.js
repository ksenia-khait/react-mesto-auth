import React from "react";
import success from '../images/success-tick.svg'
import fail from '../images/fail-cross.svg'

function InfoTooltip({ isOpen, onClose,  isSignUp }) {

    return (
        <div className={`popup popup_type_info-tool-tip ${isOpen ? "popup_opened" : " "}`}>

            <div className="popup__container  popup__container_type_info-tool-tip">
                <button className="popup__close" id="cross" onClick={onClose}></button>
                <img className="popup__tooltip-img"  src={isSignUp ? success : fail} alt={'Иконка'} />
                <h2 className="popup__text">{isSignUp ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>

            </div>
        </div>
    )
}

export default InfoTooltip;

// <div className={`popup popup_type_info-tool-tip ${isOpen ? "popup_opened" : " "}`}>
// <div className={`popup popup_type_info-tool-tip popup_opened`}>