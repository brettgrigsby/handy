import * as React from 'react';
import Card from './Card';
interface Card {
    image: string;
}
interface Props {
    cards: Array<Card>;
}
declare const Hand: React.FC<Props>;
export default Hand;
