import { render, screen } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import AuthForm from './index.jsx'

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

describe('AuthForm Test', () => {
  it('Wrong password or email', async () => {
    render(<AuthForm />)

    expect(screen.queryByText(/Пароль слишком короткий/i)).toBeNull()
    expect(
      await screen.findByText(/Пароль слишком короткий/i)
    ).toBeInTheDocument()
  })

  it('Change states', async () => {
    render(<AuthForm />)

    expect(screen.queryByDisplayValue(/test3@mail.ru/i)).toBeInTheDocument()
    expect(
      await screen.findByDisplayValue(/test3@mail.ru/i)
    ).toBeInTheDocument()
  })
})
