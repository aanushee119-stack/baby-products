'use client'
import { supabase } from './supabaseClient'
import { useEffect, useState } from 'react'
import { useCart } from './CartContext'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [error, setError] = useState('')
  const { addToCart, cart } = useCart()

  const totalItems = cart.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  )

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data, error } = await supabase.from('products').select('*')
    if (error) setError(error.message)
    if (data) setProducts(data)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fff8f3 0%, #fde7f3 35%, #edf6ff 100%)',
        padding: '40px 20px 60px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.7)',
              color: '#ec4899',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              boxShadow: '0 8px 24px rgba(236, 72, 153, 0.12)',
            }}
          >
            New arrivals
          </div>
          <h1
            style={{
              margin: '18px 0 10px',
              fontSize: 'clamp(2.2rem, 4vw, 4rem)',
              color: '#1f2937',
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            Welcome to Baby Shop
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '1.05rem',
              color: '#6b7280',
              maxWidth: '640px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Thoughtful picks for growing families, from cozy essentials to playful everyday favorites.
          </p>
        </div>

        {error && (
          <p
            style={{
              maxWidth: '640px',
              margin: '0 auto 24px',
              padding: '12px 16px',
              borderRadius: '12px',
              background: '#fef2f2',
              color: '#b91c1c',
              border: '1px solid #fecaca',
            }}
          >
            Error: {error}
          </p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: 'rgba(255,255,255,0.82)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '22px',
                padding: '16px',
                boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                transform: 'translateY(0)',
              }}
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    marginBottom: '16px',
                    boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
                  }}
                />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <h3
                  style={{
                    margin: '0',
                    fontSize: '1.15rem',
                    color: '#111827',
                    fontWeight: 700,
                  }}
                >
                  {product.name}
                </h3>
                <span
                  style={{
                    background: '#fef3c7',
                    color: '#92400e',
                    borderRadius: '999px',
                    padding: '6px 10px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}
                >
                  ${product.price}
                </span>
              </div>

              <p
                style={{
                  margin: '12px 0 18px',
                  color: '#6b7280',
                  minHeight: '48px',
                  lineHeight: 1.6,
                }}
              >
                {product.description}
              </p>

              <button
                onClick={() => addToCart(product)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, #f472b6 0%, #fb7185 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: '0 14px 28px rgba(244, 114, 182, 0.3)',
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
