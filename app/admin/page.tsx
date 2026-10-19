'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '12px 14px',
  marginTop: '6px',
  border: '1px solid #dbeafe',
  borderRadius: '12px',
  background: '#f8fafc',
  color: '#0f172a',
  outline: 'none',
  fontSize: '0.96rem',
  boxSizing: 'border-box' as const,
} as const

const cardStyle = {
  border: '1px solid #e2e8f0',
  padding: '20px',
  borderRadius: '20px',
  marginBottom: '18px',
  background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
  boxShadow: '0 14px 35px rgba(15, 23, 42, 0.06)',
} as const

const pageStyle = {
  minHeight: '100vh',
  padding: '32px 20px 60px',
  background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
  color: '#0f172a',
} as const

const panelStyle = {
  maxWidth: '1100px',
  margin: '0 auto',
} as const

const primaryButtonStyle = {
  border: 'none',
  borderRadius: '12px',
  padding: '11px 18px',
  fontWeight: 700,
  fontSize: '0.94rem',
  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  color: '#fff',
  cursor: 'pointer',
  boxShadow: '0 12px 24px rgba(168, 85, 247, 0.25)',
} as const

const secondaryButtonStyle = {
  border: '1px solid #dbeafe',
  borderRadius: '12px',
  padding: '10px 16px',
  fontWeight: 600,
  background: '#fff',
  color: '#334155',
  cursor: 'pointer',
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
  const [imageFile, setImageFile] = useState<File | null>(null)
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

    let imageUrl = ''

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile)

      if (uploadError) {
        setError(uploadError.message)
        setSubmitting(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName)

      imageUrl = urlData.publicUrl
    }

    const { error: insertError } = await supabase.from('products').insert({
      name,
      price: parseFloat(price),
      description,
      image_url: imageUrl,
    })

    setSubmitting(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setName('')
    setPrice('')
    setDescription('')
    setImageFile(null)
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

  const handleMarkAsShipped = async (orderId: number) => {
    setError('')

    const { error: updateError } = await supabase
      .from('orders')
      .update({ order_status: 'shipped' })
      .eq('id', orderId)

    if (updateError) {
      setError(updateError.message)
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
    <div style={pageStyle}>
      <div style={panelStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            marginBottom: '28px',
            padding: '20px 24px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            boxShadow: '0 18px 36px rgba(15, 23, 42, 0.06)',
          }}
        >
          <div>
            <p style={{ margin: 0, color: '#8b5cf6', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Store control
            </p>
            <h1 style={{ margin: '8px 0 0', fontSize: 'clamp(2rem, 5vw, 2.8rem)', letterSpacing: '-0.05em' }}>Admin Dashboard</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#4f46e5', fontWeight: 700 }}>
              ← Back to store
            </Link>
            <button type="button" onClick={handleLogout} style={secondaryButtonStyle}>
              Logout
            </button>
          </div>
        </div>

        {error && <p style={{ color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 14px', borderRadius: '12px', marginBottom: '20px', fontWeight: 600 }}>Error: {error}</p>}
        {loading && <p style={{ color: '#475569', fontWeight: 600 }}>Loading...</p>}

        <section style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '1.6rem', letterSpacing: '-0.04em' }}>Products</h2>
            <span style={{ display: 'inline-flex', minWidth: '30px', height: '30px', alignItems: 'center', justifyContent: 'center', padding: '0 10px', borderRadius: '999px', background: '#ede9fe', color: '#6d28d9', fontSize: '0.85rem', fontWeight: 700 }}>{products.length}</span>
          </div>

          <form
            onSubmit={handleAddProduct}
            style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            <h3 style={{ margin: 0, fontSize: '1.15rem', letterSpacing: '-0.03em' }}>Add new product</h3>
            <label style={{ fontWeight: 600, color: '#334155' }}>
              Name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </label>
            <label style={{ fontWeight: 600, color: '#334155' }}>
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
            <label style={{ fontWeight: 600, color: '#334155' }}>
              Description
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </label>
            <label style={{ fontWeight: 600, color: '#334155' }}>
              Product Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                style={{ ...inputStyle, padding: '10px 12px' }}
              />
            </label>
            <button type="submit" disabled={submitting} style={{ ...primaryButtonStyle, width: 'fit-content' }}>
              {submitting ? 'Adding...' : 'Add product'}
            </button>
          </form>

          {products.length === 0 && !loading ? (
            <p style={{ color: '#64748b', padding: '16px 4px' }}>No products yet.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} style={cardStyle}>
                {editingId === product.id ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ fontWeight: 600, color: '#334155' }}>
                      Name
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={inputStyle}
                      />
                    </label>
                    <label style={{ fontWeight: 600, color: '#334155' }}>
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
                    <label style={{ fontWeight: 600, color: '#334155' }}>
                      Description
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button type="button" onClick={() => handleUpdateProduct(product.id)} style={primaryButtonStyle}>
                        Save
                      </button>
                      <button type="button" onClick={cancelEdit} style={secondaryButtonStyle}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                    <div>
                      <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', letterSpacing: '-0.03em' }}>{product.name}</h3>
                      <p style={{ margin: '6px 0', color: '#6d28d9', fontWeight: 800, fontSize: '1.15rem' }}>${product.price}</p>
                      <p style={{ margin: '6px 0', color: '#475569', lineHeight: 1.6 }}>{product.description}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      <button type="button" onClick={() => startEdit(product)} style={secondaryButtonStyle}>
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDeleteProduct(product.id)} style={{ ...secondaryButtonStyle, borderColor: '#fecaca', color: '#b91c1c', background: '#fff5f5' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '1.6rem', letterSpacing: '-0.04em' }}>Orders</h2>
            <span style={{ display: 'inline-flex', minWidth: '30px', height: '30px', alignItems: 'center', justifyContent: 'center', padding: '0 10px', borderRadius: '999px', background: '#dbeafe', color: '#1d4ed8', fontSize: '0.85rem', fontWeight: 700 }}>{orders.length}</span>
          </div>

          {orders.length === 0 && !loading ? (
            <p style={{ color: '#64748b', padding: '16px 4px' }}>No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>
                    <strong>Order #{order.id}</strong>
                  </p>
                  <span style={{ display: 'inline-flex', padding: '6px 10px', borderRadius: '999px', background: order.order_status === 'shipped' ? '#dcfce7' : '#fef3c7', color: order.order_status === 'shipped' ? '#166534' : '#92400e', fontWeight: 700, fontSize: '0.8rem' }}>
                    {order.order_status}
                  </span>
                </div>
                <p style={{ margin: '8px 0', color: '#334155' }}>{order.customer_name}</p>
                <p style={{ margin: '8px 0', color: '#334155' }}>{order.customer_email}</p>
                <p style={{ margin: '8px 0', color: '#334155' }}>{order.customer_address}</p>
                <p style={{ margin: '12px 0 8px', fontWeight: 800, fontSize: '1.15rem', color: '#0f172a' }}>
                  Total: ${getOrderTotal(order)}
                </p>
                {order.order_status !== 'shipped' && (
                  <button type="button" onClick={() => handleMarkAsShipped(order.id)} style={primaryButtonStyle}>
                    Mark as Shipped
                  </button>
                )}
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  )
}