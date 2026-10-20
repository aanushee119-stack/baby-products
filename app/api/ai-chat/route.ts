import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabase } from '../../supabaseClient'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  try {
    const { question } = await request.json()

    const { data: products, error } = await supabase
      .from('products')
      .select('name, price, description')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const productList = products
      .map((p) => `- ${p.name}: $${p.price} — ${p.description}`)
      .join('\n')

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `You are a helpful assistant for a baby products store. Here are the available products:\n\n${productList}\n\nCustomer question: ${question}\n\nRecommend relevant products from the list above in a friendly, short response.`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    return NextResponse.json({ answer: text })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}