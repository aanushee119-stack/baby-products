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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fffafc 0%, #f5f3ff 100%)',
        padding: '40px 20px 60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          background: 'rgba(255,255,255,0.82)',
          border: '1px solid rgba(216, 180, 254, 0.45)',
          borderRadius: '28px',
          boxShadow: '0 20px 50px rgba(168, 85, 247, 0.12)',
          backdropFilter: 'blur(12px)',
          padding: '28px',
        }}
      >
        <p
          style={{
            margin: '0 0 10px',
            color: '#8b5cf6',
            fontWeight: 800,
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Baby expert
        </p>
        <h1
          style={{
            margin: '0 0 10px',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            letterSpacing: '-0.06em',
            color: '#0f172a',
          }}
        >
          Ask Our Baby Product Expert
        </h1>
        <p
          style={{
            margin: '0 0 20px',
            color: '#475569',
            fontSize: '1rem',
            lineHeight: 1.6,
          }}
        >
          Ask anything — like "What&apos;s good for a newborn?"
        </p>

        <label style={{ display: 'block', marginTop: '8px', fontWeight: 600, color: '#334155' }}>
          Your question
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            placeholder="Type your question..."
            style={{
              width: '100%',
              marginTop: '8px',
              padding: '14px 16px',
              borderRadius: '16px',
              border: '1px solid #e9d5ff',
              background: '#faf5ff',
              color: '#0f172a',
              resize: 'vertical',
              fontSize: '1rem',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        </label>

        <button
          onClick={handleAsk}
          disabled={loading}
          style={{
            marginTop: '18px',
            padding: '12px 22px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '999px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 800,
            fontSize: '0.98rem',
            boxShadow: '0 14px 28px rgba(168, 85, 247, 0.22)',
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>

        {answer && (
          <div
            style={{
              marginTop: '24px',
              padding: '18px 20px',
              background: 'linear-gradient(180deg, #f8fafc 0%, #f5f3ff 100%)',
              borderRadius: '18px',
              border: '1px solid #e2e8f0',
              whiteSpace: 'pre-line',
              color: '#1e293b',
              lineHeight: 1.7,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
          >
            {answer}
          </div>
        )}
      </div>
    </div>
  )
}