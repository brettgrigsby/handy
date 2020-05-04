import * as React from 'react';
import Card from './Card';
interface Card {
    id: string;
    imgSrc: string;
    cardText: string;
    handleClick: (id: string) => void;
}
interface Props {
    cards: Array<Card>;
    height: number;
}
declare const Hand: React.FC<Props>;
export default Hand;
