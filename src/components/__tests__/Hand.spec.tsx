import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Hand } from '../../index'

test('Renders', async () => {
  const { getByRole } = render(<Hand cards={[]} />)
  expect(getByRole('container')).toHaveTextContent('The Hand Component')
})
