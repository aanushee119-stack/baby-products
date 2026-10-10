'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '8px',
  marginTop: '4px',
} as const

const cardStyle = {
  border: '1px solid #ccc',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '12px',
} as const

export default function AdminPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editPrice, setEditPrice] = useState('')
  const [editDescription, setEditDescription] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'
    if (!isLoggedIn) {
      router.replace('/admin/login')
      return
    }
    setAuthorized(true)
    fetchData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.replace('/admin/login')
  }

  const fetchData = async () => {
    setLoading(true)
    setError('')

    const [productsResult, ordersResult] = await Promise.all([
      supabase.from('products').select('*').order('id'),
      supabase.from('orders').select('*').order('id', { ascending: false }),
    ])

    if (productsResult.error || ordersResult.error) {
      setError(productsResult.error?.message || ordersResult.error?.message || '')
    }

    if (productsResult.data) setProducts(productsResult.data)
    if (ordersResult.data) setOrders(ordersResult.data)

    setLoading(false)
  }

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const { error: insertError } = await supabase.from('products').insert({
      name,
      price: parseFloat(price),
      description,
    })

    setSubmitting(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setName('')
    setPrice('')
    setDescription('')
    fetchData()
  }

  const startEdit = (product: any) => {
    setEditingId(product.id)
    setEditName(product.name)
    setEditPrice(String(product.price))
    setEditDescription(product.description || '')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditName('')
    setEditPrice('')
    setEditDescription('')
  }

  const handleUpdateProduct = async (productId: number) => {
    setError('')

    const { error: updateError } = await supabase
      .from('products')
      .update({
        name: editName,
        price: parseFloat(editPrice),
        description: editDescription,
      })
      .eq('id', productId)

    if (updateError) {
      setError(updateError.message)
      return
    }

    cancelEdit()
    fetchData()
  }

  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm('Delete this product?')) return

    setError('')

    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    fetchData()
  }

  const getOrderTotal = (order: any) => {
    const total = order.total_price ?? order.total
    return typeof total === 'number' ? total.toFixed(2) : total
  }

  if (!authorized) {
    return <p style={{ padding: '20px' }}>Checking login...</p>
  }

  return (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link href="/">← Back to store</Link>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      {loading && <p>Loading...</p>}

      <section style={{ marginTop: '32px' }}>
        <h2>Products ({products.length})</h2>

        <form
          onSubmit={handleAddProduct}
          style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <h3 style={{ margin: 0 }}>Add new product</h3>
          <label>
            Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label>
            Price
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label>
            Description
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={inputStyle}
            />
          </label>
          <button type="submit" disabled={submitting} style={{ padding: '10px', width: 'fit-content' }}>
            {submitting ? 'Adding...' : 'Add product'}
          </button>
        </form>

        {products.length === 0 && !loading ? (
          <p>No products yet.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={cardStyle}>
              {editingId === product.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label>
                    Name
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={inputStyle}
                    />
                  </label>
                  <label>
                    Price
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      style={inputStyle}
                    />
                  </label>
                  <label>
                    Description
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={3}
                      style={inputStyle}
                    />
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" onClick={() => handleUpdateProduct(product.id)}>
                      Save
                    </button>
                    <button type="button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px' }}>{product.name}</h3>
                    <p style={{ margin: '4px 0' }}>${product.price}</p>
                    <p style={{ margin: '4px 0' }}>{product.description}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <button type="button" onClick={() => startEdit(product)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>Orders ({orders.length})</h2>

        {orders.length === 0 && !loading ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} style={cardStyle}>
              <p style={{ margin: '0 0 4px' }}>
                <strong>Order #{order.id}</strong>
              </p>
              <p style={{ margin: '4px 0' }}>{order.customer_name}</p>
              <p style={{ margin: '4px 0' }}>{order.customer_email}</p>
              <p style={{ margin: '4px 0' }}>{order.customer_address}</p>
              <p style={{ margin: '4px 0', fontWeight: 'bold' }}>
                Total: ${getOrderTotal(order)}
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
