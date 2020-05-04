import * as React from 'react'
import Card from './Card'
import { calculateTransformations } from '../utils'

interface Card {
  imgSrc: string
  cardText: string
  handleClick: (id: number) => void
}

interface Props {
  cards: Array<Card>
  height: number
}


// TODO: clean up the way in which props are passed to the Card component
const Hand: React.FC<Props> = ({ cards, height }) => {
  const { length } = cards
  const transformations = calculateTransformations(length)
  return (
    <>
      <div role='container' className='hand'>
        {transformations.map((ts, index) => (
          <Card
            key={`card=${index}`}
            cardId={index}
            imgSrc={cards[index].imgSrc}
            cardText={cards[index].cardText}
            handleClick={cards[index].handleClick}
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
