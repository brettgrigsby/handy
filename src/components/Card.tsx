import * as React from 'react'

interface CardProps {
  x: number
  y: number
  r: number
  s: number
  z: number
  hover: boolean
  index: number
}

const Card: React.FC<CardProps> = ({ x, y, z, r, s, hover, index }) => {
  return(
    <>
      <div className={'card' + index}>The Card Component</div>
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
          transform: translateX(${x}px) translateY(${y}px) rotate(${r}deg) scale(${s}, ${s});
          z-index: ${z};
          box-shadow: ${hover ? '3px 3px 12px 1px' : '1px 1px 3px 0px'} #282828;
        }
      `}</style>
    </>
  )
}

export default Card
