import React from 'react';
declare type CardClickInput = {
    id: string;
    position: {
        x: number;
        y: number;
    };
};
declare type CardHandleClickFunction = (input: CardClickInput) => void;
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
