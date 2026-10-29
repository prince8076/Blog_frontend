import React from 'react';

const box = { background: '#1e1e1e', border: '1px solid #333', borderRadius: 12, padding: 20 };
const bar = { background: '#2a2a2a', borderRadius: 6, height: 14, marginBottom: 10 };

export function LoadingState({ label = 'Loading articles…' }) {
  return (
    <div style={{ padding: '1rem 0' }} aria-live="polite">
      <p style={{ fontSize: '1.1rem', marginBottom: 4 }}>{label}</p>
      <p style={{ color: '#bbb', marginTop: 0 }}>
        The free backend can take about 30 seconds to wake up on your first visit. Nothing is broken — please wait a moment.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={box}>
            <div style={{ ...bar, height: 140, background: '#2a2a2a' }} />
            <div style={{ ...bar, width: '80%' }} />
            <div style={{ ...bar, width: '60%' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ErrorState({ message = 'Failed to fetch posts', onRetry }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }} role="alert">
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{ padding: '10px 20px', borderRadius: 6, border: 'none', background: '#f39c12', color: '#121212', fontWeight: 600, cursor: 'pointer' }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
