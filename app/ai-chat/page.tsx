'use client'

import { useState } from 'react'

export default function AiChatPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim()) return
    setLoading(true)
    setAnswer('')

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await res.json()
      setAnswer(data.answer || data.error || 'Something went wrong.')
    } catch (err) {
      setAnswer('Error connecting to AI.')
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
      <h1>Ask Our Baby Product Expert</h1>
      <p>Ask anything — like "What's good for a newborn?"</p>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={3}
        placeholder="Type your question..."
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#2c3e50',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      {answer && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            whiteSpace: 'pre-line',
          }}
        >
          {answer}
        </div>
      )}
    </div>
  )
}