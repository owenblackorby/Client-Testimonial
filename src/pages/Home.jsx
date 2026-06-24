import { useEffect, useRef } from 'react'
import Header from '../components/Header'
import TestimonialForm from '../components/TestimonialForm'
import TestimonialCard from '../components/TestimonialCard'
import { useTestimonials } from '../hooks/useTestimonials'

export default function Home() {
  const { approvedTestimonials, addTestimonial, loading } = useTestimonials()
  const formRef = useRef(null)

  useEffect(() => {
    if (window.location.hash === '#submit') {
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [])

  const avgRating = approvedTestimonials.length
    ? (approvedTestimonials.reduce((s, t) => s + t.rating, 0) / approvedTestimonials.length).toFixed(1)
    : '5.0'

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
            Client Testimonials
          </div>
          <h1>Real Stories from <em>Real Clients</em></h1>
          <p>
            Buying or selling a home is one of life's biggest decisions.
            Hear directly from clients who trusted Owen Blackorby to guide them every step of the way.
          </p>
          <div className="hero-actions">
            <button
              className="btn-hero"
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Share Your Experience
            </button>
            <button
              className="btn-hero-outline"
              onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Read Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="stat-number">{approvedTestimonials.length || '—'}</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{avgRating}</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">20+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Dedicated to You</div>
          </div>
        </div>
      </div>

      {/* Submit Form */}
      <section className="section form-section" id="submit" ref={formRef}>
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Share Your Story</span>
            <h2>How Was Your Experience?</h2>
            <p>
              Your feedback means the world and helps future buyers and sellers
              find the right realtor. Takes just 2 minutes.
            </p>
          </div>
          <TestimonialForm onSubmit={addTestimonial} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section" id="reviews">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Client Reviews</span>
            <h2>What My Clients Are Saying</h2>
            <p>Testimonials from buyers and sellers across Central Illinois.</p>
          </div>

          {loading ? (
            <div className="empty-state">
              <p style={{ color: 'var(--gray)' }}>Loading reviews…</p>
            </div>
          ) : approvedTestimonials.length === 0 ? (
            <div className="empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <p>No reviews yet — be the first to share your experience!</p>
            </div>
          ) : (
            <div className="testimonials-grid">
              {approvedTestimonials.map(t => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-name">Owen Blackorby</div>
        <div className="footer-title">
          REALTOR<sup>®</sup> &nbsp;|&nbsp; <span>Jim Maloof Realty</span>
        </div>
        <div className="footer-links">
          <a href="https://www.jimmaloof.com" target="_blank" rel="noopener noreferrer">Jim Maloof Realty</a>
          <a href="#submit" onClick={e => { e.preventDefault(); formRef.current?.scrollIntoView({ behavior: 'smooth' }) }}>
            Leave a Review
          </a>
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Owen Blackorby &mdash; All rights reserved.
        </div>
      </footer>
    </>
  )
}
