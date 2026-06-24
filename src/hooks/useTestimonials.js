import { useState, useEffect } from 'react'
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, query, orderBy, onSnapshot, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

const COL = 'testimonials'

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, COL), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setTestimonials(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [])

  const addTestimonial = (data) =>
    addDoc(collection(db, COL), {
      name: data.name,
      email: data.email || '',
      rating: data.rating,
      message: data.message,
      propertyType: data.propertyType || '',
      approved: false,
      createdAt: serverTimestamp(),
    })

  const approveTestimonial = (id) =>
    updateDoc(doc(db, COL, id), { approved: true })

  const deleteTestimonial = (id) =>
    deleteDoc(doc(db, COL, id))

  const approvedTestimonials = testimonials.filter(t => t.approved)
  const pendingTestimonials  = testimonials.filter(t => !t.approved)

  return {
    testimonials,
    approvedTestimonials,
    pendingTestimonials,
    addTestimonial,
    approveTestimonial,
    deleteTestimonial,
    loading,
  }
}
