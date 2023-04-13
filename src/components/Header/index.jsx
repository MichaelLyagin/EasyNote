import Button from '../Button'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import './style.css'

const Header = () => {
  const navigate = useNavigate()

  //Если пользователь не вошел в учетную запись, то на главную он перейти не сможет
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) navigate('/auth')
    })
  })

  //Выход из учетной записи
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/auth')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  return (
    <div>
      <Button onClick={handleSignOut}>Выход</Button>
    </div>
  )
}

export default Header
