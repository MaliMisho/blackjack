export const suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
export const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

export const createDeck = () => {
    let deck = [];
    while (deck.length < 260) {
        for (let suit of suits) {
            for (let value of values) {
                deck.push({suit, value});
            }
        }
    }
    shuffleDeck(deck);
    return deck;
};

const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
};

export const dealCard = (deck) => {
    return deck.pop();
};

export const getCardValue = (card) => {
    if (['Jack', 'Queen', 'King'].includes(card.value)) {
        return 10;
    } else if (card.value === 'Ace') {
        return 11;
    } else {
        return parseInt(card.value);
    }
};

export const calculateScore = (hand) => {
    let score = 0;
    let aceCount = 0;
    for (let card of hand) {
        score += getCardValue(card);
        if (card.value === 'Ace') {
            aceCount++;
        }
    }
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
};
