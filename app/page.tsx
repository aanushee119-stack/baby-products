'use client'
import Link from 'next/link'
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
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' ,fontWeight: 'bold',color: '#333' }}>Welcome to Baby Shop</h1>
      {error && <p>Error: {error}</p>}
       <div style={{ display : 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
  {product.image_url && (
    <img
      src={product.image_url}
      alt={product.name}
      style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }}
    />
  )}
  <h3>{product.name}</h3>
  <p>Price: ${product.price}</p>
  <p>{product.description}</p>
  <button onClick={() => addToCart(product)} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer',fontSize: '16px',fontWeight: 'bold' }}>
    Add to Cart
  </button>
</div>
        ))}
      </div>
    </div>
  )
}