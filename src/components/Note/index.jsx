import { useState } from 'react'
import { auth, db } from '../../firebase.jsx'
import { ref, remove, update } from 'firebase/database' //набор данных и ссылка
import classNames from 'classnames'
import Button from '../Button/index.jsx'
import InputForm from '../InputForm/index.jsx'

import './style.css'

const Note = ({ text, date, cdate, noteId, children, className, ...rest }) => {
  const [newText, setNewText] = useState(text) //новый текст заметки
  const [newDate, setNewDate] = useState(date) //новая дата выполнения заметки
  const [updating, setUpdating] = useState(false)

  //Изменение состояния обновления
  const handleUpdating = () => {
    setUpdating((updating) => true)
  }

  const handleDelete = () => {
    remove(ref(db, `/${auth.currentUser.uid}/${noteId}`))
  }

  const handleNewText = (e) => {
    setNewText(e.target.value)
  }

  const handleNewDate = (e) => {
    setNewDate(e.target.value)
  }

  //Обновление данных
  const handleUpdate = () => {
    update(ref(db, `/${auth.currentUser.uid}/${noteId}`), {
      text: newText, //Текст заметки
      date: newDate, //Дата выполнения
      noteId: noteId, //Идентификатор заметки
      createDate: cdate, //Дата создания
    })
    setUpdating((updating) => false)
  }

  return (
    <div className={classNames('note', className)} {...rest}>
      {children}
      <div>
        {updating ? (
          <div>
            <InputForm value={newText} onChange={handleNewText}></InputForm>
            <InputForm
              value={newDate}
              type='datetime-local'
              onChange={handleNewDate}
            ></InputForm>
            {cdate}
            <Button onClick={handleUpdate}>Сохранить</Button>
          </div>
        ) : (
          <div>
            {text}
            <br />
            {date}
            {cdate}
            <Button onClick={handleUpdating}>Изменить</Button>
          </div>
        )}
        <Button onClick={handleDelete}>Удалить</Button>
      </div>
    </div>
  )
}

export default Note
