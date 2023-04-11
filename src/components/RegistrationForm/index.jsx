import InputForm from '../InputForm'
import Button from '../Button'

import './style.css'

const RegistrationForm = () => {
  return (
    <div>
      <InputForm type='text' placeholder='Электронная почта' />
      <InputForm type='password' placeholder='Пароль' />
      <InputForm type='password' placeholder='Повторите пароль' />
      <Button>Зарегистрироваться</Button>
      <a href='/login'>Я уже зарегистрирован(а)</a>
    </div>
  )
}

export default RegistrationForm
