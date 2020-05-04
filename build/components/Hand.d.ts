import * as React from 'react';
import Card from './Card';
interface Card {
    imgSrc: string;
    cardText: string;
    handleClick: (id: number) => void;
}
interface Props {
    cards: Array<Card>;
    height: number;
}
declare const Hand: React.FC<Props>;
export default Hand;
