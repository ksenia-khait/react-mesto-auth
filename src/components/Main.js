import React, {useEffect, useState} from 'react';
import {api} from '../utils/Api.js'
import Card from "./Card.js";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getProfile()
            .then(res => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then(cardList => {
                const formattedData = cardList.map(card => {
                    return {
                        name: card.name,
                        link: card.link,
                        likes: card.likes,
                        cardId: card._id
                    }
                })
                setCards(formattedData)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <main className="content">

            <section className="intro">
                <div className="intro__profile">

                    <div className="intro__image" style={{backgroundImage: `url(${userAvatar})`}}>
                        <div className="intro__image-hovered" onClick={onEditAvatar}></div>
                    </div>
                    <div className="intro__description">
                        <div className="intro__name-box">
                            <h1 className="intro__name">{userName}</h1>
                            <button className="intro__edit" onClick={onEditProfile}></button>
                        </div>
                        <p className="intro__capture">{userDescription}</p>
                    </div>
                </div>

                <button className="intro__add-button" onClick={onAddPlace}></button>
            </section>

            <section className="grid">
                {
                    cards.map((card) => {
                        return (
                            <Card card={card} key={card.cardId} onCardClick={onCardClick}/>
                        );
                    })
                }
            </section>
        </main>
    );
}

export default Main;