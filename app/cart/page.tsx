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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fff7ed 0%, #fdf2f8 40%, #eef2ff 100%)',
        padding: '36px 20px 60px',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '18px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#4338ca',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            ← Back to products
          </Link>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.82)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '28px',
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
            padding: '28px',
          }}
        >
          <h1
            style={{
              margin: '0 0 24px',
              fontSize: 'clamp(2rem, 3vw, 3rem)',
              color: '#111827',
              fontWeight: 800,
            }}
          >
            Your Cart
          </h1>

          {cart.length === 0 ? (
            <div
              style={{
                background: '#fff7ed',
                border: '1px solid #fed7aa',
                borderRadius: '18px',
                padding: '28px 24px',
                color: '#7c2d12',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: '0 0 12px', fontSize: '1.1rem', fontWeight: 600 }}>
                Your cart is empty.
              </p>
              <Link
                href="/"
                style={{
                  color: '#ea580c',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Browse products
              </Link>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {cart.map((item: any) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      borderRadius: '20px',
                      padding: '18px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      flexWrap: 'wrap',
                      boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
                    }}
                  >
                    <div style={{ minWidth: '180px', flex: 1 }}>
                      <h3 style={{ margin: '0 0 4px', color: '#111827', fontSize: '1.1rem' }}>{item.name}</h3>
                      <p style={{ margin: 0, color: '#6b7280', fontWeight: 500 }}>${item.price} each</p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: '#f3f4f6',
                        borderRadius: '999px',
                        padding: '6px 10px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '30px',
                          height: '30px',
                          border: 'none',
                          borderRadius: '50%',
                          background: '#fff',
                          color: '#111827',
                          fontSize: '1.25rem',
                          cursor: 'pointer',
                          boxShadow: '0 3px 10px rgba(17,24,39,0.08)',
                        }}
                      >
                        −
                      </button>
                      <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 700, color: '#111827' }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '30px',
                          height: '30px',
                          border: 'none',
                          borderRadius: '50%',
                          background: '#fff',
                          color: '#111827',
                          fontSize: '1.25rem',
                          cursor: 'pointer',
                          boxShadow: '0 3px 10px rgba(17,24,39,0.08)',
                        }}
                      >
                        +
                      </button>
                    </div>

                    <p style={{ margin: 0, minWidth: '90px', textAlign: 'right', color: '#111827', fontWeight: 700 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        border: '1px solid #fecaca',
                        background: '#fff1f2',
                        color: '#be123c',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: '28px',
                  background: 'linear-gradient(135deg, #eef2ff 0%, #fdf2f8 100%)',
                  borderRadius: '22px',
                  padding: '24px 20px',
                  border: '1px solid rgba(99, 102, 241, 0.12)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <p style={{ margin: 0, color: '#374151', fontWeight: 600 }}>Items: {totalItems}</p>
                  <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>
                    Subtotal: ${subtotal.toFixed(2)}
                  </p>
                </div>

                <Link
                  href="/checkout"
                  style={{
                    display: 'inline-block',
                    marginTop: '20px',
                    padding: '14px 24px',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    color: '#fff',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                    boxShadow: '0 18px 30px rgba(79, 70, 229, 0.25)',
                    fontWeight: 700,
                  }}
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

