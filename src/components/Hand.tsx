import * as React from 'react'
import Card from './Card'
import { calculateTransformations } from '../utils'

interface Card {
  image: string
}

interface Props {
  cards: Array<Card>
}


const Hand: React.FC<Props> = ({ cards }) => {
  const { length } = cards
  const transformations = calculateTransformations(length)
  console.log({ transformations })
  return (
    <div role='container'>
      The Hand Component, dude
      {transformations.map((ts, index) => <Card key={index} index={index} {...ts}/>)}
    </div>
  )
}

export default Hand
