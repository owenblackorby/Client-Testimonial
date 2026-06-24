import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Go to console.firebase.google.com → your project → Project Settings → Your apps
// Copy the firebaseConfig object and paste the values below
const firebaseConfig = {
  apiKey:            "AIzaSyBGZFXlTbqvLE7OkltZwJl0n5rVl-FnXzk",
  authDomain:        "owen-testimonials.firebaseapp.com",
  projectId:         "owen-testimonials",
  storageBucket:     "owen-testimonials.firebasestorage.app",
  messagingSenderId: "407592249661",
  appId:             "1:407592249661:web:e54fd2f6885074b9067d54",
  measurementId:     "G-V4Y6W9KT8Z",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
