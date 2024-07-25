import React, {useState, useEffect} from 'react';
import Hand from './Hand';
import {createDeck, dealCard, calculateScore} from '../utils/gameUtils';

const Game = () => {
    const [deck, setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [result, setResult] = useState('');
    const [isDealer, setIsDealer] = useState(true);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const newDeck = createDeck();
        const initialPlayerHand = [dealCard(newDeck), dealCard(newDeck)];
        const initialDealerHand = [dealCard(newDeck), dealCard(newDeck)];
        setDeck(newDeck);
        setPlayerHand(initialPlayerHand);
        setDealerHand(initialDealerHand);
        setPlayerScore(calculateScore(initialPlayerHand));
        setDealerScore(calculateScore(initialDealerHand));
        setGameOver(false);
        setResult('');
        setIsDealer(true);
    };

    const handleHit = () => {
        const newDeck = [...deck];
        const newPlayerHand = [...playerHand, dealCard(newDeck)];
        setPlayerHand(newPlayerHand);
        setPlayerScore(calculateScore(newPlayerHand));
        setDeck(newDeck);

        if (calculateScore(newPlayerHand) > 21) {
            setGameOver(true);
            setResult('You busted!');
        }
    };

    const handleStand = () => {
        let newDealerHand = [...dealerHand];
        let newDealerScore = calculateScore(newDealerHand);
        while (newDealerScore < 17) {
            const newDeck = [...deck];
            newDealerHand = [...newDealerHand, dealCard(newDeck)];
            newDealerScore = calculateScore(newDealerHand);
            setDeck(newDeck);
        }
        setDealerHand(newDealerHand);
        setDealerScore(newDealerScore);
        setIsDealer(false);

        if (newDealerScore > 21) {
            setResult('Dealer busted! You win!');
        } else if (newDealerScore >= playerScore) {
            setResult('Dealer wins!');
        } else {
            setResult('You win!');
        }
        setGameOver(true);
    };

    return (
        <div id="gameArea">
            <div className="hand">
                <h2>Your Hand</h2>
                <Hand cards={playerHand}/>
            </div>
            <div className="hand">
                <h2>Dealer's Hand</h2>
                <Hand cards={dealerHand} isDealer={isDealer}/>
            </div>
            {!gameOver && (
                <>
                    <button onClick={handleHit}>Hit</button>
                    <button onClick={handleStand}>Stand</button>
                </>
            )}
            {gameOver && (
                <>
                    <p className="result">{result}</p>
                    <button onClick={startNewGame}>New Game</button>
                </>
            )}
        </div>
    );
};

export default Game;
