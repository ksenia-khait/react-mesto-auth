import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [])

    function handleSubmit(e) {
        e.preventDefault(e);
        onAddPlace(name, link);
    }

    return (
        <PopupWithForm title={"Новое место"}
                       name={"new-item"}
                       isOpen={isOpen}
                       onClose={onClose}
                       buttonText={'Сохранить'}
                       onSubmit={handleSubmit}
                       onAddPlace={onAddPlace}>
            <input
                type="text"
                className="form__name new-item-form__name form__input"
                name="name"
                id="card-name"
                minLength="2"
                maxLength="30"
                placeholder="Название"
                required
                onChange={handleChangeName}
            />
            <span id="card-name-error" className="error"></span>
            <input
                type="url"
                className="form__capture new-item-form__capture form__input"
                name="src"
                id="image-link"
                placeholder="Ссылку на картинку"
                required
                onChange={handleLinkChange}
            />
            <span id="image-link-error" className="error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
