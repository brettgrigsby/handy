import * as React from 'react'

interface Card {
  image: string
}

interface Props {
  cards: Array<Card>
}

const Hand: React.FC<Props> = ({ cards }) => {
  console.log({ cards })
  return (
    <div role='container'>The Hand Component</div>
  )
}

export default Hand
