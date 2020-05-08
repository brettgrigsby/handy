import * as React from 'react'
import Card from './Card'
import { calculateTransformations } from '../utils'

type CardClickInput = {
  id: string
  position: {
    x: number
    y: number
  }
}

type CardHandleClickFunction = (input: CardClickInput) => void

interface Card {
  id: string
  imgSrc: string
  cardText: string
  handleClick: CardHandleClickFunction
}

interface Props {
  cards: Array<Card>
  height: number
}

const Hand: React.FC<Props> = ({ cards, height }) => {
  const { length } = cards
  const transformations = calculateTransformations(length)
  return (
    <>
      <div role='container' className='hand'>
        {transformations.map((ts, index) => {
          const { id, imgSrc, cardText, handleClick } = cards[index]
          return (
            <Card
              key={`card=${id}`}
              id={id}
              imgSrc={imgSrc}
              cardText={cardText}
              handleClick={handleClick}
              {...ts}
            />
          )
        })}
      </div>
      <style jsx>{`
        .hand {
          position: relative;
          height: ${height || 600}px;
        }
      `}</style>
    </>
  )
}

export default Hand
