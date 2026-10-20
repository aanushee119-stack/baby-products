import { GoogleGenAI } from '@google/genai'
import { supabase } from '../../supabaseClient'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

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

    const prompt = `You are a helpful assistant for a baby products store. Here are the available products:\n\n${productList}\n\nCustomer question: ${question}\n\nRecommend relevant products from the list above in a friendly, short response.`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    return NextResponse.json({ answer: response.text })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}