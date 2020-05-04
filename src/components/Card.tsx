import React from 'react'
import useHover from '../hooks/useHover'

const HOVER_TRANSFORMATIONS = { y: -40, r: 0, z: 200, s: 1.8 }

type CardHandleClickFunction = (id: number) => void

interface CardProps {
  x: number
  y: number
  r: number
  s: number
  z: number
  cardId: number
  imgSrc: string
  cardText: string
  handleClick: CardHandleClickFunction
}

const Card: React.FC<CardProps> = ({ x, y, z, r, s, cardId, imgSrc, cardText = 'no card image or text', handleClick }) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()

  const currentTransformations = isHovered ?
    HOVER_TRANSFORMATIONS :
    { y, z, r, s }

  const { y: cy, z: cz, r: cr, s:cs } = currentTransformations

  const handleCardClick = () => {
    if (handleClick) handleClick(cardId)
  }

  return(
    <>
      <div
        ref={hoverRef}
        className={'card' + cardId}
        onClick={handleCardClick}
      >
        {!imgSrc && (<p className='card-text'>{cardText}</p>)}
      </div>
      <style jsx>{`
        .card${cardId} {
          position: absolute;
          bottom: 150px;
          left: calc(50% - 80px);
          height: 225px;
          width: 160px;
          border: ${imgSrc ? 'none' : '1px solid black'};
          border-radius: 5px;
          background-color: white;
          background-image: ${imgSrc ? ('url(' + imgSrc + ')') : 'none'}; 
          background-size: cover;
          transition: all .2s ease-in-out;
          transform: translateX(${x}px) translateY(${cy}px) rotate(${cr}deg) scale(${cs}, ${cs});
          z-index: ${cz};
          box-shadow: ${isHovered ? '3px 3px 12px 1px' : '1px 1px 3px 0px'} #282828;
        }
        .card-text {
          padding: 10px;
        }
      `}</style>
    </>
  )
}

export default Card
