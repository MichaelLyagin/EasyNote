// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD77p_7Hf5WCI3GCgqXR8PwRjN8vEaB5d4',
  authDomain: 'easynote-2f0ae.firebaseapp.com',
  databaseURL: 'https://easynote-2f0ae-default-rtdb.firebaseio.com',
  projectId: 'easynote-2f0ae',
  storageBucket: 'easynote-2f0ae.appspot.com',
  messagingSenderId: '693653975400',
  appId: '1:693653975400:web:e1d8eb2f2da12b1035e6dd',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth()
