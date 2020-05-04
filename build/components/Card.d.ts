import React from 'react';
interface CardProps {
    x: number;
    y: number;
    r: number;
    s: number;
    z: number;
    index: number;
}
declare const Card: React.FC<CardProps>;
export default Card;
