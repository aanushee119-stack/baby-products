'use client'

import Link from 'next/link'
import { useCart } from '../CartContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const totalItems = cart.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  )
  const subtotal = cart.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  )

  return (
    <div style={{ padding: '20px', maxWidth: '700px' }}>
      <p>
        <Link href="/">← Back to products</Link>
      </p>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/">Browse products</Link></p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map((item: any) => (
              <div
                key={item.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '15px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 4px' }}>{item.name}</h3>
                  <p style={{ margin: 0 }}>${item.price} each</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p style={{ margin: 0, minWidth: '80px', textAlign: 'right' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button type="button" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
            <p>Items: {totalItems}</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <Link
              href="/checkout"
              style={{
                display: 'inline-block',
                marginTop: '12px',
                padding: '10px 16px',
                border: '1px solid #333',
                borderRadius: '6px',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
