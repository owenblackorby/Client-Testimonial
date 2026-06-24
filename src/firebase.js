import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Go to console.firebase.google.com → your project → Project Settings → Your apps
// Copy the firebaseConfig object and paste the values below
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
