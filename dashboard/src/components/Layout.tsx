// ## AGENTS_MD_VERIFIED ##
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import './layout.css'

export default function Layout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`layout ${open ? 'nav-open' : ''}`}>
      <aside className="sidebar" aria-label="Sidebar Navigation">
        <div className="brand">
          <button
            className="hamburger"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="logo">⧉</div>
          <div className="brand-name">InsightBoard</div>
        </div>
        <nav>
          <a className="nav-item active" href="#">Overview</a>
          <a className="nav-item" href="#">Sales</a>
          <a className="nav-item" href="#">Customers</a>
          <a className="nav-item" href="#">Reports</a>
          <a className="nav-item" href="#">Settings</a>
        </nav>
        <div className="sidebar-footer">
          <small>v1.0.0</small>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button
            className="hamburger"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="topbar-actions">
            <input
              className="search"
              placeholder="Search..."
              aria-label="Search"
            />
            <select className="date-range" aria-label="Select date range">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Quarter to date</option>
              <option>Year to date</option>
            </select>
            <div className="avatar" role="img" aria-label="User menu">JD</div>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>

      {open && (
        <div className="backdrop" onClick={() => setOpen(false)} />
      )}
    </div>
  )
}
