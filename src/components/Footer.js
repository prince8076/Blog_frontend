import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './Logo';

// Footer was a single centred line. Now: brand, real explore links, and
// the copyright — same dark masthead as the header so the logo reads.
const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.headerBg};
  color: ${({ theme }) => theme.colors.headerText};
  margin-top: 4rem;
  border-top: 1px solid #2a2a2a;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 2rem;

  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Tagline = styled.p`
  color: #b0b0b0;
  max-width: 420px;
  line-height: 1.6;
`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    color: ${({ theme }) => theme.colors.headerText};
    text-decoration: none;
    font-weight: 600;
    width: fit-content;
    transition: color 0.2s ease;

    &:hover { color: #fbbf24; }
  }
`;

const Copy = styled.p`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
  color: #888888;
  font-size: 0.9rem;
`;

const Footer = () => (
  <FooterWrapper>
    <FooterInner>
      <div>
        <Logo height={36} />
        <Tagline>Tech, travel, and lifestyle writing, without the noise.</Tagline>
      </div>
      <FooterNav aria-label="Footer">
        <Link to="/">Home</Link>
        <Link to="/home">All articles</Link>
        <Link to="/about">About</Link>
        <Link to="/write-blog">Write a blog</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </FooterNav>
    </FooterInner>
    <Copy>© {new Date().getFullYear()} SuccessWebTech Blog — Tech, Travel &amp; Lifestyle.</Copy>
  </FooterWrapper>
);

export default Footer;
