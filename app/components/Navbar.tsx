'use client'

import Link from 'next/link'
import { useCart } from '../CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { cart } = useCart()
  const itemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0)
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

      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
        <Link href="/cart" style={{ textDecoration: 'none', color: '#333' }}>
          Cart ({itemCount})
        </Link>
        <Link href="/admin/login" style={{ textDecoration: 'none', color: '#333' }}>Admin</Link>
      </div>
    </nav>
  )
}