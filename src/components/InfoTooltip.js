import React from "react";

function InfoTooltip({ isOpen, name, onClose, title }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : " "}`}>
            <div className="popup__container container">
                <button className="popup__close" id="cross" onClick={onClose}></button>
                <img src="" alt=""/>
                <p className="popup__text">{title}</p>

            </div>
        </div>
    )
}

export default InfoTooltip;