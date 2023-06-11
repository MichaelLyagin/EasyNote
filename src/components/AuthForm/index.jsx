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

const promise1 = Promise.resolve('dfr')
const register = Promise.resolve(false)

const AuthForm = (invalidLog) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [isRegistered, setIsRegistered] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [invalidLogin, setInvalidLogin] = useState(false)
  const [warning, setWarning] = useState('')
  const [pas, setPas] = useState()
  const [reg, setReg] = useState()

  //Если пользователь уже вошел, происходит перенаправление на домашнюю страницу
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) navigate('/home')
    })
  })

  /*useEffect(() => {
    const minLength = async () => {
      const pas = await promise1
      setPas(pas)
      if (pas.length < 4 && pas !== '') {
        setWarning('Пароль слишком короткий')
      } else {
        setWarning(null)
      }
    }
    minLength()
  })*/

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
    setInvalidLogin((invalidLogin) => !invalidLogin)
  }

  //Проверка длины пароля

  //Изменение состояния зарегистрирован или нет + обнуление состоянийы
  const handleIsRegistered = () => {
    setIsRegistered((isRegistered) => !isRegistered)
    setEmail((email) => '')
    setPassword((password) => '')
    setConfirmPassword((confirmPassword) => '')
    setInvalidLogin((invalidLogin) => false)
  }
  //Функция для теста
  const [count, setCount] = useState(0)
  useEffect(() => {
    const regtr = async () => {
      if (count <= 0) {
        const reg = await register
        setReg((reg) => !reg)

        setEmail((email) => '')
        setPassword((password) => '')
        setCount((count) => count + 1)
      }
    }
    regtr()
  })

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
        //Форма для логина
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
          <div>{warning}</div>
          {invalidLogin ? (
            <div className='warning'>Неверно введена почта или пароль</div>
          ) : null}
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
          {warning}
          <InputForm
            type='password'
            placeholder='Повторите пароль'
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
          />
          {warning}
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
