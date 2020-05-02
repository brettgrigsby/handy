import * as React from 'react'

interface Card {
  image: string
}

interface Props {
  cards: Array<Card>
}

const Hand: React.FC<Props> = () => (
  <div role='heading'>My First Component</div>
)

export default Hand
