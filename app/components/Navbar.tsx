'use client'

import Link from 'next/link'
import { useCart } from '../CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { cart } = useCart()
  const itemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="site-navbar">
      <Link href="/" className="site-navbar__brand" onClick={() => setMenuOpen(false)}>
        Baby Products
      </Link>

      <button
        type="button"
        className="site-navbar__toggle"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="site-navbar-links"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        id="site-navbar-links"
        className={`site-navbar__links${menuOpen ? ' site-navbar__links--open' : ''}`}
      >
        <Link href="/" className="site-navbar__link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          href="/cart"
          className="site-navbar__link site-navbar__cart"
          onClick={() => setMenuOpen(false)}
        >
          Cart <span className="site-navbar__count">{itemCount}</span>
        </Link>
        <Link
          href="/admin/login"
          className="site-navbar__link site-navbar__admin"
          onClick={() => setMenuOpen(false)}
        >
          Admin
        </Link>
      </div>
    </nav>
  )
}
