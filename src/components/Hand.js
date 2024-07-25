import React from 'react';
import Card from './Card';
import './Hand.css';

const Hand = ({cards, isDealer}) => {
    return (
        <div>
            {cards.map((card, index) => {
                if (isDealer && index > 0) {
                    return <Card key={index} card={card} cardBack={true}/>;
                }
                return <Card key={index} card={card}/>;
            })}
        </div>
    );
};

export default Hand;
