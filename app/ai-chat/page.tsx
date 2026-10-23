'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AiChatPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAsk() {
    if (!question.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await res.json()
      setAnswer(data.answer)
      setQuestion('')
    } catch (err) {
      setAnswer('Error: ' + (err as any).message)
    }
    setLoading(false)
  }

  function formatAnswer(text: string) {
    const parts = text.split(/(\/products\/\d+)/g)
    return parts.map((part, i) => {
      if (/^\/products\/\d+$/.test(part)) {
        return (
          <Link key={i} href={part} className="text-blue-600 underline font-semibold">
            View Product
          </Link>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ask Our AI Assistant</h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="e.g., What products do you recommend for newborns?"
        className="w-full p-3 border rounded-lg mb-4"
        rows={3}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      {answer && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          {formatAnswer(answer)}
        </div>
      )}
    </div>
  )
}