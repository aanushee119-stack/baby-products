'use client'

import Link from 'next/link'
import { useContext, useState } from 'react'
import { CartContext } from '../CartContext'

export default function Navbar() {
  const { cart } = useContext(CartContext)
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link href="/" style={{ fontSize: '22px', fontWeight: 'bold', color: '#333', textDecoration: 'none' }}>
        Baby Products
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }} className="desktop-menu">
        <Link href="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
        <Link href="/cart" style={{ textDecoration: 'none', color: '#333' }}>
          Cart ({itemCount})
        </Link>
        <Link href="/admin/login" style={{ textDecoration: 'none', color: '#333' }}>Admin</Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer'
        }}
        className="mobile-menu-btn"
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '20px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          borderRadius: '8px',
          padding: '15px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: '#333' }}>
            Cart ({itemCount})
          </Link>
          <Link href="/admin/login" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: '#333' }}>Admin</Link>
        </div>
      )}
    </nav>
  )
}