import React from 'react';


function PopupWithForm({title, name,  isOpen, onClose, children}) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : " "}`}>
            <div className="popup__container container">
                <button className="popup__close" id="cross" onClick={onClose}></button>
                <p className="popup__text">{title}</p>
                <form className={`form popup__form_${name}`} name="form" noValidate>
                    {children}
                    <input
                        type="submit"
                        className="form__button"
                        name="button"
                        value="Сохранить"
                        onClick={onClose}
                    />
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;