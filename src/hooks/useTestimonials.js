import { useState, useEffect } from 'react'

const STORAGE_KEY = 'owen_blackorby_testimonials'

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials))
  }, [testimonials])

  const addTestimonial = (data) => {
    const entry = {
      id: Date.now(),
      name: data.name,
      email: data.email || '',
      rating: data.rating,
      message: data.message,
      propertyType: data.propertyType || '',
      approved: false,
      createdAt: new Date().toISOString(),
    }
    setTestimonials(prev => [entry, ...prev])
    return entry
  }

  const approveTestimonial = (id) => {
    setTestimonials(prev =>
      prev.map(t => t.id === id ? { ...t, approved: true } : t)
    )
  }

  const deleteTestimonial = (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id))
  }

  const approvedTestimonials = testimonials.filter(t => t.approved)
  const pendingTestimonials = testimonials.filter(t => !t.approved)

  return {
    testimonials,
    approvedTestimonials,
    pendingTestimonials,
    addTestimonial,
    approveTestimonial,
    deleteTestimonial,
  }
}
