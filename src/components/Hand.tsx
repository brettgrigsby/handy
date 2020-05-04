import * as React from 'react'
import Card from './Card'
import { calculateTransformations } from '../utils'

interface Card {
  imgSrc: string
  cardText: string
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
        {transformations.map((ts, index) => (
          <Card
            key={`card=${index}`}
            index={index}
            imgSrc={cards[index].imgSrc}
            cardText={cards[index].cardText}
            {...ts}
          />
        ))}
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
