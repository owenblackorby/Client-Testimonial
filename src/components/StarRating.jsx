import { useState } from 'react'

export default function StarRating({ value, onChange, readOnly = false }) {
  const [hovered, setHovered] = useState(0)

  const display = hovered || value

  return (
    <div className="stars" role={readOnly ? undefined : 'group'} aria-label={readOnly ? undefined : 'Star rating'}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`star${display >= star ? ' filled' : ''}${readOnly ? ' readonly' : ''}`}
          onClick={() => !readOnly && onChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          role={readOnly ? undefined : 'button'}
          aria-label={readOnly ? undefined : `${star} star`}
          tabIndex={readOnly ? undefined : 0}
          onKeyDown={e => {
            if (!readOnly && (e.key === 'Enter' || e.key === ' ')) onChange?.(star)
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}
