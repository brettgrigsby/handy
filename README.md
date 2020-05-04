# react-handy

A typescript React component for displaying and interacting with a hand of cards

### Usage

Import the Hand component then pass it a collection of cards. You can optionally pass a height to
the Hand component (default 600px). Make sure your cards have either `cardText` or an `imgSrc`. If
an `imgSrc` is passed in, the card will display the image and ignore any `cardText` that has been
included.

```js
import { Hand } from 'react-handy'

const MyComponent = () => {
  // define a set of cards
  const cards = [
    { id: 'card1', imgSrc: 'some-url' },
    { id: 'card2', imgSrc: 'another-url' },
    { id: 'card3', cardText: 'some text to display on the card' },
    { id: 'card4', imgSrc: 'yet-another-url', cardText: 'this text will not display' }
  ]

  // add a function to each card that fires onClick
  for (card of cards) {
    card.handleClick = (cardId) => console.log('clicked on card with id: ', cardId)
  }

  return (
    <Hand cards={cards} />
  )
}
```

You must supply a unique id with each card (for now).

You may add an arbitrary number of cards to a Hand, but allowing large numbers of cards in a player's
hand is not just bad game design, it will also result in choppy animations and difficulty selecting
the correct card.

Ongoing development will focus on solving these issues around UX and performance,
but this package does not seek to enforce arbitrary restrictions on what you decide to do.

### Example

[Here's a simple NextJs app](https://github.com/brettgrigsby/handy-example) that uses the Handy library.
