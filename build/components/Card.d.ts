import React from 'react';
declare type CardHandleClickFunction = (id: string) => void;
interface CardProps {
    x: number;
    y: number;
    r: number;
    s: number;
    z: number;
    id: string;
    imgSrc: string;
    cardText: string;
    handleClick: CardHandleClickFunction;
}
declare const Card: React.FC<CardProps>;
export default Card;
