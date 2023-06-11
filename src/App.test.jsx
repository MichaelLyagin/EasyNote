//8 лаба
import { render, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import AuthPage from './pages/AuthPage/index.jsx'

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

test('full app rendering/navigating', () => {
  render(<AuthPage />)
  expect(screen.getByText(/Зарегистрироваться/i)).toBeInTheDocument()
})
