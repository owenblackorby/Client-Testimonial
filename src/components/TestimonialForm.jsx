import { useState } from 'react'
import StarRating from './StarRating'

const INITIAL = {
  name: '',
  email: '',
  rating: 0,
  message: '',
  propertyType: '',
}

export default function TestimonialForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Your name is required.'
    if (!form.rating) errs.rating = 'Please select a star rating.'
    if (!form.message.trim()) errs.message = 'Please share your experience.'
    else if (form.message.trim().length < 20) errs.message = 'Please write at least 20 characters.'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setLoading(true)
    try {
      await onSubmit(form)
      setForm(INITIAL)
      setErrors({})
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 6000)
    } catch (err) {
      console.error('Submission failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-card">
      {submitted && (
        <div className="success-banner">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#48BB78"/>
            <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Thank you! Your testimonial has been submitted and is pending review.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Jane Smith"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              className={errors.name ? 'error' : ''}
              autoComplete="name"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="optional">(private)</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="propertyType">
              Transaction <span className="optional">(optional)</span>
            </label>
            <select
              id="propertyType"
              value={form.propertyType}
              onChange={e => set('propertyType', e.target.value)}
            >
              <option value="">Select one…</option>
              <option value="Bought">Bought a home</option>
              <option value="Sold">Sold a home</option>
              <option value="Both">Bought &amp; Sold</option>
            </select>
          </div>
          <div className="form-group">
            <span className="rating-label">Your Rating</span>
            <StarRating value={form.rating} onChange={v => set('rating', v)} />
            {errors.rating && <p className="error-text">{errors.rating}</p>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Experience</label>
          <textarea
            id="message"
            placeholder="Tell others about working with Owen — what made the experience great?"
            value={form.message}
            onChange={e => set('message', e.target.value)}
            className={errors.message ? 'error' : ''}
            rows={5}
          />
          {errors.message && <p className="error-text">{errors.message}</p>}
        </div>

        <div className="form-footer">
          <p className="form-note">Your email will never be displayed publicly.</p>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                Submitting…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
                Submit Testimonial
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
