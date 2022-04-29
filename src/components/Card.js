import React from 'react';


function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card)
    }

    return (
        <div className="grid__item">
            <div className="grid__trash"/>
            <img className="grid__image" alt={card.name} src={card.link} onClick={handleClick}/>
            <div className="grid__text-box">
                <h2 className="grid__text">{card.name}</h2>
                <div className="grid__heart-container">
                    <button className="grid__heart"></button>
                    <span className="grid__heart_counter">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;