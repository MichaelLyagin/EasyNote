import Button from '../Button'
import InputForm from '../InputForm'
import { useState } from 'react'
import { uid } from 'uid'
import { set, ref } from 'firebase/database' //набор данных и ссылка
import { auth, db } from '../../firebase.jsx'

import './style.css'

/*ЛБ 10 Медиатор
class NoteLab {
  constructor(noteID, text, dateComplete, fromMediator) {
    this.noteID = noteID
    this.text = text
    this.dateComplete = dateComplete
    this.createDate = new Date()
    this.formMediator = this.formMediator
  }

  newNote() {
    this.formMediator.makeNote(this)
  }
}

class InputMediator {
  constructor() {
    this.notes = []
  }

  addNoteToList(note) {
    this.notes.push(note)
  }

  makeNote(note) {
    this.addNoteToList(note)
    console.log(
      `\nДобавлена новая заметка!\nID:${note.ID}\nТекст:${note.text}\nДата завершения:${note.dateComplete}\nДата создания:${note.createDate}`
    )
  }

  getNotesList() {
    return this.notes
  }
} */

const InputNote = () => {
  const [date, setDate] = useState('') //состояние Даты выполнения заметки
  const [text, setText] = useState('') //состояние Текста заметки
  const current = new Date() //текущая дата
  const cdate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`

  const handleDate = (e) => {
    setDate(e.target.value)
  }

  const handleText = (e) => {
    setText(e.target.value)
  }

  //Функция записи заметки в базу данных
  const writeToDataBase = () => {
    const noteId = uid()
    set(ref(db, `/${auth.currentUser.uid}/${noteId}`), {
      text: text, //Текст заметки
      date: date, //Дата выполнения
      noteId: noteId, //Идентификатор заметки
      createDate: cdate, //Дата создания
    })

    //после доабвления заметки данные очищаются
    setText('')
    setDate('')
  }

  return (
    <div className='input-note'>
      <InputForm
        placeholder='Введите заметку'
        className='input-note__input-text'
        value={text}
        onChange={handleText}
      />

      <div className='input-note__date-and-button'>
        <label>Дата и время:</label>
        <InputForm
          type='datetime-local'
          className='input-note__input-date'
          value={date}
          onChange={handleDate}
        />
        <Button onClick={writeToDataBase}>Добавить</Button>
      </div>
    </div>
  )
}

export default InputNote
