import { useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { useTestimonials } from '../hooks/useTestimonials'

// Change this password to something of your choosing
const ADMIN_PASSWORD = 'jimmaloof'

const SESSION_KEY = 'owen_admin_session'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [filter, setFilter] = useState('all')

  const { testimonials, approveTestimonial, deleteTestimonial } = useTestimonials()

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
    } else {
      setLoginError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }

  if (!authed) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <h1>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Owen Blackorby &mdash; <span>Admin</span>
          </h1>
          <Link to="/">
            <button className="btn btn-ghost btn-sm">← Back to site</button>
          </Link>
        </div>
        <div className="admin-login">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" strokeWidth="1.5" style={{margin: '0 auto 16px'}}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <h2>Admin Login</h2>
          <p>Enter your password to manage testimonials.</p>
          {loginError && <div className="login-error">{loginError}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="pass">Password</label>
              <input
                id="pass"
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setLoginError('') }}
                placeholder="Enter password"
                autoFocus
              />
            </div>
            <button type="submit" className="submit-btn" style={{width: '100%', justifyContent: 'center'}}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  const pending = testimonials.filter(t => !t.approved)
  const approved = testimonials.filter(t => t.approved)

  const visible = filter === 'pending'
    ? pending
    : filter === 'approved'
      ? approved
      : testimonials

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Owen Blackorby &mdash; <span>Testimonial Admin</span>
        </h1>
        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
          <Link to="/">
            <button className="btn btn-ghost btn-sm">← Back to site</button>
          </Link>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Log out</button>
        </div>
      </div>

      <div className="admin-body">
        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="number navy">{testimonials.length}</div>
            <div className="label">Total</div>
          </div>
          <div className="admin-stat-card">
            <div className="number" style={{color: '#b37f00'}}>{pending.length}</div>
            <div className="label">Pending</div>
          </div>
          <div className="admin-stat-card">
            <div className="number green">{approved.length}</div>
            <div className="label">Approved</div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters">
          {['all', 'pending', 'approved'].map(f => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? `All (${testimonials.length})` : f === 'pending' ? `Pending (${pending.length})` : `Approved (${approved.length})`}
            </button>
          ))}
        </div>

        {/* List */}
        {visible.length === 0 ? (
          <div className="empty-admin">
            <p>No testimonials in this category yet.</p>
          </div>
        ) : (
          visible.map(t => (
            <div key={t.id} className={`admin-testimonial-row ${t.approved ? 'approved' : 'pending'}`}>
              <div className="admin-row-top">
                <div style={{display:'flex', alignItems:'center', gap:'12px', flex:1}}>
                  <div className="card-avatar" style={{width:40, height:40, fontSize:14}}>
                    {initials(t.name)}
                  </div>
                  <div className="admin-row-info">
                    <div className="admin-row-name">{t.name}</div>
                    {t.email && <div className="admin-row-email">{t.email}</div>}
                  </div>
                </div>
                <div className="admin-row-meta">
                  <StarRating value={t.rating} readOnly />
                  {t.propertyType && (
                    <span className="card-badge" style={{background:'#f0f0f0', color:'#555'}}>
                      {t.propertyType}
                    </span>
                  )}
                  <span className={`status-badge ${t.approved ? 'status-approved' : 'status-pending'}`}>
                    {t.approved ? 'Approved' : 'Pending'}
                  </span>
                  <span style={{fontSize:12, color:'#888'}}>{formatDate(t.createdAt)}</span>
                </div>
              </div>

              <p className="admin-row-quote">"{t.message}"</p>

              <div className="admin-row-actions">
                {!t.approved && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => approveTestimonial(t.id)}
                  >
                    ✓ Approve &amp; Publish
                  </button>
                )}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (window.confirm(`Delete testimonial from ${t.name}?`)) {
                      deleteTestimonial(t.id)
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
