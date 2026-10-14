'use client'

import { useState, FormEvent } from 'react'
import { useCart } from '../CartContext'

export default function CheckoutPage() {
  const { cart } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const subtotal = cart.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  )

  const handleSubmit = async (e: FormEvent) => {
     e.preventDefault()
    const total=cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0)
   
    if (cart.length === 0) return

    setSubmitting(true)
    setError('')

    try {
     const orderData = {
  customer_name: name,
  customer_email: email,
  customer_phone: phone,
  customer_address: address,
  total_price: total,
  items: cart
}

const metadata = {
  customer_name: name,
  customer_email: email,
  customer_phone: phone,
  customer_address: address,
  total: total.toString(),
  items: JSON.stringify(cart)
}

      localStorage.setItem('pendingOrder', JSON.stringify(orderData))
     
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item: any) => ({
            name: item.name,
            price: Math.round(item.price * 100),
            quantity: item.quantity
          })),
          metadata: metadata
        })
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Failed to create payment session')
        setSubmitting(false)
      }
    } catch (err: any) {
      setError('Error: ' + err.message)
      setSubmitting(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fdf2f8 0%, #edf6ff 50%, #fef3c7 100%)',
        padding: '48px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '980px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '28px',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '28px',
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
            padding: '32px',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 14px',
                borderRadius: '999px',
                background: '#ede9fe',
                color: '#5b21b6',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Checkout
            </div>
            <h1
              style={{
                margin: '18px 0 8px',
                fontSize: 'clamp(2.1rem, 3vw, 3rem)',
                color: '#111827',
                fontWeight: 800,
              }}
            >
              Complete your order
            </h1>
          </div>

          {error && (
            <p
              style={{
                margin: '0 0 16px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: '#fef2f2',
                color: '#b91c1c',
                border: '1px solid #fecaca',
              }}
            >
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    border: '1px solid #dbe3ee',
                    background: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
                  }}
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    border: '1px solid #dbe3ee',
                    background: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
                  }}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    border: '1px solid #dbe3ee',
                    background: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
                  }}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    border: '1px solid #dbe3ee',
                    background: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                marginTop: '24px',
                padding: '15px 20px',
                border: 'none',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #f472b6 0%, #8b5cf6 100%)',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 18px 30px rgba(168, 85, 247, 0.26)',
              }}
            >
              {submitting ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '28px',
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
            padding: '28px 24px',
            height: 'fit-content',
          }}
        >
          <h3
            style={{
              margin: '0 0 20px',
              fontSize: '1.2rem',
              color: '#111827',
              fontWeight: 800,
            }}
          >
            Order Summary
          </h3>

          <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
            {cart.map((item: any) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '12px',
                  color: '#374151',
                  fontWeight: 600,
                  padding: '10px 0',
                  borderBottom: '1px solid #eef2f7',
                }}
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #eef2ff 0%, #fdf2f8 100%)',
              borderRadius: '18px',
              padding: '18px 16px',
              border: '1px solid rgba(99, 102, 241, 0.12)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#374151', fontWeight: 600 }}>Total</span>
              <strong style={{ fontSize: '1.5rem', color: '#111827' }}>${subtotal}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
