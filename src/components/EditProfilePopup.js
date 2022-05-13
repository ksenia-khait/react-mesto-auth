import React, {useState, useContext, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(name, description );
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.description)
    }, []);

    return (
        <PopupWithForm title={"Редактировать профиль"}
                       name={"profile"}
                       isOpen={isOpen}
                       onClose={onClose}
                       buttonText={'Сохранить'}
                       onSubmit={handleSubmit}>

            <input type="text"
                   className="form__name profile-form__name form__input"
                   name="name"
                   id="profile-name"
                   placeholder="Имя"
                   minLength="2"
                   maxLength="40"
                   required
                   onChange={handleNameChange}
            />
            <span id="profile-name-error" className="error"></span>
            <input
                type="text"
                className="form__capture profile-form__capture form__input"
                name="capture"
                id="profile-capture"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                onChange={handleDescriptionChange}
            />
            <span id="profile-capture-error" className="error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup