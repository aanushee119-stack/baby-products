'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../supabaseClient'

function TrackOrderContent() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState<any[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const emailFromUrl = searchParams.get('email')
    if (emailFromUrl) {
      setEmail(emailFromUrl)
    }
  }, [searchParams])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSearched(true)

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', email)

    if (error) {
      console.error('Error fetching orders:', error)
      setOrders([])
    } else {
      setOrders(data || [])
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h1>Track Your Order</h1>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ flex: 1, padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Search
        </button>
      </form>

      {loading && <p>Searching...</p>}

      {!loading && searched && orders.length === 0 && (
        <p>No orders found for this email.</p>
      )}

      {!loading && orders.map((order) => (
        <div key={order.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.order_status}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <p><strong>Placed on:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  )
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <TrackOrderContent />
    </Suspense>
  )
}