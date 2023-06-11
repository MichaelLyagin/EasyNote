import Header from '../../components/Header'
import InputNote from '../../components/InputNote'
import { useState, useEffect, React } from 'react'
import { auth, db } from '../../firebase.jsx'
import { ref, onValue } from 'firebase/database' //набор данных и ссылка
import Note from '../../components/Note'

import './style.css'

/*ЛБ 9
class NoteLab {
  constructor(noteID, text, dateComplete) {
    this.noteID = noteID
    this.text = text
    this.dateComplete = dateComplete
    this.createDate = new Date()
  }
}

class Data {
  //Singleton
  constructor() {
    if (typeof Data.instance === 'object') {
      return Data.instance
    }
    this.notesLab = []
    Data.instance = this
    return this
  }

  addNote(noteLab) {
    this.notesLab.push(noteLab)
  }

  getData() {
    for (let i = 0; i < this.notesLab.length; i++) {
      console.log(
        'Заметка' +
          '\n' +
          this.notesLab[i].noteID +
          '\n' +
          this.notesLab[i].ownerID +
          '\n' +
          this.notesLab[i].text +
          '\n' +
          this.notesLab[i].dateComplete +
          '\n' +
          this.notesLab[i].createDate +
          '\n'
      )
    }
  }
}

const data1 = new Data()
const data2 = new Data()
*/

/*ЛБ 10 Медиатор
class NoteLab {
  constructor(noteID, text, dateComplete, fromMediator) {
    this.noteID = noteID
    this.text = text
    this.dateComplete = dateComplete
    this.createDate = new Date()
    this.formMediator = fromMediator
  }

  getId() {
    return this.noteID
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
    const noteID = note.getId()
    console.log(
      `Добавленная заметка:\nID: ${noteID}\nТекст: ${note.text}\nДата завершения: ${note.dateComplete}\nДата создания: ${note.createDate}`
    )
  }

  getNotesList() {
    console.log(this.notes)
  }
}
*/

/*ЛБ 11 Фабричный метод
class NoteLab {
  constructor(noteID, text, createdate) {
    this.noteID = noteID
    this.text = text
    this.createDate = createdate
  }
}

class NotificationNoteLab {
  constructor(noteID, text, dateComplete, createdate) {
    this.noteID = noteID
    this.text = text
    this.dateComplete = dateComplete
    this.createDate = createdate
  }
}

class Factory {
  create(noteID, text, dateComplete, createdate) {
    if (dateComplete !== '') {
      return new NotificationNoteLab(noteID, text, dateComplete, createdate)
    }
    if (dateComplete === '') {
      return new NoteLab(noteID, text, createdate)
    }
  }
}
*/

/*ЛБ 12 Абстрактная фабрика
class NoteLab {
  constructor(noteID, text, createdate) {
    this.noteID = noteID
    this.text = text
    this.createDate = createdate
  }
}

class NotificationNoteLab {
  constructor(noteID, text, dateComplete, createdate) {
    this.noteID = noteID
    this.text = text
    this.dateComplete = dateComplete
    this.createDate = createdate
  }
}

function FactoryNN(noteID, text, dateComplete, createdate) {
  return new NotificationNoteLab(noteID, text, dateComplete, createdate)
}

function FactoryN(noteID, text, dateComplete, createdate) {
  return new NoteLab(noteID, text, createdate)
}

function AbstractFactory(dateComplete) {
  return dateComplete === '' ? FactoryN : FactoryNN
}
*/

/*ЛБ 13 Прокси
class DataLab {
  constructor() {
    this.notesArr = []
  }
  add(notes) {
    this.notesArr = notes
  }
  show() {
    if (this.notesArr.length > 0) {
      console.log(this.notesArr)
    }
  }
}
class Security {
  constructor(data) {
    this.data = data
  }

  open(bool, notes) {
    if (bool) {
      this.data.add(notes)
      this.data.show()
    } else {
      console.log('Нет доступа')
    }
  }
}
*/

/*ЛБ 14 Состояние
class NoteStatus {
  constructor(name, nextStatus) {
    this.name = name
    this.nextStatus = nextStatus
  }

  next() {
    return new this.nextStatus()
  }
}
class Unmarked extends NoteStatus {
  constructor() {
    super('unmarked', Yellow)
  }
}
class Yellow extends NoteStatus {
  constructor() {
    super('yellow', Red)
    console.log('Осталось 2 часа!')
  }
}
class Red extends NoteStatus {
  constructor() {
    super('red', Completed)
    console.log('Осталось 30 мин!')
  }
}
class Completed extends NoteStatus {
  constructor() {
    super('completed', Completed)
    console.log('Заметка выполнена!')
  }
}
class NoteLab {
  constructor(noteID, text, createdate) {
    this.noteID = noteID
    this.text = text
    this.createDate = createdate
    this.state = new Unmarked()
  }
  nextState() {
    this.state = this.state.next()
  }
  advice() {
    if (this.state.name === 'completed') {
      console.log('Рекомендуем удалить выполненную заметку.')
    } else {
      console.log('Еще есть время на выполнение это заметки!')
    }
  }
}
*/

