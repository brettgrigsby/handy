import * as React from 'react';
import Card from './Card';
declare type CardClickInput = {
    id: string;
    position: {
        x: number;
        y: number;
    };
};
declare type CardHandleClickFunction = (input: CardClickInput) => void;
interface Card {
    id: string;
    imgSrc: string;
    cardText: string;
    handleClick: CardHandleClickFunction;
}
interface Props {
    cards: Array<Card>;
    height: number;
}
declare const Hand: React.FC<Props>;
export default Hand;
