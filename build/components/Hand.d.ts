import * as React from 'react';
interface Card {
    image: string;
}
interface Props {
    cards: Array<Card>;
}
declare const Hand: React.FC<Props>;
export default Hand;
