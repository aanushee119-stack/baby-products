import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.log('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const metadata = session.metadata as any

      const { error } = await supabase.from('orders').insert({
        customer_name: metadata.customer_name,
        customer_email: metadata.customer_email,
        customer_phone: metadata.customer_phone,
        customer_address: metadata.customer_address,
        total: parseFloat(metadata.total),
        items: { summary: metadata.items_summary },
        order_status: 'paid'
      })

      if (error) {
        console.error('Error saving order:', error)
      } else {
        console.log('Order saved successfully for session:', session.id)
      }
    } catch (err) {
      console.error('Webhook error:', err)
    }
  }

  return NextResponse.json({ received: true })
}