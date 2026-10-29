import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body {
    overflow-x: clip;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
    line-height: 1.6;
    background-color: #faf9f6;
    color: #1a1a1a;
  }
  a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
    outline: 2px solid #b45309;
    outline-offset: 2px;
  }
  img {
    max-width: 100%;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyles;
