'use client'

import { useState } from 'react';
import { CONTACT_INFO } from '@/lib/constants';

interface LeadCaptureFormProps {
  variant?: 'hero' | 'section';
}

export default function LeadCaptureForm({ variant = 'section' }: LeadCaptureFormProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Salva no Notion para métricas
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email: 'whatsapp@direct.com', // Placeholder para o schema do Notion
          whatsapp, 
          cidade: 'Lead via Site' 
        }),
      });

      setDone(true);
      
      // 2. Redireciona para o WhatsApp
      const message = encodeURIComponent(`Olá! Meu nome é ${name}. Vi o checklist no portal Cozinha Mais Consciente e gostaria de recebê-lo e saber mais informações.`);
      const waUrl = `https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=${message}`;
      
      // Pequeno delay para o usuário ver a confirmação antes de redirecionar
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1000);

    } catch (err: any) {
      setError('Erro ao processar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div style={{
        background: variant === 'hero' ? 'rgba(255,255,255,0.15)' : '#f0fdf4',
        backdropFilter: variant === 'hero' ? 'blur(10px)' : 'none',
        borderRadius: '16px',
        padding: '1.5rem',
        textAlign: 'center',
        border: variant === 'hero' ? 'none' : '1px solid #86efac',
        color: variant === 'hero' ? 'white' : '#166534',
      }}>
        <div style={{ fontSize: '1.5rem' }}>✅</div>
        <p style={{ fontWeight: 700, margin: '0.5rem 0' }}>Enviando para seu WhatsApp...</p>
      </div>
    );
  }

  // ── VARIANTE HERO ─────────────────────────────────────────────
  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={inputHeroStyle}
          />
          <input
            type="tel"
            placeholder="Seu WhatsApp (com DDD)"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            required
            style={inputHeroStyle}
          />
          <button type="submit" disabled={loading} style={btnHeroStyle}>
            {loading ? 'Processando...' : 'Receber Checklist no WhatsApp →'}
          </button>
        </div>
        {error && <p style={{ color: '#ffcccc', marginTop: '0.5rem', fontSize: '0.85rem' }}>{error}</p>}
      </form>
    );
  }

  // ── VARIANTE SECTION (padrão) ──────────────────────────────────
  return (
    <div style={sectionCardStyle}>
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <div style={{
          display: 'inline-block',
          background: '#dcfce7',
          color: '#166534',
          borderRadius: '8px',
          padding: '0.4rem 1rem',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Acesso Grátis
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>
          Receba o Checklist: <em>7 Sinais de Perigo na Panela</em>
        </h3>
        <p style={{ color: 'var(--text-light)', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>
          O guia prático para salvar sua saúde agora. Enviamos direto para o seu WhatsApp.
        </p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Seu Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="tel"
          placeholder="WhatsApp (com DDD)"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? 'Aguarde...' : '📥 Enviar para meu WhatsApp'}
        </button>
        {error && <p style={{ color: 'red', margin: 0, fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}
      </form>
    </div>
  );
}

// ── Estilos ──────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  padding: '0.875rem 1rem',
  borderRadius: '10px',
  border: '1.5px solid #d1d5db',
  fontSize: '1rem',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const btnStyle: React.CSSProperties = {
  padding: '0.9rem 1.5rem',
  borderRadius: '10px',
  border: 'none',
  background: 'var(--sage)',
  color: 'white',
  fontSize: '1.1rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'opacity 0.2s',
};

const sectionCardStyle: React.CSSProperties = {
  background: 'white',
  borderRadius: '20px',
  padding: '2.5rem',
  maxWidth: '520px',
  margin: '0 auto',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  border: '1px solid rgba(0,0,0,0.06)',
};

const inputHeroStyle: React.CSSProperties = {
  padding: '0.875rem 1.25rem',
  borderRadius: '10px',
  border: '2px solid rgba(255,255,255,0.3)',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  fontSize: '1rem',
  outline: 'none',
  flex: '1 1 200px',
  boxSizing: 'border-box',
};

const btnHeroStyle: React.CSSProperties = {
  padding: '0.875rem 1.75rem',
  borderRadius: '10px',
  border: 'none',
  background: 'white',
  color: 'var(--sage-dark, #2d6a4f)',
  fontSize: '1rem',
  fontWeight: 800,
  cursor: 'pointer',
  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  flex: '0 0 auto',
};
