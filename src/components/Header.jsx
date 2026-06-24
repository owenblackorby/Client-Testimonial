import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  return (
    <>
      <div className="top-bar">
        Jim Maloof Realty &nbsp;·&nbsp; Serving Central Illinois Since 1956
      </div>
      <header className="site-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="header-avatar">OB</div>
            <div>
              <div className="header-name">Owen Blackorby</div>
              <div className="header-title">
                REALTOR<sup>®</sup> &nbsp;|&nbsp; <span>Jim Maloof Realty</span>
              </div>
            </div>
          </div>
          <nav className="header-nav">
            <Link to="/#submit">
              <button className="btn btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Leave a Review
              </button>
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
