import React, {useState} from "react";
import Header from './Header';
import Main from './Main';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup"
import Footer from './Footer';


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(false);
    }

    return (
        <>

            <div className="page">
                <Header/>
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}>
                </Main>
                <Footer/>
            </div>

            <PopupWithForm title={"Редактировать профиль"} name={"profile"} isOpen={isEditProfilePopupOpen}
                           onClose={closeAllPopups}>
                <input type="text"
                       className="form__name profile-form__name form__input"
                       name="name"
                       id="profile-name"
                       placeholder="Имя"
                       minLength="2"
                       maxLength="40"
                       required
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

                />
                <span id="profile-capture-error" className="error"></span>
            </PopupWithForm>
            <PopupWithForm title={"Новое место"} name={"new-item"} isOpen={isAddPlacePopupOpen}
                           onClose={closeAllPopups}>
                <input
                    type="text"
                    className="form__name new-item-form__name form__input"
                    name="name"
                    id="card-name"
                    minLength="2"
                    maxLength="30"
                    placeholder="Название"
                    required
                />
                <span id="card-name-error" className="error"></span>
                <input
                    type="url"
                    className="form__capture new-item-form__capture form__input"
                    name="src"
                    id="image-link"
                    placeholder="Ссылку на картинку"
                    required
                />
                <span id="image-link-error" className="error"></span>
            </PopupWithForm>
            <PopupWithForm title={"Вы уверены?"} name={"image"} onClose={closeAllPopups}>
            </PopupWithForm>
            <PopupWithForm title={"Обновить аватар?"} name={"avatar"} isOpen={isEditAvatarPopupOpen}
                           onClose={closeAllPopups}>
                <input
                    type="url"
                    className="form__capture new-item-form__capture form__input "
                    name="src"
                    id="avatar-link"
                    placeholder="Ссылку на картинку"
                    required

                />
                <span id="avatar-link-error" className="error"></span>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        </>
    );
}

export default App;
