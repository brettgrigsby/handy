import * as React from 'react';
interface CardProps {
    x: number;
    y: number;
    r: number;
    s: number;
    z: number;
    hover: boolean;
    index: number;
}
declare const Card: React.FC<CardProps>;
export default Card;
