import InputForm from '../InputForm'
import Button from '../Button'
import { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../firebase.jsx'
import { useNavigate } from 'react-router-dom'

import './style.css'

const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [isRegistered, setIsRegistered] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [invalidLogin, setInvalidLogin] = useState(false)

  //Если пользователь уже вошел, происходит перенаправление на домашнюю страницу
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) navigate('/home')
    })
  })

  //Изменение состояния email
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  //Изменение состояния password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  //Изменение состояния ConfirmPassword (подтверждение пароля)
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  //Вход по почте и паролю
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/home') //переход на домашнюю страницу при успешном входе
      })
      .catch(handleInvalidLogin)
  }

  //Изменение состояния неправильно введенных данных при логине
  const handleInvalidLogin = () => {
    console.log('handle применен')
    setInvalidLogin((invalidLogin) => !invalidLogin)
  }

  //Изменение состояния зарегистрирован или нет + обнуление состоянийы
  const handleIsRegistered = () => {
    setIsRegistered((isRegistered) => !isRegistered)
    setEmail((email) => '')
    setPassword((password) => '')
    setConfirmPassword((confirmPassword) => '')
    setInvalidLogin((invalidLogin) => false)
  }

  //Регистрация пользователя и перенаправление на домашнюю страницу
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/home')
      })
      .catch(handleInvalidLogin)
  }
  return (
    <div className='loginform'>
      {isRegistered ? ( //Зарегистрирован ли?
        //Форма логина
        <div>
          <InputForm
            type='text'
            placeholder='Электронная почта'
            onChange={handleEmailChange}
            value={email}
          />
          <InputForm
            type='password'
            placeholder='Пароль'
            onChange={handlePasswordChange}
            value={password}
          />
          {invalidLogin ? <div>Невернно введена почта или пароль</div> : null}
          <Button onClick={handleSignIn}>Войти</Button>
          <div onClick={handleIsRegistered}>Зарегистрироваться</div>
        </div>
      ) : (
        //Форма регистрации
        <div>
          <InputForm
            type='text'
            placeholder='Электронная почта'
            onChange={handleEmailChange}
            value={email}
          />
          <InputForm
            type='password'
            placeholder='Пароль'
            onChange={handlePasswordChange}
            value={password}
          />
          <InputForm
            type='password'
            placeholder='Повторите пароль'
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
          />
          {invalidLogin ? <div>Невернно введена почта или пароль</div> : null}
          {password === confirmPassword || confirmPassword === '' ? ( //Проверка на совпадение паролей
            <Button onClick={handleRegister}>Зарегистрироваться</Button>
          ) : (
            <div>
              <div>Пароли не совпадают</div>
              <Button disabled>Зарегистрироваться</Button>
            </div>
          )}
          <div onClick={handleIsRegistered}>Я уже зарегистрирован(а)</div>
        </div>
      )}
    </div>
  )
}

export default AuthForm
