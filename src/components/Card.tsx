import React from 'react'
import useHover from '../hooks/useHover'

const HOVER_TRANSFORMATIONS = { x: 0, y: -40, r: 0, z: 200, s: 1.8 }

interface CardProps {
  x: number
  y: number
  r: number
  s: number
  z: number
  index: number
}

const Card: React.FC<CardProps> = ({ x, y, z, r, s, index }) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()

  const currentTransformations = isHovered ?
    HOVER_TRANSFORMATIONS :
    { x, y, z, r, s }

  const { x: cx, y: cy, z: cz, r: cr, s:cs } = currentTransformations

  return(
    <>
      <div
        ref={hoverRef}
        className={'card' + index}
      >
        The Card Component
      </div>
      <style jsx>{`
        .card${index} {
          position: absolute;
          bottom: 150px;
          left: calc(50% - 80px);
          height: 225px;
          width: 160px;
          border: 1px solid black;
          border-radius: 5px;
          background-color: white;
          transition: all .2s ease-in-out;
          transform: translateX(${cx}px) translateY(${cy}px) rotate(${cr}deg) scale(${cs}, ${cs});
          z-index: ${cz};
          box-shadow: ${isHovered ? '3px 3px 12px 1px' : '1px 1px 3px 0px'} #282828;
        }
      `}</style>
    </>
  )
}

export default Card
