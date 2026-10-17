import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {Resend} from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
const resend =new Resend(process.env.RESEND_API_KEY!)
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
  
    // Send confirmation email
    await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: metadata.customer_email,
    subject: 'Your Baby Products Order Confirmation',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">🍼 Baby Products</h1>
      </div>
      
      <div style="padding: 30px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
        <h2 style="color: #2c3e50;">Thank you, ${metadata.customer_name}!</h2>
        <p style="color: #555; font-size: 16px;">Your order has been confirmed and will be shipped soon.</p>
        
        <div style="background-color: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">Order Summary</h3>
          <p style="color: #555;"><strong>Total:</strong> $${metadata.total}</p>
          <p style="color: #555;"><strong>Items:</strong> ${metadata.items_summary}</p>
        </div>

        <div style="background-color: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">Shipping Address</h3>
          <p style="color: #555;">${metadata.customer_address}</p>
          <p style="color: #555;">Phone: ${metadata.customer_phone}</p>
        </div>

        <div style="text-align: center; margin: 25px 0;">
  <a href="https://baby-products-tau.vercel.app/track-order?email=${metadata.customer_email}" 
     style="background-color: #2c3e50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
    Track Your Order
  </a>
</div>

<p style="color: #888; font-size: 14px; text-align: center; margin-top: 30px;">
  Questions? Reply to this email and we'll help you out.
</p>
      </div>
    </div>
  `
})
}
    } catch (err) {
      console.error('Webhook error:', err)
    }
  }

  return NextResponse.json({ received: true })
}