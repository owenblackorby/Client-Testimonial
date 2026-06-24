import StarRating from './StarRating'

const BADGE_CLASS = {
  Bought: 'badge-bought',
  Sold: 'badge-sold',
  Both: 'badge-both',
}

function formatDate(ts) {
  if (!ts) return ''
  const date = ts?.toDate ? ts.toDate() : new Date(ts)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}

export default function TestimonialCard({ testimonial }) {
  const { name, rating, message, propertyType, createdAt } = testimonial

  return (
    <article className="testimonial-card">
      <div className="card-top">
        <div className="card-avatar">{initials(name)}</div>
        <div className="card-meta">
          <div className="card-name">{name}</div>
          <div className="card-date">{formatDate(createdAt)}</div>
        </div>
        {propertyType && (
          <span className={`card-badge ${BADGE_CLASS[propertyType] || ''}`}>
            {propertyType}
          </span>
        )}
      </div>

      <StarRating value={rating} readOnly />

      <p className="card-quote">{message}</p>
    </article>
  )
}
