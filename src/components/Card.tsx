import React, { useEffect, useState } from 'react'
import useHover from '../hooks/useHover'

const DEFAULT_HOVER_TRANSFORMATIONS = { y: -40, r: 0, z: 200, s: 1.8 }

type CardClickInput = {
  id: string
  position: {
    x: number
    y: number
  }
}

type CardHandleClickFunction = (input: CardClickInput) => void

interface CardProps {
  x: number
  y: number
  r: number
  s: number
  z: number
  id: string
  imgSrc: string
  cardText: string
  handleClick: CardHandleClickFunction
}

type ListenerEvent = {
  screenX: number
  screenY: number
}

let heldListener: (e: ListenerEvent) => void

const Card: React.FC<CardProps> = ({ x, y, z, r, s, id, imgSrc, cardText = 'no card image or text', handleClick }) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const [hoverTransformations, setHoverTransformations] = useState({ ...DEFAULT_HOVER_TRANSFORMATIONS, x })
  const [isHeld, setIsHeld] = useState(false)

  const currentTransformations = (isHovered || isHeld) ?
    hoverTransformations :
    { y, z, r, s, x }

  useEffect(() => {
    setHoverTransformations({ ...DEFAULT_HOVER_TRANSFORMATIONS, x })
  }, [x])

  const { x: cx, y: cy, z: cz, r: cr, s: cs } = currentTransformations

  const handleCardClick = (e: ListenerEvent) => {
    const { screenX, screenY } = e
    if (isHeld) {
      document.removeEventListener('mousemove', heldListener)
      setIsHeld(false)
      setHoverTransformations({ ...DEFAULT_HOVER_TRANSFORMATIONS, x })
      handleClick({ id: id, position: { x: screenX, y: screenY }})
    } else {
      heldListener = updateHoverTransformations(screenX, screenY)
      document.addEventListener('mousemove', heldListener)
      setIsHeld(true)
      setHoverTransformations({ ...DEFAULT_HOVER_TRANSFORMATIONS, x })
    }
  }

  const updateHoverTransformations = (baseX: number, baseY: number) => (e: ListenerEvent) => {
    const { screenX, screenY } = e
    const xDiff = screenX - baseX
    const yDiff = screenY - baseY
    const { y, z, r, s } = DEFAULT_HOVER_TRANSFORMATIONS
    setHoverTransformations({ z, r, s, y: (y + yDiff), x: (x + xDiff) })
  }

  return(
    <>
      <div
        ref={hoverRef}
        className={'card' + id}
        onClick={handleCardClick}
      >
        {!imgSrc && (<p className='card-text'>{cardText}</p>)}
      </div>
      <style jsx>{`
        .card${id} {
          position: absolute;
          bottom: 150px;
          left: calc(50% - 80px);
          height: 225px;
          width: 160px;
          border: ${imgSrc ? 'none' : '1px solid black'};
          border-radius: 10px;
          background-color: white;
          background-image: ${imgSrc ? ('url(' + imgSrc + ')') : 'none'}; 
          background-size: 100% 100%;
          transition: ${isHeld ? 'none' : 'all .2s ease-in-out'};
          transform: translateX(${cx}px) translateY(${cy}px) rotate(${cr}deg) scale(${cs}, ${cs});
          z-index: ${cz};
          box-shadow: ${isHovered ? '3px 3px 12px 1px' : '1px 1px 3px 0px'} #282828;
          cursor: ${isHeld ? 'grabbing' : 'grab'};
        }
        .card-text {
          padding: 10px;
        }
      `}</style>
    </>
  )
}

export default Card
