import React from 'react';
declare type CardHandleClickFunction = (id: number) => void;
interface CardProps {
    x: number;
    y: number;
    r: number;
    s: number;
    z: number;
    cardId: number;
    imgSrc: string;
    cardText: string;
    handleClick: CardHandleClickFunction;
}
declare const Card: React.FC<CardProps>;
export default Card;
