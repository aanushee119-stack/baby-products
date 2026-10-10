'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '../supabaseClient'

export default function SuccessPage() {
  const [message, setMessage] = useState('Processing your order...')
  const hasSaved = useRef(false)

  useEffect(() => {
    if (hasSaved.current) return
    hasSaved.current = true
    saveOrder()
  }, [])

  const saveOrder = async () => {
    try {
      const orderData = localStorage.getItem('pendingOrder')
      if (!orderData) {
        setMessage('No pending order found.')
        return
      }

      const order = JSON.parse(orderData)

      const { error } = await supabase.from('orders').insert({
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        customer_address: order.customer_address,
        customer_phone: order.customer_phone,
        items: order.items,
        total: order.total_price,
        order_status: 'paid'
      })

      if (error) {
        setMessage('Error saving order: ' + error.message)
      } else {
        localStorage.removeItem('pendingOrder')
        setMessage('Payment successful! Your order has been saved.')
      }
    } catch (err: any) {
      setMessage('Error: ' + err.message)
    }
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Thank You!</h1>
      <p>{message}</p>
      <a href="/">Back to Home</a>
    </div>
  )
}