import React from 'react';
import PropTypes from 'prop-types';

// InkWave mark: a pen nib in the site accent, with a serif wordmark.
// No image file, so it stays crisp at any size and never falls back
// to the old Create React App icon. The old cat logo (with its tiny
// "Welcome to Inkwave" tagline) was unreadable at header size.
const Logo = ({ height = 40 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, lineHeight: 1 }}>
    <svg width={height} height={height} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M24 3C15 13 8 22 8 29a16 16 0 0 0 32 0C40 22 33 13 24 3Z" fill="#b45309" />
      <circle cx="24" cy="29" r="3.5" fill="#111111" />
      <path d="M24 12 L24 23" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, fontSize: height * 0.62, color: '#ffffff', letterSpacing: '-0.01em' }}>
      Ink<span style={{ color: '#fbbf24' }}>Wave</span>
    </span>
  </span>
);

Logo.propTypes = {
  height: PropTypes.number
};

export default Logo;
