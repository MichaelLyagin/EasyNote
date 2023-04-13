import Header from '../../components/Header'
import InputNote from '../../components/InputNote'
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebase.jsx'
import { ref, onValue } from 'firebase/database' //набор данных и ссылка
import Note from '../../components/Note'

import './style.css'

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
  }, [])

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
