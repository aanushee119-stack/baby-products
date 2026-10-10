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
    if (cart.length === 0) return

    setSubmitting(true)
    setError('')

    try {
      const orderData = {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        customer_address: address,
        total_price: subtotal,
        items: cart,
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
          }))
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
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Checkout</h1>

      <h3>Order Summary</h3>
      {cart.map((item: any) => (
        <p key={item.id}>
          {item.name} x {item.quantity} - ${item.price * item.quantity}
        </p>
      ))}
      <p><strong>Total: ${subtotal}</strong></p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" disabled={submitting} style={{ width: '100%', padding: '10px' }}>
          {submitting ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}