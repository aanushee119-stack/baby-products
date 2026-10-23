'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../supabaseClient'
import { useCart } from '../../CartContext'

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single()

      setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [params.id])

  if (loading) return <div className="p-8">Loading...</div>
  if (!product) return <div className="p-8">Product not found</div>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  )
}