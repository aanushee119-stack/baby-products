import { GoogleGenAI } from '@google/genai'
import { supabase } from '../../supabaseClient'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(request: Request) {
  try {
    const { question } = await request.json()

    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, price, description, image_url')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const productList = products
      .map((p) => `- ID ${p.id}: ${p.name} ($${p.price}) — ${p.description} — Link: /products/${p.id}`)
      .join('\n')

    const prompt = `You are a helpful assistant for a baby products store. Here are the available products:\n\n${productList}\n\nCustomer question: ${question}\n\nRecommend relevant products from the list above in a friendly, short response. Include the product link (like /products/1, /products/3, etc.) so customers can click directly to view and buy.`

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    })

    return NextResponse.json({ answer: response.text })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}