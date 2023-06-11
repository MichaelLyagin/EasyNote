import { render, screen } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import Button from './index.jsx'

const mockText = 'Тест'

describe('Button test', () => {
  it('Button render', () => {
    render(<Button>{mockText}</Button>)

    expect(screen.getByText(mockText)).toBeInTheDocument()
  })
})
