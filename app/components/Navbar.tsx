'use client'

import Link from 'next/link'
import { useCart } from '../CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { cart } = useCart()
  const itemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 32px',
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.18)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: '1.55rem',
          fontWeight: 800,
          color: '#111827',
          textDecoration: 'none',
          letterSpacing: '-0.04em',
        }}
      >
        Baby Products
      </Link>

      <div
        style={{
          display: 'flex',
          gap: '18px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            color: '#374151',
            fontWeight: 600,
            padding: '8px 12px',
            borderRadius: '999px',
            transition: 'all 0.2s ease',
          }}
        >
          Home
        </Link>
        <Link
          href="/cart"
          style={{
            textDecoration: 'none',
            color: '#374151',
            fontWeight: 700,
            padding: '8px 14px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #fdf2f8 0%, #eef2ff 100%)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            boxShadow: '0 8px 20px rgba(168, 85, 247, 0.06)',
          }}
        >
          Cart ({itemCount})
        </Link>
        <Link
          href="/admin/login"
          style={{
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 700,
            padding: '10px 16px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #f472b6 0%, #8b5cf6 100%)',
            boxShadow: '0 14px 24px rgba(168, 85, 247, 0.22)',
          }}
        >
          Admin
        </Link>
      </div>
    </nav>
  )
}