/* ЛБ 15 Стратегии
class NoteLab {
  constructor(strategy) {
    this.strategy = strategy
    this.note = null
  }

  setNote(note) {
    this.note = note
  }

  show() {
    return this.strategy(this.note)
  }
}

function noteStrategy(note) {
  console.log(
    `Обычная заметка:\n
    Текст: ${note.text}\n
    Дата создания: ${note.createDate}`
  )
}
function notificationNoteStrategy(note) {
  console.log(
    `Заметка с уведомлением:\n
    Текст: ${note.text}\n
    Дата завершения: ${note.date}\n
    Дата создания: ${note.createDate}`
  )
}
*/

/* ЛБ 16 Легковес
class DateLab {
  constructor(date) {
    this.date = date
  }
}

class NoteLab {
  constructor(noteID, text, createdate) {
    this.noteID = noteID
    this.text = text
    this.createDate = createdate
  }
}

class NotificationNoteLab {
  constructor(noteID, text, dateComplete, createdate) {
    this.noteID = noteID
    this.text = text
    this.dateComplete = dateComplete
    this.createDate = createdate
  }
}

class FlyweightFactory {
  constructor() {
    this.dates = {}
  }

  create(noteID, text, dateComplete, createdate) {
    let date = this.dates[createdate]
    if (date) {
      //Если дата уже существует
      if (dateComplete !== '') {
        return new NotificationNoteLab(noteID, text, dateComplete, date)
      }
      if (dateComplete === '') {
        return new NoteLab(noteID, text, date)
      }
    } else {
      console.count('Добавлена дата')
      //Если даты еще не существует
      this.dates[createdate] = new DateLab(createdate)
      if (dateComplete !== '') {
        return new NotificationNoteLab(
          noteID,
          text,
          dateComplete,
          this.dates[createdate]
        )
      }
      if (dateComplete === '') {
        return new NoteLab(noteID, text, this.dates[createdate])
      }
    }
  }

  getDates() {
    console.log(this.dates)
  }
}
*/

const MainPage = () => {
  const [notes, setNotes] = useState([])

  //Если пользователь уже вошел, происходит перенаправление на домашнюю страницу
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setNotes([]) //Первоначальынй сброс массива заметок перед его наполнением
          const data = snapshot.val() //Данные
          if (data !== null) {
            // eslint-disable-next-line array-callback-return
            Object.values(data).map((note) => {
              //Перебор массива заметок
              setNotes((oldArray) => [...oldArray, note])
            })
          }
        })
      }
    })
    /*ЛБ 9
    notes.map((note) =>
      data1.addNote(new NoteLab(note.noteId, note.text, note.createDate))
    )
    data1.getData()
    data2.getData()*/
  }, [])
  /*ЛБ 10 Медиатор
  const mediator = new InputMediator()
  notes.map((note) => {
    const notelb = new NoteLab(note.noteId, note.text, note.date, mediator)
    notelb.newNote()
  })
  mediator.getNotesList()
  */

  /*ЛБ 11 Фабричный метод
  const factory = new Factory()
  notes.map((note) => {
    const n = factory.create(note.noteId, note.text, note.date, note.createDate)
    console.log(n)
  })
  */

  /*ЛБ 12 Абстрактная фабрика
  notes.map((note) => {
    const af = AbstractFactory(note.date)
    const n = new af(note.noteId, note.text, note.date, note.createDate)
    console.log(n)
  })
  */

  /*ЛБ 13 Прокси
  const data1 = new Security(new DataLab())
  auth.onAuthStateChanged((user) => {
    console.clear()
    data1.open(user, notes)
  })
  */

  /*ЛБ 14 Состояние
  if (notes[0] !== undefined) {
    const notelb = new NoteLab(
      notes[0].noteId,
      notes[0].text,
      notes[0].createDate
    )
    console.log(notelb.state.name)
    notelb.nextState()
    console.log(notelb.state.name)
    notelb.nextState()
    notelb.advice()
    console.log(notelb.state.name)
    notelb.nextState()
    notelb.advice()
    console.log(notelb.state.name)
  }
  */

  /* ЛБ 15 Стратегия
  if (notes[0] !== undefined) {
    const note1 = new NoteLab(noteStrategy)
    const nNote2 = new NoteLab(notificationNoteStrategy)
    const note3 = new NoteLab(noteStrategy)

    note1.setNote(notes[0])
    note3.setNote(notes[1])
    nNote2.setNote(notes[2])

    note1.show()
    nNote2.show()
    note3.show()
  }
  */

  /*ЛБ 16 Легковес
  const factory = new FlyweightFactory()
  let counter = 0
  notes.map((note) => {
    const n = factory.create(note.noteId, note.text, note.date, note.createDate)
    counter++
  })
  if (notes[0] !== undefined) {
    console.log('Кол-во заметок: ' + counter)
    factory.getDates()
  }
  */

  return (
    <div className='main-page'>
      <Header />
      MainPage
      <div className='main-page__input'>
        <InputNote />
      </div>
      {notes.map((note) => (
        <Note
          key={note.noteId}
          noteId={note.noteId}
          text={note.text}
          cdate={note.createDate}
          date={note.date}
        />
      ))}
    </div>
  )
}

export default MainPage
