import React, {useEffect, useState} from "react";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Header from './Header';
import Main from './Main';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Footer from './Footer';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);


    useEffect(() => {
        api.getProfile()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then((cards) => setCards(cards))
            .catch(err => console.log(err))
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        const changeLikeCardStatus = !isLiked
            ? api.addLike(card._id)
            : api.deleteLike(card._id)
        changeLikeCardStatus
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(err))
    }

    function handleUpdateUser(name, about) {
        api.editProfile(name, about)
            .then((item) => {
                setCurrentUser(item);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch(err => console.log(err))
    }

    function handleUpdateAvatar(avatar) {
        api.editAvatar(avatar.avatar)
            .then((item) => {
                setCurrentUser(item);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleAddPlaceSubmit(name, link) {
        api.addCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards])
            })
            .catch(err => console.log(err))
    }

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
        setSelectedCard(null);

    }

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Header/>
                    <Main
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}>
                    </Main>
                    <Footer/>
                </div>

                <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                  onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen}
                               onClose={closeAllPopups}
                               buttonText={'Сохранить'}
                               onAddPlace={handleAddPlaceSubmit}/>

                <PopupWithForm title={"Вы уверены?"}
                               name={"image"}
                               onClose={closeAllPopups}
                               buttonText={"Да"}>


                </PopupWithForm>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                 onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>

                <ImagePopup card={selectedCard}
                            onClose={closeAllPopups}/>

            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
