'use client'

import { useState } from 'react';

interface ArticleFeedbackProps {
  articleSlug: string;
  articleTitle: string;
}

export default function ArticleFeedback({ articleSlug, articleTitle }: ArticleFeedbackProps) {
  const [step, setStep] = useState<'rating' | 'comment' | 'done'>('rating');
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRating = (isHelpful: boolean) => {
    setHelpful(isHelpful);
    setStep('comment');
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          helpful,
          comment,
          articleSlug,
          articleTitle,
        }),
      });
      setStep('done');
    } catch (err) {
      console.error('Failed to send feedback', err);
      // Mesmo com erro na API, mostramos "done" para não frustrar o usuário final
      setStep('done');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'done') {
    return (
      <div style={containerStyle}>
        <p style={{ margin: 0, fontWeight: 600, color: 'var(--sage-dark)' }}>
          🙏 Obrigado pelo seu feedback! Ele nos ajuda a melhorar.
        </p>
      </div>
    );
  }

  if (step === 'comment') {
    return (
      <div style={containerStyle}>
        <p style={{ marginBottom: '1rem', fontWeight: 600 }}>
          {helpful ? 'Que bom! 😊 Quer deixar algum comentário ou sugestão?' : 'Sinto muito por isso. 😔 Como podemos melhorar este artigo?'}
        </p>
        <textarea
          placeholder="Escreva aqui (opcional)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={textareaStyle}
        />
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button onClick={() => setStep('done')} style={btnSecondaryStyle}>Pular</button>
          <button onClick={handleSubmit} disabled={loading} style={btnPrimaryStyle}>
            {loading ? 'Enviando...' : 'Enviar Feedback'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <p style={{ marginBottom: '1.25rem', fontWeight: 600 }}>Este artigo foi útil para você?</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={() => handleRating(true)} style={ratingBtnStyle}>
          <span style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>👍</span> Sim
        </button>
        <button onClick={() => handleRating(false)} style={ratingBtnStyle}>
          <span style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>👎</span> Não
        </button>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  background: 'var(--cream)',
  border: '1px solid var(--border-light)',
  borderRadius: '16px',
  padding: '2rem',
  textAlign: 'center',
  margin: '3rem 0',
};

const ratingBtnStyle: React.CSSProperties = {
  padding: '0.6rem 1.5rem',
  borderRadius: '10px',
  border: '1px solid #d1d5db',
  background: 'white',
  cursor: 'pointer',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.2s',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '100px',
  padding: '1rem',
  borderRadius: '10px',
  border: '1.5px solid #d1d5db',
  marginBottom: '1rem',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  outline: 'none',
};

const btnPrimaryStyle: React.CSSProperties = {
  padding: '0.6rem 1.5rem',
  borderRadius: '10px',
  border: 'none',
  background: 'var(--sage)',
  color: 'white',
  fontWeight: 600,
  cursor: 'pointer',
};

const btnSecondaryStyle: React.CSSProperties = {
  padding: '0.6rem 1.5rem',
  borderRadius: '10px',
  border: '1px solid #d1d5db',
  background: 'white',
  color: 'var(--text-light)',
  cursor: 'pointer',
};
