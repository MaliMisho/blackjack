import React from 'react';
import './Card.css';

const Card = ({card, cardBack}) => {
    // Switch statement to determine card image. Need to check suit and value.
    if (cardBack) {
        return (
            <div className="card">
                <img src={`/cards/CB.jpg`} width="125" height="175"/>
            </div>
        );
    }
    let cardImage = '';
    switch (card.suit) {
        case 'Hearts':
            cardImage += 'H';
            break;
        case 'Clubs':
            cardImage += 'C';
            break;
        case 'Diamonds':
            cardImage += 'D';
            break;
        case 'Spades':
            cardImage += 'S';
            break;
        default:
            break;
    }
    switch (card.value) {
        case 'Ace':
            cardImage += 'A';
            break;
        case 'Jack':
            cardImage += 'J';
            break;
        case 'Queen':
            cardImage += 'Q';
            break;
        case 'King':
            cardImage += 'K';
            break;
        default:
            cardImage += card.value;
            break;
    }


    return (
        <div className="card">
            <img src={`/cards/${cardImage}.jpg`} width="125" height="175" alt={cardImage}/>
        </div>
    );
};

export default Card;
